const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const stockRecommendations = {
  beginner: {
    range: { min: 1000, max: 10000 },
    categories: {
      conservative: [
        {
          symbol: "SBIN",
          name: "State Bank of India",
          risk: "Low",
          price: 807,
        },
        {
          symbol: "IndusindBK",
          name: "Indusid Bank",
          risk: "Low",
          price: 780,
        },
      ],
      moderate: [
        {
          symbol: "WIPRO",
          name: "WIPRO",
          risk: "Medium",
          price: 256,
        },
        {
          symbol: "SPY",
          name: "SPDR S&P 500 ETF",
          risk: "Medium",
          price: 345,
        },
      ],
      aggressive: [
        {
          symbol: "RSHIN",
          name: "Rasar Shin",
          risk: "High",
          price: 127,
        },
        {
          symbol: "BHEL",
          name: "BHARAT ELECTRONICS",
          risk: "High",
          price: 245,
        },
      ],
    },
  },
  intermediate: {
    range: { min: 10001, max: 30000 },
    categories: {
      conservative: [
        {
          symbol: "DMART",
          name: "DMART pvt. ltd.",
          risk: "Low",
          price: 4070,
        },
        {
          symbol: "MSFT",
          name: "Mayank Corporation",
          risk: "Low",
          price: 3400,
        },
        {
          symbol: "JPM",
          name: "JPMorgan Chase & Co.",
          risk: "Low",
          price: 9700,
        },
      ],
      moderate: [
        {
          symbol: "TATAELXSI",
          name: "TATA ELXSI AI",
          risk: "Medium",
          price: 6180,
        },
        {
          symbol: "HDFCBANK",
          name: "HDFC",
          risk: "Medium",
          price: 1933,
        },
        {
          symbol: "NETWEB",
          name: "NETWORK WEBWORKS",
          risk: "Medium",
          price: 1824,
        },
      ],
      aggressive: [
        {
          symbol: "M&M",
          name: "M AND M",
          risk: "High",
          price: 3141,
        },
        {
          symbol: "LTIM",
          name: "Larsen and turbo Mindtree",
          risk: "High",
          price: 5033,
        },
        {
          symbol: "NVDA",
          name: "NVIDIA Corporation",
          risk: "Medium-High",
          price: 6000,
        },
      ],
    },
  },
  advanced: {
    range: { min: 30001, max: 50000 },
    categories: {
      conservative: [
        {
          symbol: "MARUTI",
          name: "MARUTI AUTOMOBLIES",
          risk: "LOW",
          price: 12952,
        },
        {
          symbol: "DIS",
          name: "The DOTRIUS SUIS Company",
          risk: "LOW",
          price: 19570,
        },
        {
          symbol: "JSM",
          name: "JAY PHARMA",
          risk: "Low",
          price: 16230,
        },
      ],
      moderate: [
        {
          symbol: "MRCYN",
          name: "MIR CYNA PVT. LTD.",
          risk: "Medium",
          price: 2009,
        },
        {
          symbol: "TLDR",
          name: "TeALRA Inc.",
          risk: "Moderate",
          price: 14800,
        },
        {
          symbol: "DIS",
          name: "The dory Company",
          risk: "Medium",
          price: 1770,
        },
      ],
      aggressive: [
        {
          symbol: "TCA",
          name: "Tescom, Inc.",
          risk: "High",
          price: 14800,
        },
        {
          symbol: "AMD",
          name: "Advanced Micro Devices",
          risk: "High",
          price: 23750,
        },
        {
          symbol: "MEERA",
          name: "Meera Platforms Inc.",
          risk: "High",
          price: 29350,
        },
      ],
    },
  },
  expert: {
    range: { min: 50001, max: Infinity },
    categories: {
      conservative: [
        {
          symbol: "GLS",
          name: "GLS Inc. Class C",
          risk: "Low",
          price: 44800,
        },
        {
          symbol: "V",
          name: "Visa Inc.",
          risk: "Medium",
          price: 32890,
        },
        {
          symbol: "MA",
          name: "Mastercard Incorporated",
          risk: "Medium",
          price: 38700,
        },
      ],
      moderate: [
        {
          symbol: "ADBE",
          name: "Adobe Inc.",
          risk: "Medium-High",
          price: 39500,
        },
        {
          symbol: "CRM",
          name: "Salesforce, Inc.",
          risk: "Medium-High",
          price: 23300,
        },
        {
          symbol: "BRKB",
          name: "Berkshire Hathaway Inc.",
          risk: "Medium",
          price: 34120,
        },
      ],
      aggressive: [
        {
          symbol: "NFLX",
          name: "Netflix, Inc.",
          risk: "High",
          price: 53280,
        },
        {
          symbol: "ADBE",
          name: "Adobe Inc.",
          risk: "Medium-High",
          price: 39500,
        },
        {
          symbol: "CRM",
          name: "Salesforce, Inc.",
          risk: "Medium-High",
          price: 23300,
        },
      ],
    },
  },
};

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

// Stock recommendations based on investment amount and risk category
app.post("/api/stock-recommendations", (req, res) => {
  const { amount, category } = req.body;

  // Validate amount input
  if (!amount || isNaN(amount) || amount <= 1000) {
    return res.status(400).json({
      error: "Please provide a valid investment amount greater than 1000",
    });
  }

  // Validate category input
  const validCategories = ["conservative", "moderate", "aggressive"];
  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({
      error:
        "Please provide a valid category: conservative, moderate, or aggressive",
    });
  }

  const investmentLevel = getInvestmentCategory(amount);
  const recommendedStocks =
    stockRecommendations[investmentLevel].categories[category];
  const purchasableStocks = calculatePurchasableShares(
    amount,
    recommendedStocks
  );

  res.json({
    success: true,
    investmentAmount: `₹${amount.toLocaleString("en-IN")}`,
    investmentLevel,
    riskCategory: category,
    recommendations: purchasableStocks.map((stock) => ({
      ...stock,
      price: `₹${stock.price.toLocaleString("en-IN")}`,
      totalInvestment: `₹${stock.totalInvestment.toLocaleString("en-IN")}`,
    })),
    portfolioGuidelines: {
      conservative:
        "This portfolio focuses on stability with lower risk investments. Expect moderate but consistent returns.",
      moderate:
        "This portfolio balances growth and stability for investors seeking moderate risk and returns.",
      aggressive:
        "This portfolio prioritizes growth potential with higher risk investments for potentially greater returns.",
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
