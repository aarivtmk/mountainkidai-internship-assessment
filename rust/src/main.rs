use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use actix_cors::Cors;
use serde::{Serialize, Deserialize};
use nutritional_score::{Meal, calculate_nutritional_score, batch_calculate_scores, run_benchmark};
use std::sync::Mutex;
use std::process;

// API request and response structures
#[derive(Debug, Serialize, Deserialize)]
struct CalculateRequest {
    calories: f64,
    protein: f64,
    fiber: f64,
    scale_factor: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct CalculateResponse {
    input: CalculateRequest,
    score: f64,
}

#[derive(Debug, Serialize, Deserialize)]
struct BatchCalculateRequest {
    meals: Vec<Meal>,
}

#[derive(Debug, Serialize, Deserialize)]
struct BatchCalculateResponse {
    scores: Vec<f64>,
}

// Shared state for metrics
struct AppState {
    request_count: Mutex<usize>,
}

// Home endpoint
async fn index() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "message": "MountainKid Nutritional Score Calculator API (Rust)",
        "endpoints": {
            "calculate": "/api/calculate",
            "calculate_batch": "/api/calculate-batch"
        }
    }))
}

// Calculate endpoint
async fn calculate(req: web::Json<CalculateRequest>) -> impl Responder {
    let meal = Meal {
        calories: req.calories,
        protein: req.protein,
        fiber: req.fiber,
        scale_factor: req.scale_factor,
    };
    
    let score = calculate_nutritional_score(&meal);
    
    HttpResponse::Ok().json(CalculateResponse {
        input: req.into_inner(),
        score,
    })
}

// Batch calculate endpoint
async fn calculate_batch(req: web::Json<BatchCalculateRequest>) -> impl Responder {
    let scores = batch_calculate_scores(&req.meals);
    HttpResponse::Ok().json(BatchCalculateResponse { scores })
}

// Metrics endpoint
async fn metrics(data: web::Data<AppState>) -> impl Responder {
    let count = data.request_count.lock().unwrap();
    
    HttpResponse::Ok().json(serde_json::json!({
        "requests_processed": *count,
    }))
}

// Main function
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Set up logging
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    // If the first argument is "benchmark", run only the benchmark
    let args: Vec<String> = std::env::args().collect();
    if args.len() > 1 && args[1] == "benchmark" {
        run_benchmark();
        process::exit(0);
    }
    
    // Otherwise, start the web server
    let app_state = web::Data::new(AppState {
        request_count: Mutex::new(0),
    });
    
    // Start HTTP server
    println!("Starting server at http://0.0.0.0:8080");
    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();
        
        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .route("/", web::get().to(index))
            .route("/api/calculate", web::post().to(calculate))
            .route("/api/calculate-batch", web::post().to(calculate_batch))
            .route("/metrics", web::get().to(metrics))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
} 