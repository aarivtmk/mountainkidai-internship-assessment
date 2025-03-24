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

## Features

- **JavaScript**: Async operations (use `async/await`), event-driven programming.
- **Rust**: Memory safety, zero-cost abstractions, multi-threading (use `rayon` for parallel calculations).

## How to Run

### JavaScript
1. Install Node.js (v18+ recommended).
2. Clone the repository.
3. Navigate to the `js` folder.
4. Run `npm install` (if dependencies like Express are used).
5. Run `node nutritional_score.js`.

### Rust
1. Install Rust (via `rustup`, stable channel).
2. Clone the repository.
3. Navigate to the `rust` folder.
4. Run `cargo run --release` (release mode for optimized performance).

## Performance Comparison (Example)

| Metric                          | JavaScript (Node.js) | Rust         |
|---------------------------------|----------------------|--------------|
| Nutritional Score (10,000 calculations) | 20 ms             | 6 ms         |
| Memory Usage                    | 50 MB               | 20 MB        |
| Scalability (Load Test)         | 1000 requests/sec   | 2000 requests/sec |
| Average Response Time           | 10 ms               | 3 ms         |

**Note**: These metrics were measured on a system with 8GB RAM, 4-core CPU (2.4 GHz), Ubuntu 20.04. Your results may vary—document your setup.

## Evaluation Criteria

Your submission will be evaluated on:

- **Performance (40%)**: Speed (execution time) and memory usage for 10,000 calculations.
- **Scalability (20%)**: Load test results (requests/sec, response time).
- **Code Quality (20%)**: Readability, documentation, and error handling.
- **Testing (10%)**: Include unit tests (e.g., `mocha` for JS, `cargo test` for Rust).
- **Relevance (10%)**: How well your implementation aligns with MountainKid’s needs (e.g., scalability for 10M Phunsuk users).

## Bonus (Optional)

- Optimize the Rust implementation using multi-threading (e.g., `rayon` crate).
- Add a caching mechanism (e.g., memoization) to avoid recalculating the same meal scores.

## Submission Guidelines

- Submit your code via a pull request to this repository by **March 30, 2025, 11:59 PM IST**.
- Include a `README.md` in your submission folder with:
  - How to run your code.
  - Your performance metrics (execution time, memory usage, load test results).
  - A brief explanation of your approach and optimizations.
- Shortlisted candidates will be interviewed from **April 1-5, 2025**.

## Conclusion

- **JavaScript** is great for quick prototyping and event-driven apps (e.g., Sari’s frontend).
- **Rust** is ideal for high-performance, scalable systems (e.g., Phunsuk’s AI backend for 10M users).

At MountainKid, we use both to build the future of Himachal Pradesh—join us to make an impact!

## Contributing

Feel free to submit pull requests with optimizations, improvements, or suggestions. For questions, email [hello@mountainkid.ai].

## Thank You

We’re excited to see your skills and welcome you to MountainKid’s mission of serving 10M MountainKid Valley users by 2035!
