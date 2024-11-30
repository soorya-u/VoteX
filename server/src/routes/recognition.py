from fastapi import APIRouter, UploadFile, status

from ..controllers import face_verification_handler, face_registration_handler

recognition_route = APIRouter(prefix="/recognition")


@recognition_route.post('/register/{public_key}')
async def registration_route_handler(file: UploadFile, public_key: str):
    return await face_registration_handler(file, public_key)


@recognition_route.post("/compare/{public_key}",
                        status_code=status.HTTP_200_OK)
async def comparision_route_handler(file: UploadFile, public_key: str):
    return await face_verification_handler(file, public_key)
