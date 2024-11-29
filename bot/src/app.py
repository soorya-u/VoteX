from fastapi import FastAPI
import os
from rasa.core.agent import Agent
from typing import Dict, TypedDict, List


class ResponseType(TypedDict):
    recipient_id: str
    text: str


src_dir = os.path.dirname(__file__)

app = FastAPI()


@app.get("/bot")
async def response_route(query: str) -> Dict[str, ResponseType]:

    modelPath = os.path.join(src_dir, "models",
                             "20241101-122259-descriptive-horn.tar.gz")
    agent_nlu = Agent.load(modelPath)
    response: List[ResponseType] = await agent_nlu.handle_text(query)

    return {"response": response[0]}
