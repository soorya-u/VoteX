from fastapi import APIRouter

verification_route = APIRouter(prefix="/verification")


@verification_route.post('/detect')
async def detection_route_handler():
    return {"status": True}


@verification_route.post('/otp')
async def otp_route_handler():
    return {"status": True}

