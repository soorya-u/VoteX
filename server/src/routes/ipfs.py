from fastapi import APIRouter, UploadFile, status

from ..controllers import pin_image_handler

ipfs_route = APIRouter(prefix="/ipfs")


@ipfs_route.post("/pin", status_code=status.HTTP_202_ACCEPTED)
async def pin_to_pinata_route(file: UploadFile):
    return await pin_image_handler(file)
