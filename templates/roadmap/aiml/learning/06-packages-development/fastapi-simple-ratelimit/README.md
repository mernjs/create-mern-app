# fastapi-simple-ratelimit

A lightweight rate limiting package for FastAPI.

Installation:
pip install fastapi-simple-ratelimit

Usage:

from fastapi import FastAPI, Depends
from fastapi_simple_ratelimit import RateLimiter

app = FastAPI()

@app.get("/limited", dependencies=[Depends(RateLimiter(limit=5, window=60))])
def limited_route():
    return {"message": "This route is rate limited"}
