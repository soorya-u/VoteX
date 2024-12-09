from fastapi import APIRouter, status

from ..controllers import voting_period_setter_handler, candidate_approval_handler, candidate_rejection_handler, contract_resetter_handler

contract_route = APIRouter(prefix="/contract")


@contract_route.get("/approve", status_code=status.HTTP_202_ACCEPTED)
async def candidate_approval_route(address: str):
    return await candidate_approval_handler(address)


@contract_route.get("/reject", status_code=status.HTTP_202_ACCEPTED)
async def candidate_rejection_route(address: str):
    return await candidate_rejection_handler(address)


@contract_route.get("/period", status_code=status.HTTP_202_ACCEPTED)
async def voting_period_setter_route(start: int, end: int):
    return await voting_period_setter_handler(start, end)


@contract_route.get("/reset", status_code=status.HTTP_202_ACCEPTED)
async def contract_resetter_route():
    return await contract_resetter_handler()
