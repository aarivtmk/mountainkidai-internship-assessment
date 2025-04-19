use serde::{Serialize, Deserialize};
use rayon::prelude::*;
use std::alloc::{GlobalAlloc, System as StdSystem, Layout};
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::{Duration, Instant};
use sysinfo::{System as SysInfo, SystemExt, CpuExt};
use rand::Rng;

/// Meal structure representing nutritional components
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Meal {
    pub calories: f64,
    pub protein: f64,
    pub fiber: f64,
    pub scale_factor: f64,
}

/// Calculate the nutritional score for a meal
/// 
/// # Arguments
/// * `calories` - Calorie content of the meal
/// * `protein` - Protein content in grams
/// * `fiber` - Fiber content in grams
/// * `scale_factor` - Scaling factor for the final score
/// 
/// # Returns
/// The calculated nutritional score as a f64
pub fn calculate_nutritional_score(meal: &Meal) -> f64 {
    (meal.calories + meal.protein + meal.fiber) * meal.scale_factor
}

/// Calculate nutritional score for a meal structure
/// 
/// # Arguments
/// * `meal` - A Meal struct containing nutritional components
/// 
/// # Returns
/// The calculated nutritional score
pub fn calculate_meal_score(meal: &Meal) -> f64 {
    calculate_nutritional_score(meal)
}

/// Batch calculate nutritional scores for multiple meals in parallel
/// 
/// # Arguments
/// * `meals` - A slice of Meal structs
/// 
/// # Returns
/// A vector of calculated scores
pub fn batch_calculate_scores(meals: &[Meal]) -> Vec<f64> {
    meals.par_iter()
        .map(calculate_nutritional_score)
        .collect()
}

/// Batch calculate nutritional scores sequentially (for comparison)
/// 
/// # Arguments
/// * `meals` - A slice of Meal structs
/// 
/// # Returns
/// A vector of calculated scores
pub fn batch_calculate_scores_sequential(meals: &[Meal]) -> Vec<f64> {
    meals.iter()
         .map(calculate_meal_score)
         .collect()
}

// Custom allocator for memory tracking
struct TrackingAllocator;

static ALLOCATED: AtomicUsize = AtomicUsize::new(0);

unsafe impl GlobalAlloc for TrackingAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        let ret = StdSystem.alloc(layout);
        if !ret.is_null() {
            ALLOCATED.fetch_add(layout.size(), Ordering::SeqCst);
        }
        ret
    }

    unsafe fn dealloc(&self, ptr: *mut u8, layout: Layout) {
        StdSystem.dealloc(ptr, layout);
        ALLOCATED.fetch_sub(layout.size(), Ordering::SeqCst);
    }
}

#[global_allocator]
static GLOBAL: TrackingAllocator = TrackingAllocator;

// Function to get current memory usage
pub fn get_memory_usage() -> usize {
    ALLOCATED.load(Ordering::SeqCst)
}

// CPU monitoring function
fn get_cpu_usage(sys: &mut SysInfo) -> f32 {
    sys.refresh_cpu();
    let mut total_usage = 0.0;
    let processors = sys.cpus();
    for processor in processors {
        total_usage += processor.cpu_usage();
    }
    total_usage / processors.len() as f32
}

/// Run a benchmark calculating 10,000 nutritional scores
/// 
/// # Returns
/// A tuple containing (execution_time_ms, average_score)
pub fn run_benchmark() -> (f64, f64) {
    println!("Starting benchmark...");
    
    let mut sys = SysInfo::new_all();
    let initial_cpu = get_cpu_usage(&mut sys);
    let initial_memory = get_memory_usage();
    
    println!("Initial CPU Usage: {:.2}%", initial_cpu);
    println!("Initial memory usage: {} bytes", initial_memory);
    
    // Generate 10,000 sample meals
    let mut rng = rand::thread_rng();
    let meals: Vec<Meal> = (0..10000)
        .map(|_| Meal {
            calories: 200.0 + rng.gen::<f64>() * 300.0,
            protein: 10.0 + rng.gen::<f64>() * 20.0,
            fiber: 2.0 + rng.gen::<f64>() * 8.0,
            scale_factor: 1.0 + rng.gen::<f64>(),
        })
        .collect();
    
    // Measure parallel execution time
    let start = Instant::now();
    let scores = batch_calculate_scores(&meals);
    let duration = start.elapsed();
    
    let execution_time_ms = duration.as_secs_f64() * 1000.0;
    let average_score = scores.iter().sum::<f64>() / scores.len() as f64;
    
    println!("Calculated 10,000 nutritional scores in {:.2} ms", execution_time_ms);
    println!("Average score: {:.2}", average_score);
    
    let final_cpu = get_cpu_usage(&mut sys);
    let final_memory = get_memory_usage();
    
    println!("Final CPU Usage: {:.2}%", final_cpu);
    println!("Final memory usage: {} bytes", final_memory);
    println!("Memory delta: {} bytes", final_memory - initial_memory);
    
    (execution_time_ms, average_score)
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_calculate_nutritional_score() {
        let meal = Meal {
            calories: 200.0,
            protein: 15.0,
            fiber: 5.0,
            scale_factor: 1.5,
        };
        let score = calculate_nutritional_score(meal.calories, meal.protein, meal.fiber, meal.scale_factor);
        assert_eq!(score, 330.0); // (200 + 15 + 5) * 1.5 = 330
    }

    #[test]
    fn test_calculate_nutritional_score_zero() {
        let meal = Meal {
            calories: 0.0,
            protein: 0.0,
            fiber: 0.0,
            scale_factor: 1.0,
        };
        let score = calculate_nutritional_score(meal.calories, meal.protein, meal.fiber, meal.scale_factor);
        assert_eq!(score, 0.0);
    }

    #[test]
    fn test_calculate_nutritional_score_negative() {
        let meal = Meal {
            calories: -100.0,
            protein: -10.0,
            fiber: -5.0,
            scale_factor: 1.0,
        };
        let score = calculate_nutritional_score(meal.calories, meal.protein, meal.fiber, meal.scale_factor);
        assert_eq!(score, -115.0);
    }

    #[test]
    fn test_calculate_nutritional_score_decimal() {
        let meal = Meal {
            calories: 200.5,
            protein: 15.5,
            fiber: 5.5,
            scale_factor: 1.5,
        };
        let score = calculate_nutritional_score(meal.calories, meal.protein, meal.fiber, meal.scale_factor);
        assert_eq!(score, 332.25);
    }

    #[test]
    fn test_calculate_meal_score() {
        let meal = Meal {
            calories: 200.0,
            protein: 15.0,
            fiber: 5.0,
            scale_factor: 1.5,
        };
        
        let expected_score = (200.0 + 15.0 + 5.0) * 1.5; // 330.0
        let actual_score = calculate_meal_score(&meal);
        
        assert_eq!(actual_score, expected_score);
    }
    
    #[test]
    fn test_batch_calculate_scores() {
        let meals = vec![
            Meal {
                calories: 200.0,
                protein: 15.0,
                fiber: 5.0,
                scale_factor: 1.5,
            },
            Meal {
                calories: 100.0,
                protein: 10.0,
                fiber: 5.0,
                scale_factor: 1.0,
            },
        ];
        let scores = batch_calculate_scores(&meals);
        assert_eq!(scores.len(), 2);
        assert_eq!(scores[0], 330.0);
        assert_eq!(scores[1], 115.0);
    }
} 