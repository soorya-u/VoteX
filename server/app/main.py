from fastapi import FastAPI

from .api import api_route

app = FastAPI()
app.include_router(api_route)
