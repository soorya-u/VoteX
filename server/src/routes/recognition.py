from fastapi import APIRouter

recognition_route = APIRouter(prefix="/recognition")


@recognition_route.post('/register')
async def registration_route_handler():
    return {"status": True}


@recognition_route.post("/compare")
async def comparision_route_handler():
    return {"status": True}
