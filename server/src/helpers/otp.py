import random
import aiobcrypt


def generate_otp():
    return random.randint(100000, 999999)


async def hash_otp(otp: int):
    hash_bytes = await aiobcrypt.hashpw_with_salt(str(otp).encode())
    return hash_bytes.decode()


async def verify_otp(otp: int, hashed_otp: str):
    result = await aiobcrypt.checkpw(str(otp).encode(), hashed_otp.encode())
    return result
