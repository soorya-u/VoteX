from ..lib.stellar import invoke_contract_functions, admin_keypair


async def candidate_approval_handler(public_key: str):
    await invoke_contract_functions("approve_candidate",
                                    [public_key, admin_keypair.public_key])
    return {"message": "Candidate Approval Succeeded"}


async def candidate_rejection_handler(public_key: str):
    await invoke_contract_functions("reject_candidate",
                                    [public_key, admin_keypair.public_key])
    return {"message": "Candidate Rejection Succeeded"}


async def voting_period_setter_handler(start_date: int, end_date: int):
    await invoke_contract_functions(
        "set_voting_period", [start_date, end_date, admin_keypair.public_key])
    return {"message": "Voting Period has been Set Successfully"}


async def contract_resetter_handler():
    await invoke_contract_functions("reset_contract")
    return {"message": "Contract has been successfully Reset"}
