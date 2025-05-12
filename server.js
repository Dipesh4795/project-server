const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(
  cors({
    origin: "*", // or specify your frontend URL e.g., 'https://your-frontend.com'
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware
app.use(bodyParser.json());

// Static data - Stock recommendations based on investment amount ranges
const stockRecommendations = {
  beginner: {
    range: { min: 0, max: 10000 },
    stocks: [
      { symbol: "HDFCBANK", name: "HDFC Bank Ltd.", risk: "Low", price: 1580 },
      {
        symbol: "RELIANCE",
        name: "Reliance Industries Ltd.",
        risk: "Low",
        price: 2450,
      },
      {
        symbol: "TCS",
        name: "Tata Consultancy Services Ltd.",
        risk: "Low",
        price: 3670,
      },
      { symbol: "INFY", name: "Infosys Ltd.", risk: "Low", price: 1480 },
      { symbol: "ICICIBANK", name: "ICICI Bank Ltd.", risk: "Low", price: 985 },
      {
        symbol: "KOTAKBANK",
        name: "Kotak Mahindra Bank Ltd.",
        risk: "Low",
        price: 1790,
      },
      {
        symbol: "HINDUNILVR",
        name: "Hindustan Unilever Ltd.",
        risk: "Low",
        price: 2570,
      },
      {
        symbol: "SBIN",
        name: "State Bank of India",
        risk: "Low-Medium",
        price: 740,
      },
      {
        symbol: "BHARTIARTL",
        name: "Bharti Airtel Ltd.",
        risk: "Low-Medium",
        price: 920,
      },
      { symbol: "ITC", name: "ITC Ltd.", risk: "Low", price: 430 },
    ],
  },
  intermediate: {
    range: { min: 10000, max: 1000000 },
    stocks: [
      {
        symbol: "ASIANPAINT",
        name: "Asian Paints Ltd.",
        risk: "Medium",
        price: 31200,
      },
      {
        symbol: "AXISBANK",
        name: "Axis Bank Ltd.",
        risk: "Medium",
        price: 10500,
      },
      {
        symbol: "BAJFINANCE",
        name: "Bajaj Finance Ltd.",
        risk: "Medium",
        price: 69300,
      },
      {
        symbol: "MARUTI",
        name: "Maruti Suzuki India Ltd.",
        risk: "Medium",
        price: 10250,
      },
      {
        symbol: "HCLTECH",
        name: "HCL Technologies Ltd.",
        risk: "Medium",
        price: 13500,
      },
      {
        symbol: "SUNPHARMA",
        name: "Sun Pharmaceutical Industries Ltd.",
        risk: "Medium",
        price: 12700,
      },
      {
        symbol: "TATAMOTORS",
        name: "Tata Motors Ltd.",
        risk: "Medium-High",
        price: 76000,
      },
      {
        symbol: "NESTLEIND",
        name: "Nestle India Ltd.",
        risk: "Medium",
        price: 22780,
      },
      {
        symbol: "ULTRACEMCO",
        name: "UltraTech Cement Ltd.",
        risk: "Medium",
        price: 94300,
      },
      {
        symbol: "POWERGRID",
        name: "Power Grid Corporation of India Ltd.",
        risk: "Medium",
        price: 27000,
      },
      { symbol: "WIPRO", name: "Wipro Ltd.", risk: "Medium", price: 470 },
      {
        symbol: "TATASTEEL",
        name: "Tata Steel Ltd.",
        risk: "Medium-High",
        price: 13500,
      },
    ],
  },
  advanced: {
    range: { min: 1000001, max: 5000000 },
    stocks: [
      {
        symbol: "BAJAJFINSV",
        name: "Bajaj Finserv Ltd.",
        risk: "Medium-High",
        price: 1640,
      },
      {
        symbol: "TITAN",
        name: "Titan Company Ltd.",
        risk: "Medium-High",
        price: 3320,
      },
      {
        symbol: "ADANIENT",
        name: "Adani Enterprises Ltd.",
        risk: "High",
        price: 2700,
      },
      {
        symbol: "ADANIPORTS",
        name: "Adani Ports and Special Economic Zone Ltd.",
        risk: "High",
        price: 1190,
      },
      {
        symbol: "DIVISLAB",
        name: "Divi's Laboratories Ltd.",
        risk: "Medium-High",
        price: 3750,
      },
      {
        symbol: "DRREDDY",
        name: "Dr. Reddy's Laboratories Ltd.",
        risk: "Medium-High",
        price: 5890,
      },
      {
        symbol: "EICHERMOT",
        name: "Eicher Motors Ltd.",
        risk: "Medium-High",
        price: 3870,
      },
      {
        symbol: "GRASIM",
        name: "Grasim Industries Ltd.",
        risk: "Medium-High",
        price: 2100,
      },
      { symbol: "JSWSTEEL", name: "JSW Steel Ltd.", risk: "High", price: 870 },
      { symbol: "NTPC", name: "NTPC Ltd.", risk: "Medium", price: 315 },
      {
        symbol: "ONGC",
        name: "Oil and Natural Gas Corporation Ltd.",
        risk: "Medium-High",
        price: 250,
      },
      {
        symbol: "BRITANNIA",
        name: "Britannia Industries Ltd.",
        risk: "Medium",
        price: 4780,
      },
    ],
  },
  expert: {
    range: { min: 5000001, max: Infinity },
    stocks: [
      {
        symbol: "BAJAJHLDNG",
        name: "Bajaj Holdings & Investment Ltd.",
        risk: "Medium-High",
        price: 7150,
      },
      {
        symbol: "BOSCHLTD",
        name: "Bosch Ltd.",
        risk: "Medium-High",
        price: 24380,
      },
      {
        symbol: "MCDOWELL-N",
        name: "United Spirits Ltd.",
        risk: "Medium-High",
        price: 1150,
      },
      {
        symbol: "PGHH",
        name: "Procter & Gamble Hygiene & Health Care Ltd.",
        risk: "Medium",
        price: 16950,
      },
      {
        symbol: "SHREECEM",
        name: "Shree Cement Ltd.",
        risk: "Medium-High",
        price: 25780,
      },
      {
        symbol: "NAUKRI",
        name: "Info Edge (India) Ltd.",
        risk: "High",
        price: 5840,
      },
      {
        symbol: "LTI",
        name: "LTI Mindtree Ltd.",
        risk: "Medium-High",
        price: 5320,
      },
      {
        symbol: "PAGEIND",
        name: "Page Industries Ltd.",
        risk: "Medium-High",
        price: 42560,
      },
      {
        symbol: "HONAUT",
        name: "Honeywell Automation India Ltd.",
        risk: "Medium",
        price: 48750,
      },
      { symbol: "MRF", name: "MRF Ltd.", risk: "Medium-High", price: 113000 },
      {
        symbol: "3MINDIA",
        name: "3M India Ltd.",
        risk: "Medium",
        price: 33990,
      },
      {
        symbol: "ABBOTINDIA",
        name: "Abbott India Ltd.",
        risk: "Medium",
        price: 23670,
      },
    ],
  },
};

/**
 * Get investment category based on amount
 * @param {number} amount - Investment amount
 * @returns {string} Investment category
 */
function getInvestmentCategory(amount) {
  if (amount <= stockRecommendations.beginner.range.max) {
    return "beginner";
  } else if (amount <= stockRecommendations.intermediate.range.max) {
    return "intermediate";
  } else if (amount <= stockRecommendations.advanced.range.max) {
    return "advanced";
  } else {
    return "expert";
  }
}

/**
 * Calculate how many shares can be purchased
 * @param {number} investmentAmount - Total investment amount
 * @param {Array} recommendedStocks - List of recommended stocks
 * @returns {Array} Stocks with purchasable shares
 */
function calculatePurchasableShares(investmentAmount, recommendedStocks) {
  return recommendedStocks.map((stock) => {
    const maxShares = Math.floor(investmentAmount / stock.price);
    const totalInvestment = maxShares * stock.price;

    return {
      ...stock,
      maxShares,
      totalInvestment,
      percentOfTotal: ((totalInvestment / investmentAmount) * 100).toFixed(2),
      priceFormatted: `₹${stock.price.toLocaleString("en-IN")}`,
    };
  });
}

// API Routes

// Stock recommendations based on investment amount
app.post("/api/stock-recommendations", (req, res) => {
  const { amount } = req.body;

  // Validate input
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      error: "Please provide a valid investment amount greater than 0",
    });
  }

  const category = getInvestmentCategory(amount);
  const recommendedStocks = stockRecommendations[category].stocks;
  const purchasableStocks = calculatePurchasableShares(
    amount,
    recommendedStocks
  );

  res.json({
    success: true,
    investmentAmount: `₹${amount.toLocaleString("en-IN")}`,
    category,
    recommendations: purchasableStocks.map((stock) => ({
      ...stock,
      price: `₹${stock.price.toLocaleString("en-IN")}`,
      totalInvestment: `₹${stock.totalInvestment.toLocaleString("en-IN")}`,
    })),
    portfolioSuggestion: {
      conservative:
        "Consider allocating 60% to low-risk, 30% to medium-risk, and 10% to high-risk investments",
      moderate:
        "Consider allocating 40% to low-risk, 40% to medium-risk, and 20% to high-risk investments",
      aggressive:
        "Consider allocating 20% to low-risk, 40% to medium-risk, and 40% to high-risk investments",
    },
  });
});

