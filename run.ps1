
# This script helps run the JavaScript and Rust implementations

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("js", "rust", "benchmark-js", "benchmark-rust", "test-js", "test-rust")]
    [string]$Command = "js"
)

switch ($Command) {
    "js" {
        Write-Host "Starting JavaScript server..."
        Set-Location js
        npm install
        node server.js
    }
    "rust" {
        Write-Host "Starting Rust server..."
        Set-Location rust
        cargo run --release
    }
    "benchmark-js" {
        Write-Host "Running JavaScript benchmark..."
        Set-Location js
        node benchmark.js
    }
    "benchmark-rust" {
        Write-Host "Running Rust benchmark..."
        Set-Location rust
        cargo run --release -- benchmark
    }
    "test-js" {
        Write-Host "Running JavaScript tests..."
        Set-Location js
        npm test
    }
    "test-rust" {
        Write-Host "Running Rust tests..."
        Set-Location rust
        cargo test
    }
}

# Return to original directory
Set-Location .. 