/**
 * Calculate the nutritional score for a meal
 * @param {number} calories - Calorie content of the meal
 * @param {number} protein - Protein content in grams
 * @param {number} fiber - Fiber content in grams
 * @param {number} scaleFactor - Scaling factor for the final score
 * @returns {number} The calculated nutritional score
 */
function calculateNutritionalScore(calories, protein, fiber, scaleFactor) {
  return (calories + protein + fiber) * scaleFactor;
}

/**
 * Batch calculate nutritional scores for multiple meals
 * @param {Array} meals - Array of meal objects with calories, protein, fiber, and scaleFactor
 * @returns {Array} Array of calculated scores
 */
async function batchCalculateScores(meals) {
  return meals.map(meal => 
    calculateNutritionalScore(
      meal.calories, 
      meal.protein, 
      meal.fiber, 
      meal.scaleFactor
    )
  );
}

/**
 * Performance benchmark function
 * Calculates 10,000 nutritional scores and measures execution time
 */
async function runBenchmark() {
  console.log('Starting JavaScript benchmark...');
  
  // Generate 10,000 sample meals
  const meals = [];
  for (let i = 0; i < 10000; i++) {
    meals.push({
      calories: 200 + Math.floor(Math.random() * 300),
      protein: 10 + Math.floor(Math.random() * 20),
      fiber: 2 + Math.floor(Math.random() * 8),
      scaleFactor: 1 + Math.random()
    });
  }
  
  // Measure execution time
  const startTime = process.hrtime.bigint();
  const scores = await batchCalculateScores(meals);
  const endTime = process.hrtime.bigint();
  
  const executionTimeMs = Number(endTime - startTime) / 1000000;
  
  console.log(`Calculated 10,000 nutritional scores in ${executionTimeMs.toFixed(2)} ms`);
  console.log(`Average score: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)}`);
  
  // Log memory usage
  const memoryUsage = process.memoryUsage();
  console.log(`Memory usage: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  
  return {
    executionTimeMs,
    averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    memoryUsageMB: memoryUsage.heapUsed / 1024 / 1024
  };
}

// If this file is run directly (not imported as a module)
if (require.main === module) {
  runBenchmark();
}

module.exports = {
  calculateNutritionalScore,
  batchCalculateScores,
  runBenchmark
}; 