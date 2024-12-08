from fastapi import APIRouter, UploadFile, status
from typing import Literal, Optional

from ..controllers import number_identification_handler, number_verification_handler

number_route = APIRouter(prefix="/number")

Candidate = Literal["candidate"]
Voter = Literal["voter"]


@number_route.post("/identify/{public_key}",
                   status_code=status.HTTP_201_CREATED)
async def number_identification_route(file: UploadFile, public_key: str):
    return await number_identification_handler(file, public_key)


@number_route.get("/verify/{public_key}")
async def number_verification_route(otp: str,
                                    public_key: str,
                                    user_type: Optional[Candidate
                                                        | Voter] = None):
    return await number_verification_handler(otp, public_key, user_type)
