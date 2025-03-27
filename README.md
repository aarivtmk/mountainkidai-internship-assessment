# MountainKid Internship Assessment:
# Low Latency High Performance Library - Rust vs JS

## Introduction

This repository demonstrates the performance and latency differences between Rust and JavaScript by implementing a library for a real-world task relevant to MountainKid’s projects (Sari: nutrition app, Farms: AI-driven organic farming, Phunsuk: AI eco-tourism). This assessment is designed for interns to compare the two languages in terms of execution speed, memory management, and scalability, preparing you for high-performance challenges in our startup.

## Problem Statement

Create a library that calculates the **nutritional score** of a Pahari meal (simplified for this task) using both JavaScript (Node.js) and Rust. The nutritional score is a sum of calories, protein, and fiber for a given meal, scaled by a factor. This will showcase:

- Memory handling in JavaScript and Rust.
- Speed of execution for both languages.
- Scalability under concurrent requests.

## Task

1. **Implement the Nutritional Score Calculator**:
   - **Input**: A meal object with `calories` (int), `protein` (int), `fiber` (int), and a `scale_factor` (float).
   - **Output**: `score = (calories + protein + fiber) * scale_factor`.
   - **Example**: For `calories=200`, `protein=15`, `fiber=5`, `scale_factor=1.5`, the score is `(200 + 15 + 5) * 1.5 = 330`.
   - Process 10,000 meal calculations in a loop to test performance.

2. **Measure Performance Metrics**:
   - Execution time for 10,000 calculations (in milliseconds).
   - Memory usage (in MB, use tools like `node --inspect` for JS, `valgrind` for Rust).
   - Scalability: Set up a simple REST API (e.g., Express for JS, Actix-web for Rust) to serve the calculator. Perform a load test (e.g., 1000 concurrent requests) using a tool like `wrk` or `ab`.

3. **Showcase Metrics**:
   - Report CPU usage (e.g., via `top` or `htop`) and response time (from load test).



## How to Run

### JavaScript
1. Install Node.js.
2. Clone the repository.
3. Navigate to the `js` folder.
4. Run `npm install`.
5. Run `node nutritional_score.js`.


##  My Output Is Below

![alt text](<Screenshot from 2025-03-27 08-16-38.png>)

