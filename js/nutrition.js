function calculateNutritionalScore(meal) {
    return (meal.calories + meal.protein + meal.fiber) * meal.scale_factor;
}

// Export function for API use
module.exports = { calculateNutritionalScore };
