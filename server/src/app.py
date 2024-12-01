from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse

from .routes import api_route

app = FastAPI()


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(_: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail},
    )


app.include_router(api_route)
