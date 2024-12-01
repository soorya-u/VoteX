from fastapi import APIRouter, UploadFile, status

from ..controllers import face_verification_handler, face_registration_handler

face_route = APIRouter(prefix="/face")


@face_route.post("/register/{public_key}", status_code=status.HTTP_201_CREATED)
async def face_registration_route(file: UploadFile, public_key: str):
    return await face_registration_handler(file, public_key)


@face_route.post("/compare/{public_key}", status_code=status.HTTP_200_OK)
async def face_comparision_route(file: UploadFile, public_key: str):
    return await face_verification_handler(file, public_key)
