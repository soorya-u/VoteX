from fastapi import FastAPI

from .api import api_route
from .bot import bot_route

app = FastAPI()
app.include_router(api_route)
app.include_router(bot_route)
