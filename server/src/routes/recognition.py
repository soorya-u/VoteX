from fastapi import APIRouter, UploadFile, status

from ..controllers import register_face_handler

recognition_route = APIRouter(prefix="/recognition")


@recognition_route.post('/register/{public_key}')
async def registration_route_handler(file: UploadFile, public_key: str):
    return await register_face_handler(file, public_key)


@recognition_route.post("/compare", status_code=status.HTTP_201_CREATED)
async def comparision_route_handler():
    return {"status": True}
