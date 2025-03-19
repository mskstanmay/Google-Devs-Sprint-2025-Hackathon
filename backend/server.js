const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI('AIzaSyCoQNsrfCeVwF2lfFr4L40ySuHLSHji1uw');

app.post('/api/analyze-product', async (req, res) => {
  try {
    const { category, description } = req.body;
   // console.log(genAI.ListModels());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

    const prompt = `Analyze the environmental impact of this product:
    Category: ${category}
    Description: ${description}
    
    Please provide a detailed analysis including:
    1. Environmental impact score (0-100)
    2. Main environmental concerns
    3. Sustainability recommendations
    Format the response in a clear, structured way.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ analysis: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze product' });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
