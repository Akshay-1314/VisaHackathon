"use client";

import { useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Container, TextField, Button, Paper, Grid, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: "auto",
  maxWidth: 600,
  textAlign: "center",
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: "#f4f6f9",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: "none",
  fontSize: "16px",
  fontWeight: "bold",
}));

export default function Home() {
  const [productName, setProductName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [smbId, setSmbId] = useState("");
  const [revenue, setRevenue] = useState("");
  const [preOrders, setPreOrders] = useState("");
  const [loanAmountRequested, setLoanAmountRequested] = useState("");
  const [loanEligibility, setLoanEligibility] = useState(null);
  const [businessName, setBusinessName] = useState("");
  const [loadingPrice, setLoadingPrice] = useState(false);
  const [loadingLoan, setLoadingLoan] = useState(false);

  const predictPrice = async () => {
    setLoadingPrice(true);
    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL + "/predict-price");
      const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/predict-price", {
        productName,
        currentPrice,
      });
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      console.error("Error predicting price:", error);
    }
    setLoadingPrice(false);
  };

  const checkLoanEligibility = async () => {
    setLoadingLoan(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/check-loan", {
          smbId,
          revenue,
          preOrders,
          loanAmountRequested,
        });
        setLoanEligibility(response.data.eligibility);
        setBusinessName(response.data.businessName || "");
      } catch (error) {
        console.error("Error checking loan eligibility:", error);
      }
      setLoadingLoan(false);
    }, 1000);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ background: "linear-gradient(90deg, #142C8E 0%, #1A3BA3 100%)" }}>
        <Toolbar>
          <img src="/visa-logo.png" alt="Visa Logo" style={{ height: 40, marginRight: 16 }} />
          <Typography variant="h5" sx={{ flexGrow: 1, color: "white", fontWeight: "bold" }}>
            VisaTrendWise Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h5" sx={{ color: "#142C8E", fontWeight: "bold" }} gutterBottom>
                Product Price Prediction
              </Typography>
              <TextField fullWidth label="Product Name" margin="normal" onChange={(e) => setProductName(e.target.value)} />
              <TextField fullWidth label="Current Price (INR)" type="number" margin="normal" onChange={(e) => setCurrentPrice(e.target.value)} />
              <StyledButton fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={predictPrice} disabled={loadingPrice}>
                {loadingPrice ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Predict Price"}
              </StyledButton>
              {predictedPrice && (
                <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                  Predicted Price: ₹{predictedPrice}
                </Typography>
              )}
            </StyledPaper>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h5" sx={{ color: "#142C8E", fontWeight: "bold" }} gutterBottom>
                Loan Eligibility Check
              </Typography>
              <TextField fullWidth label="SMB ID" margin="normal" onChange={(e) => setSmbId(e.target.value)} />
              <TextField fullWidth label="Monthly Revenue (INR)" type="number" margin="normal" onChange={(e) => setRevenue(e.target.value)} />
              <TextField fullWidth label="Pre-orders" type="number" margin="normal" onChange={(e) => setPreOrders(e.target.value)} />
              <TextField fullWidth label="Loan Amount Requested (INR)" type="number" margin="normal" onChange={(e) => setLoanAmountRequested(e.target.value)} />
              <StyledButton fullWidth variant="contained" color="secondary" sx={{ mt: 2 }} onClick={checkLoanEligibility} disabled={loadingLoan}>
                {loadingLoan ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Check Loan Eligibility"}
              </StyledButton>
              {loanEligibility && (
                <Typography variant="h6" color="success.main" sx={{ mt: 2 }}>
                  Business: {businessName} <br /> Loan Eligibility: {loanEligibility}
                </Typography>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
