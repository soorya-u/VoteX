from fastapi import APIRouter

from .routes import verification_route, recognition_route

api_route = APIRouter(prefix="/api")


@api_route.get('/')
async def root_route_handler():
    return {"status": True}


api_route.include_router(verification_route)
api_route.include_router(recognition_route)
