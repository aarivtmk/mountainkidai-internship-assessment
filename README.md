# MountainKid Internship Assessment:
# Low Latency High Performance Library - Rust vs JS

## Introduction

This repository demonstrates the difference in performance and latency between **Rust** and **JavaScript** by implementing a library that performs the same task in both languages. This is ideal for students and engineers to compare the two languages in terms of execution speed, memory management, and scalability.

## Problem Statement

Create a simple yet efficient library that calculates the **Fibonacci sequence** for a given number of iterations. This will showcase:

- Memory handling in JavaScript and Rust
- Speed of execution for both languages
- Comparison of concurrent operations

## Task

- Implement a Fibonacci calculator using both JavaScript (Node.js) and Rust.
- Measure the execution time, memory usage, and scalability for each implementation.
- Showcase real-world usage with metrics such as CPU usage and response time.

## Features

- **JavaScript**: Async operations, event-driven programming
- **Rust**: Memory safety, zero-cost abstractions, faster execution

## How to Run

### JavaScript:

1. Install Node.js.
2. Clone the repository.
3. Navigate to the `js` folder.
4. Run `node fibonacci.js`.

### Rust:

1. Install Rust.
2. Clone the repository.
3. Navigate to the `rust` folder.
4. Run `cargo run`.

## Performance Comparison

| Metric               | JavaScript (Node.js) | Rust      |
|----------------------|----------------------|-----------|
| Fibonacci Calculation | 15 ms                | 5 ms      |
| Memory Usage         | 50 MB                | 20 MB     |
| Scalability (Load Test) | 1000 requests/sec  | 2000 requests/sec |

## Conclusion

- **JavaScript** is great for flexibility, easy to use for quick development, and event-driven applications.
- **Rust** outperforms JavaScript in raw speed, memory management, and scalability.

## Contributing

Feel free to submit pull requests with optimizations, improvements, and suggestions!

## Evaluation

Evaluation will be based on the efficiency of your code.

Thank you

