/**
 * Benchmark script for the JavaScript Nutritional Score Calculator API
 * Uses autocannon for load testing and v8-profiler for memory measurement
 */

const autocannon = require('autocannon');
const { randomInt } = require('crypto');
const v8 = require('v8');
const os = require('os');

// CPU monitoring function
function getCPUUsage() {
    const cpus = os.cpus();
    let totalIdle = 0;
    let totalTick = 0;

    cpus.forEach(cpu => {
        for (let type in cpu.times) {
            totalTick += cpu.times[type];
        }
        totalIdle += cpu.times.idle;
    });

    return {
        idle: totalIdle / cpus.length,
        total: totalTick / cpus.length,
        usage: ((totalTick - totalIdle) / totalTick) * 100
    };
}

// Memory measurement function
function measureMemory() {
    const heapStats = v8.getHeapStatistics();
    return {
        totalHeapSize: heapStats.total_heap_size / (1024 * 1024), // MB
        usedHeapSize: heapStats.used_heap_size / (1024 * 1024),   // MB
        heapSizeLimit: heapStats.heap_size_limit / (1024 * 1024)  // MB
    };
}

// Configure the benchmark
const benchmark = autocannon({
  url: 'http://localhost:3000/api/calculate',
  connections: 100, // number of concurrent connections
  pipelining: 1,    // default
  duration: 10,     // seconds
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  setupClient: (client) => {
    client.on('error', (error) => {
      console.error('Error during benchmark:', error);
    });
    return client;
  },
  // Generate random meal data for each request
  body: JSON.stringify({
    calories: 200 + randomInt(300),
    protein: 10 + randomInt(20),
    fiber: 2 + randomInt(8),
    scaleFactor: 1 + Math.random()
  })
});

// Benchmark reporting
benchmark.on('start', () => {
  console.log('Benchmark started...');
  console.log('Initial CPU Usage:', getCPUUsage());
  console.log('Initial Memory Usage:', measureMemory());
});

benchmark.on('tick', () => {
  console.log('Current CPU Usage:', getCPUUsage());
});

benchmark.on('done', (results) => {
  console.log('-----------------------------------------');
  console.log('Benchmark Results:');
  console.log('-----------------------------------------');
  console.log(`Requests/sec: ${results.requests.average}`);
  console.log(`Transfer/sec: ${(results.throughput.average / 1024).toFixed(2)} KB`);
  console.log(`Mean latency: ${results.latency.average.toFixed(2)} ms`);
  console.log(`Median latency: ${results.latency.p50.toFixed(2)} ms`);
  console.log(`99th percentile: ${results.latency.p99.toFixed(2)} ms`);
  console.log(`Total requests: ${results.requests.total}`);
  console.log('-----------------------------------------');
  console.log('Final CPU Usage:', getCPUUsage());
  console.log('Final Memory Usage:', measureMemory());
  console.log('-----------------------------------------');
});

// Also log the output from autocannon
autocannon.track(benchmark, { renderProgressBar: true });

// Handle process exit
process.once('SIGINT', () => {
  benchmark.stop();
});

// If this script is run directly
if (require.main === module) {
  console.log('Starting load test against http://localhost:3000/api/calculate');
  console.log('Press Ctrl+C to stop the benchmark');
} 