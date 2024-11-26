from fastapi import APIRouter
from rasa.core.agent import Agent
import os
from typing import Dict, TypedDict, List


class ResponseType(TypedDict):
    recipient_id: str
    text: str


bot_route = APIRouter(prefix="/bot")

bot_dir = os.path.dirname(__file__)


@bot_route.get("/")
async def response_route(query: str) -> Dict[str, ResponseType]:

    modelPath = os.path.join(bot_dir, "models",
                             "20241101-122259-descriptive-horn.tar.gz")
    agent_nlu = Agent.load(modelPath)
    response: List[ResponseType] = await agent_nlu.handle_text(query)

    return {"response": response[0]}
