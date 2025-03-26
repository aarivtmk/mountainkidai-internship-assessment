const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('public'));
const calculateNutritionalScore = (calories, protein, fiber, scale_factor) => {
   let score=0;
   console.time("Execution Time"); // Start execution time measurement
   for(let i = 0;i<10000;i++){
     score = (calories  + protein + fiber) * scale_factor;
  
     }
     console.timeEnd("Execution Time"); // End execution time measurement
     return score;
}

app.post('/nutritional_score', (req, res) => {
  const { calories, protein, fiber, scale_factor  } = req.body;
  if(!calories || !protein || !fiber || !scale_factor) {
      return res.status(400).send('Please provide all the required fields');
  }
    const result = calculateNutritionalScore(parseInt(calories), parseInt(protein), parseInt(fiber), parseFloat(scale_factor));
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024; // Convert to MB
    res.json({ result, memoryUsage: memoryUsage.toFixed(2) + " MB" });
  
}
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}
);