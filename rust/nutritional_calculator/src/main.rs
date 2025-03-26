use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use serde::{Deserialize, Serialize};

/// Request structure (Meal Input)
#[derive(Deserialize)]
struct MealInput {
    calories: i32,
    protein: i32,
    fiber: i32,
    scale_factor: f32,
}

/// Response structure (Calculated Score)
#[derive(Serialize)]
struct ScoreResponse {
    score: f32,
}

/// Function to calculate score
fn calculate_score(meal: &MealInput) -> f32 {
    (meal.calories + meal.protein + meal.fiber) as f32 * meal.scale_factor
}

/// API Handler
async fn calculate(meal: web::Json<MealInput>) -> impl Responder {
    let score = calculate_score(&meal);
    HttpResponse::Ok().json(ScoreResponse { score })
}

/// Main function to start the server
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/calculate", web::post().to(calculate))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
