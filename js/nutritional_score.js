const express = require('express');
const { calculateNutritionalScore } = require('./nutrition');

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const port = 3000;


app.post('/calculate', (req, res) => {
    const meal = req.body;
    if (!meal.calories || !meal.protein || !meal.fiber || !meal.scale_factor) {
        return res.send({ error: "Missing meal properties" });
    }
    res.send({ nutritional_score: calculateNutritionalScore(meal) });
});

// 10,000 Calculations
app.get('/calculations', (req, res) => {
    const start = process.hrtime(); // Start time in high-resolution

    console.time("Execution Time");
   

    // Capture execution time
    console.timeEnd("Execution Time");
    const diff = process.hrtime(start); 
    // End time
    const executionTime = (diff[0] * 1e3) + (diff[1] / 1e6);
    
    const meal2 = { calories: 200, protein: 15, fiber: 5, scale_factor: 1.7 };
    const result=(meal2.calories + meal2.protein + meal2.fiber) * meal2.scale_factor;
    
    const iterations = 10000;
    for (let i = 0; i < iterations; i++) {
        calculateNutritionalScore(meal2);
    }
    
    res.send({ message: "calculations completed", executionTime, iterations ,meal2,result});
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
