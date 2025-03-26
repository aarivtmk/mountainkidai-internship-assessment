const { expect } = require("chai");
const { describe, it } = require("mocha");
const { calculateNutritionalScore } = require("./server");

describe("Nutritional Score Calculator", function () {
    it("should return correct score", function () {
        const result = calculateNutritionalScore(200, 15, 5, 1.5);
        expect(result).to.equal(330);
    });
});
