/**
 * MountainKid Nutritional Score Calculator API Server
 * Express.js implementation for serving the calculator as a REST API
 */

const express = require('express');
const cors = require('cors');
const { calculateNutritionalScore } = require('./nutritional_score');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'MountainKid Nutritional Score Calculator API',
    endpoints: {
      calculate: '/api/calculate'
    }
  });
});

// Calculate nutritional score endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { calories, protein, fiber, scaleFactor } = req.body;
    
    // Validate inputs
    if (
      typeof calories !== 'number' || 
      typeof protein !== 'number' || 
      typeof fiber !== 'number' || 
      typeof scaleFactor !== 'number'
    ) {
      return res.status(400).json({
        error: 'Invalid input. All parameters must be numbers.'
      });
    }
    
    // Calculate score
    const score = calculateNutritionalScore(calories, protein, fiber, scaleFactor);
    
    // Return result
    return res.json({
      input: { calories, protein, fiber, scaleFactor },
      score
    });
  } catch (error) {
    console.error('Error calculating nutritional score:', error);
    return res.status(500).json({
      error: 'Failed to calculate nutritional score'
    });
  }
});

// Batch calculate endpoint for load testing
app.post('/api/calculate-batch', (req, res) => {
  try {
    const { meals } = req.body;
    
    if (!Array.isArray(meals)) {
      return res.status(400).json({
        error: 'Invalid input. Meals must be an array.'
      });
    }
    
    const scores = meals.map(meal => {
      const { calories, protein, fiber, scaleFactor } = meal;
      return calculateNutritionalScore(calories, protein, fiber, scaleFactor);
    });
    
    return res.json({ scores });
  } catch (error) {
    console.error('Error calculating batch scores:', error);
    return res.status(500).json({
      error: 'Failed to calculate batch scores'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 