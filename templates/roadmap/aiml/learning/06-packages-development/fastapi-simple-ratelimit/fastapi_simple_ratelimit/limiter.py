from fastapi import Request, HTTPException, status
from .storage import InMemoryStorage

class RateLimiter:
    def __init__(self, limit: int, window: int):
        self.limit = limit
        self.window = window
        self.storage = InMemoryStorage()

    async def __call__(self, request: Request):
        client_ip = request.client.host
        allowed = self.storage.increment(
            key=client_ip,
            limit=self.limit,
            window=self.window
        )

        if not allowed:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Rate limit exceeded"
            )
