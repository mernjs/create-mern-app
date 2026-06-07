import time
from typing import Dict

class InMemoryStorage:
    def __init__(self):
        self._store: Dict[str, tuple[int, float]] = {}

    def increment(self, key: str, limit: int, window: int) -> bool:
        current_time = time.time()

        count, reset_time = self._store.get(key, (0, current_time + window))

        if current_time > reset_time:
            count = 0
            reset_time = current_time + window

        count += 1
        self._store[key] = (count, reset_time)

        return count <= limit
