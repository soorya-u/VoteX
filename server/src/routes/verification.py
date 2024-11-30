from fastapi import APIRouter, UploadFile, status

from ..controllers import number_identification_handler, number_verification_handler

verification_route = APIRouter(prefix="/verification")


@verification_route.post('/identify/{public_key}',
                         status_code=status.HTTP_201_CREATED)
async def identification_route_handler(file: UploadFile, public_key: str):
    return await number_identification_handler(file, public_key)


@verification_route.post('/verify/{public_key}')
async def otp_route_handler(otp: str, public_key: str):
    return await number_verification_handler(int(otp), public_key)