// Loan evaluation endpoint
app.post("/api/loan-evaluation", (req, res) => {
  const { amount, income, loanAmount, creditScore, loanTerm } = req.body;

  // Validate required inputs
  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({
      error: "Please provide a valid investment amount greater than 0",
    });
  }

  if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
    return res.status(400).json({
      error: "Please provide a valid loan amount greater than 0",
    });
  }

  // Calculate loan-to-income ratio
  const loanToIncome = income ? (loanAmount / income).toFixed(2) : "Unknown";

  // Simple loan evaluation
  let loanEvaluation = "Moderate risk";
  let interestRate = 7.5;

  if (creditScore) {
    if (creditScore >= 750) {
      loanEvaluation = "Low risk";
      interestRate = 5.5;
    } else if (creditScore >= 650) {
      loanEvaluation = "Moderate risk";
      interestRate = 7.5;
    } else {
      loanEvaluation = "High risk";
      interestRate = 12.5;
    }
  }

  // Calculate monthly payment if loan term is provided
  let monthlyPayment = null;
  if (loanTerm && !isNaN(loanTerm) && loanTerm > 0) {
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    monthlyPayment =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
  }

  // Get stock recommendations to invest remaining amount
  const remainingAmount = amount;
  const category = getInvestmentCategory(remainingAmount);
  const recommendedStocks = stockRecommendations[category].stocks;
  const purchasableStocks = calculatePurchasableShares(
    remainingAmount,
    recommendedStocks
  );

  res.json({
    success: true,
    loanAmount: `₹${loanAmount.toLocaleString("en-IN")}`,
    loanEvaluation,
    interestRate: `${interestRate}%`,
    loanToIncome,
    monthlyPayment: monthlyPayment
      ? `₹${monthlyPayment.toFixed(2).toLocaleString("en-IN")}`
      : "Unknown",
    investmentAmount: `₹${remainingAmount.toLocaleString("en-IN")}`,
    category,
    recommendations: purchasableStocks.map((stock) => ({
      ...stock,
      price: `₹${stock.price.toLocaleString("en-IN")}`,
      totalInvestment: `₹${stock.totalInvestment.toLocaleString("en-IN")}`,
    })),
  });
});

// Get all available stocks
app.get("/api/all-stocks", (req, res) => {
  const allStocks = Object.values(stockRecommendations).flatMap(
    (category) => category.stocks
  );

  // Remove duplicates based on symbol
  const uniqueStocks = allStocks.filter(
    (stock, index, self) =>
      index === self.findIndex((s) => s.symbol === stock.symbol)
  );

  res.json({
    success: true,
    stocks: uniqueStocks.map((stock) => ({
      ...stock,
      price: `₹${stock.price.toLocaleString("en-IN")}`,
    })),
  });
});

// Server initialization
app.listen(PORT, () => {
  console.log(`Financial Stock Recommendation API is running on port ${PORT}`);
});
