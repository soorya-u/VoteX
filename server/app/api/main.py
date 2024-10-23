from fastapi import APIRouter

api_route = APIRouter(prefix="/api")


@api_route.get('/')
async def root_route_handler():
    return {"status": True}
