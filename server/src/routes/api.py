from fastapi import APIRouter

from .face import face_route
from .number import number_route
from .ipfs import ipfs_route
from .contract import contract_route

api_route = APIRouter(prefix="/api")


@api_route.get('/health')
async def health_route():
    return {"status": True}


api_route.include_router(number_route)
api_route.include_router(face_route)
api_route.include_router(ipfs_route)
api_route.include_router(contract_route)
