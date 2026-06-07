from fastapi import FastAPI, Depends
from fastapi_simple_ratelimit import RateLimiter

app = FastAPI()

@app.get("/limited")
def limited_endpoint(_=Depends(RateLimiter(limit=3, window=10))):
    return {"message": "Request allowed"}
