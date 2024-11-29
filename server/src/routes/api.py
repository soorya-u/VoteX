from fastapi import APIRouter

from .recognition import recognition_route
from .verification import verification_route

api_route = APIRouter(prefix="/api")


@api_route.get('/health')
async def root_route_handler():
    return {"status": True}


api_route.include_router(verification_route)
api_route.include_router(recognition_route)
