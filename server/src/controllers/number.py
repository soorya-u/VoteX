import cv2
from fastapi import HTTPException, UploadFile, status
import os
import pytesseract
import re
from typing import List, Literal, Optional

from ..lib.redis import set_data_to_redis, get_data_from_redis, delete_data_from_redis
from ..lib.twilio import send_message_via_twilio
from ..lib.stellar import invoke_contract_functions, admin_keypair

from ..helpers import image_to_buffer_array_transformer, generate_otp, hash_otp, verify_otp

TESSERACT_PATH = os.getenv('TESSERACT_PATH')
Candidate = Literal["candidate"]
Voter = Literal["voter"]


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

    return {
        "phone_number": ph_no,
        "message": "Number Identification Successfull"
    }


async def number_verification_handler(otp: str, public_key: str,
                                      user_type: Optional[Candidate | Voter]):
    hashed_otp = await get_data_from_redis(public_key)

    if not hashed_otp:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "OTP has been expired")

    isOtpVerified = await verify_otp(otp, hashed_otp)

    if isOtpVerified is False:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Incorrect OTP")

    await delete_data_from_redis(public_key)

    if user_type == "candidate":
        await invoke_contract_functions("set_candidate_as_verified",
                                        [public_key, admin_keypair.public_key])

    return {"message": "OTP has been Verified"}
