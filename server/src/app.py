from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

from .routes import api_route

app = FastAPI()

app.include_router(api_route)
