from fastapi import APIRouter, UploadFile, status
from typing import Literal

from ..controllers import face_verification_handler, face_registration_handler

face_route = APIRouter(prefix="/face")

USER_TYPE = Literal["candidate", "voter"]


@face_route.post("/register/{public_key}", status_code=status.HTTP_201_CREATED)
async def face_registration_route(file: UploadFile, public_key: str,
                                  user_type: USER_TYPE):
    return await face_registration_handler(file, public_key, user_type)


@face_route.post("/compare/{public_key}", status_code=status.HTTP_200_OK)
async def face_comparision_route(file: UploadFile, public_key: str,
                                 user_type: USER_TYPE):
    return await face_verification_handler(file, public_key, user_type)
