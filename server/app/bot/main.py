from fastapi import APIRouter
from rasa.core.agent import Agent

bot_route = APIRouter(prefix="/bot")


@bot_route.get("/")
async def read_item(modelId: str, query: str):

    modelName = f'{modelId}_nlu.tar.gz'
    agent_nlu = Agent.load(modelName)
    message = await agent_nlu.parse_message(query)

    return {"prediction_info": message}
