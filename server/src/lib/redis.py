import os
from redis.asyncio import Redis

redis_url = os.getenv("REDIS_DATABASE_URL") or ""

db = Redis.from_url(redis_url)


async def set_data_to_redis(key: str, value: str):
    await db.set(key, value, ex=10 * 60)  # 10 min expiry


async def get_data_from_redis(key: str) -> str | None:
    return await db.get(key)


async def delete_data_from_redis(key: str):
    await db.delete(key)
