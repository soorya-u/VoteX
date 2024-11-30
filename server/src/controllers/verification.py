import cv2
from fastapi import HTTPException, UploadFile, status
import os
import pytesseract
import re
from typing import List

from ..lib.redis import set_data_to_redis, get_data_from_redis, delete_data_from_redis
from ..lib.twilio import send_message_via_twilio
from ..helpers import image_to_buffer_array_transformer, generate_otp, hash_otp, verify_otp

TESSERACT_PATH = os.getenv('TESSERACT_PATH')


async def number_identification_handler(file: UploadFile, public_key: str):
    image_array = await image_to_buffer_array_transformer(file)
    img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if img is None:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                            "Unable to decode Image")

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    text: str = pytesseract.image_to_string(gray_img)

    phone_pattern = r'\b[6-9]\d{9}\b'
    phone_numbers: List[str] = re.findall(phone_pattern, text)

    if len(phone_numbers) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Unable to detect Phone Number")

    ph_no = phone_numbers[0]

    otp = generate_otp()

    hashed_otp = await hash_otp(otp)
    await set_data_to_redis(public_key, hashed_otp)

    await send_message_via_twilio(ph_no, otp)

    return {"phone_number": ph_no}


async def number_verification_handler(otp: int, public_key: str):
    hashed_otp = await get_data_from_redis(public_key)

    if not hashed_otp:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "OTP has been expired")

    isOtpVerified = await verify_otp(otp, hashed_otp)

    if isOtpVerified is False:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect OTP")

    await delete_data_from_redis(public_key)

    return {"message": "OTP Verified"}
