/**
 * Unit tests for the Nutritional Score Calculator
 */

const { expect } = require('chai');
const { 
  calculateNutritionalScore, 
  batchCalculateScores 
} = require('../nutritional_score');

describe('Nutritional Score Calculator', () => {
    test('calculates score correctly for valid input', () => {
        const meal = {
            calories: 200,
            protein: 15,
            fiber: 5,
            scaleFactor: 1.5
        };
        const score = calculateNutritionalScore(meal);
        expect(score).toBe(330); // (200 + 15 + 5) * 1.5 = 330
    });

    test('handles zero values correctly', () => {
        const meal = {
            calories: 0,
            protein: 0,
            fiber: 0,
            scaleFactor: 1.0
        };
        const score = calculateNutritionalScore(meal);
        expect(score).toBe(0);
    });

    test('handles negative values correctly', () => {
        const meal = {
            calories: -100,
            protein: -10,
            fiber: -5,
            scaleFactor: 1.0
        };
        const score = calculateNutritionalScore(meal);
        expect(score).toBe(-115);
    });

    test('handles decimal values correctly', () => {
        const meal = {
            calories: 200.5,
            protein: 15.5,
            fiber: 5.5,
            scaleFactor: 1.5
        };
        const score = calculateNutritionalScore(meal);
        expect(score).toBe(332.25);
    });
});

describe('batchCalculateScores()', () => {
  it('should calculate scores for multiple meals', async () => {
    const meals = [
      { calories: 200, protein: 15, fiber: 5, scaleFactor: 1.5 },
      { calories: 300, protein: 20, fiber: 10, scaleFactor: 1.2 },
      { calories: 150, protein: 10, fiber: 3, scaleFactor: 2.0 }
    ];
    
    const expectedScores = [
      (200 + 15 + 5) * 1.5, // 330
      (300 + 20 + 10) * 1.2, // 396
      (150 + 10 + 3) * 2.0 // 326
    ];
    
    const scores = await batchCalculateScores(meals);
    
    expect(scores).to.deep.equal(expectedScores);
  });
  
  it('should return an empty array for empty input', async () => {
    const scores = await batchCalculateScores([]);
    expect(scores).to.be.an('array').that.is.empty;
  });
}); 