const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 6001;

app.use(express.json());
app.use(cors());

// Sample dataset stored in the backend with more pricing and business context
const dataset = [
  { id: 1, smbId: "SMB123", businessName: "GenZ Fashion", revenue: 10000, preOrders: 50, customerEngagement: 78, creditScore: 700, loanAmountRequested: 5000, productName: "Hoodie", category: "Clothing", baseCost: 1200, avgMarketPrice: 2500 },
  { id: 2, smbId: "SMB456", businessName: "Urban Outfit", revenue: 15000, preOrders: 30, customerEngagement: 80, creditScore: 750, loanAmountRequested: 8000, productName: "Sneakers", category: "Footwear", baseCost: 3000, avgMarketPrice: 5500 },
  { id: 3, smbId: "SMB789", businessName: "StreetWear Hub", revenue: 20000, preOrders: 70, customerEngagement: 88, creditScore: 680, loanAmountRequested: 6000, productName: "Jacket", category: "Clothing", baseCost: 2200, avgMarketPrice: 4500 },
];

// Endpoint to predict price using Gemini API with dataset as first prompt and user input as second prompt
app.post("/predict-price", async (req, res) => {
  try {
    const { productName, currentPrice } = req.body;

    if (!productName || !currentPrice) {
      return res.status(400).json({ error: "Product name and current price are required" });
    }

    // Find matching product in dataset
    const productData = dataset.find((item) => item.productName.toLowerCase() === productName.toLowerCase());
    
    if (!productData) {
      return res.status(404).json({ error: "Product not found in dataset" });
    }

    // First prompt: Dataset with more pricing and business context
    const datasetPrompt = `This is the dataset used for price prediction and loan eligibility:
    ${JSON.stringify(productData, null, 2)}
    The dataset contains base cost, average market price, customer engagement, pre-orders, and business revenue to determine the optimal price.`;

    // Second prompt: User input
    const userPrompt = `Given the dataset above, predict the optimal price for the following product:
    \nProduct Name: ${productName}
    Current Price: ${currentPrice}
    \nConsider base cost, market price trends, engagement levels, and pre-orders. Provide only the predicted price as a number.`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${"AIzaSyAsRwBL0qaVZckLnkKZeXDzWT9ki7NAyqg"}`,
      {
        contents: [
          { role: "user", parts: [{ text: datasetPrompt }] },
          { role: "user", parts: [{ text: userPrompt }] }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const predictedPrice = response.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!predictedPrice) {
      return res.status(500).json({ error: "Failed to get a valid response from Gemini API" });
    }

    res.json({ predicted_price: predictedPrice });
  } catch (error) {
    console.error("Error predicting price:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal server error", details: error.response?.data || error.message });
  }
});

// Endpoint to check loan eligibility
app.post("/check-loan", (req, res) => {
  try {
    const { smbId, revenue, preOrders, creditScore, loanAmountRequested } = req.body;

    if (!smbId) {
      return res.status(400).json({ error: "SMB ID is required" });
    }
    const businessData = dataset.find((item) => item.smbId === smbId);

    if (!businessData) {
      return res.json({ eligibility: "Not Eligible" });
    }

    const revenueGrowth = revenue >= businessData.revenue;
    const preOrderIncrease = preOrders >= businessData.preOrders;
    const goodCredit = creditScore >= 650;
    const reasonableLoanRequest = loanAmountRequested <= businessData.revenue * 0.5;

    const isEligible = revenueGrowth && preOrderIncrease && goodCredit && reasonableLoanRequest;

    res.json({ eligibility: isEligible ? "Eligible" : "Not Eligible" });
  } catch (error) {
    console.error("Error checking loan eligibility:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});