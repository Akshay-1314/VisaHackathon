# VisaTrendWise - Hackathon Project

VisaTrendWise is a web-based dashboard built for the Visa Hackathon, designed to assist small and medium-sized businesses (SMBs) in dynamic pricing and microloan eligibility assessment. The platform leverages predictive analytics to suggest optimal product prices based on engagement data and evaluates SMBs for microloan eligibility.

## 🚀 Features

- **Dynamic Pricing Prediction**: Predicts the optimal product price based on engagement and market trends.
- **Loan Eligibility Check**: Assesses SMBs' eligibility for microloans based on business metrics.
- **Modern UI**: Designed with Material UI and Visa branding for a seamless experience.
- **API Integration**: Connects to a backend ML model for price prediction and loan assessment.

## 📸 Screenshots

![VisaTrendWise Dashboard](public/screenshot.png)

## 🛠 Tech Stack

- **Frontend**: Next.js (React), Material UI
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL/Firebase
- **Machine Learning**: Python (TensorFlow/PyTorch, Scikit-learn)
- **Hosting**: Vercel (Frontend), AWS/GCP (Backend & ML Model)

###### :

## 📦 Installation

### 1️⃣ Clone the Repository

git clone <https://github.com/Akshay-1314/VisaHackathon>\
cd VisaTrendWise

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Start the Development Server

npm run dev

Make sure your backend is running on `localhost:6001` for API requests.
⚙️ API Endpoints

---

### Predict Price

**POST** `/predict-price`

#### Request:

{\
"productName": "Hoodie",\
"currentPrice": 25\
}

#### Response:

{\
"predicted_price": 30\
}

### Check Loan Eligibility

**POST** `/check-loan`

#### Request:

{\
"smbId": "12345",\
"revenue": 5000,\
"preOrders": 50,\
"creditScore": 700,\
"loanAmountRequested": 2000\
}

#### Response:

{\
"eligibility": "Approved",\
"businessName": "Fashion Hub"\
}

## 🏆 Contributing

1.  Fork the repo
2.  Create a new branch (`feature/amazing-feature`)
3.  Commit changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a PR 🎉

## 📜 License

This project is for the **Visa Hackathon** and follows Visa's hackathon guidelines.

---

💙 **Built with passion for SMBs at the Visa Hackathon**
