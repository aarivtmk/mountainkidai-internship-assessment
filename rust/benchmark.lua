-- Benchmark script for the Rust Nutritional Score Calculator API
-- To be used with wrk: wrk -t8 -c1000 -d10s -s benchmark.lua http://localhost:8080/api/calculate

-- Initialize random seed
math.randomseed(os.time())

-- Request body template
request = function()
  -- Generate random meal data
  local calories = 200 + math.random(300)
  local protein = 10 + math.random(20)
  local fiber = 2 + math.random(8)
  local scale_factor = 1 + math.random() 
  
  -- Create JSON payload
  local payload = string.format([[
    {
      "calories": %d,
      "protein": %d,
      "fiber": %d,
      "scale_factor": %.2f
    }
  ]], calories, protein, fiber, scale_factor)
  
  -- Set up request headers
  local headers = {}
  headers["Content-Type"] = "application/json"
  
  -- Return the request
  return wrk.format("POST", nil, headers, payload)
end

-- Response handler
response = function(status, headers, body)
  if status ~= 200 then
    print("Error: " .. status)
    print(body)
  end
end

-- Done handler
done = function(summary, latency, requests)
  print("---------------------------------------------")
  print("Benchmark Results:")
  print("---------------------------------------------")
  print(string.format("Requests/sec:  %.2f", requests.rate))
  print(string.format("Transfer/sec:  %.2f KB", summary.bytes/(1024*summary.duration)))
  print(string.format("Mean latency:  %.2f ms", latency.mean / 1000))
  print(string.format("Median latency: %.2f ms", latency.mean / 1000))
  print(string.format("99th percentile: %.2f ms", latency.p99 / 1000))
  print(string.format("Total requests: %d", summary.requests))
  print("---------------------------------------------")
end 