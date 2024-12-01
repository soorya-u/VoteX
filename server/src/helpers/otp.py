import random
import aiobcrypt


def generate_otp():
    return str(random.randint(100000, 999999))


async def hash_otp(otp: str):
    hash_bytes = await aiobcrypt.hashpw_with_salt(otp.encode())
    return hash_bytes


async def verify_otp(otp: str, hashed_otp: bytes):
    result = await aiobcrypt.checkpw(otp.encode(), hashed_otp)
    return result
