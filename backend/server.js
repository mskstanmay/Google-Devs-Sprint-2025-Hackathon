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

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/analyze-product', async (req, res) => {
  try {
    const { category, description } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });

    const prompt = `Analyze the environmental impact of this product:
    Category: ${category}
    Description: ${description}
    
    Please provide a detailed analysis in the following format exactly:
    First line: Two numbers between 0-100 separated by a comma representing:
    - Supply chain impact score
    - Manufacturing process impact score
    
    Then provide:
    - Main environmental concerns in bullet points
    - Sustainability recommendations in bullet points
    
    Example format:
    75,82
    Main Environmental Concerns:
    • Concern 1
    • Concern 2
    
    Sustainability Recommendations:
    • Recommendation 1
    • Recommendation 2`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    // Split the first line to get the scores
    const lines = text.split('\n');
    const values = lines[0].slice(3).replace(" ","").split(",");
    console.log(values);
    
    // Join the rest of the analysis
    const analysis = lines.slice(1).join('\n');

    res.json({ 
      analysis: `${analysis}`,
      scores:values
    });
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
