import os
from stellar_sdk import Durability, Keypair, Network, SorobanServer
from stellar_sdk.contract import ContractClient
from stellar_sdk.scval import to_bool
from stellar_sdk.xdr import SCVal
from typing import List, Literal, Any

RPC_URL = r"https://soroban-testnet.stellar.org"
CONTRACT_FUNCTIONS = Literal[
    "change_owner",
    "reset_contract",
    "set_voting_period",
    "register_voter",
    "update_voter",
    "approve_voter",
    "reject_voter",
    "register_candidate",
    "update_candidate",
    "approve_candidate",
    "reject_candidate",
    "get_all_voters_who_voted",
    "vote",
    "get_current_voting_status",
    "get_winning_candidate",
]

owner_secret = os.getenv("OWNER_SECRET") or ""
contract_id = os.getenv("CONTRACT_ID") or ""

owner_keypair = Keypair.from_secret(owner_secret)
contract = ContractClient(contract_id, RPC_URL,
                          Network.TESTNET_NETWORK_PASSPHRASE)
server = SorobanServer(RPC_URL)


def get_contract_data(key: SCVal):
    server.get_contract_data(contract_id, key, Durability.PERSISTENT)


def invoke_contract_functions(function_name: CONTRACT_FUNCTIONS,
                              params: List[Any]):
    scval_params = list(map(native_to_scval, params))
    transaction = contract.invoke(function_name, scval_params,
                                  owner_keypair.public_key)
    transaction.sign_and_submit(owner_keypair)


# Add Conditions base on requirements
def native_to_scval(param: Any):
    return to_bool(True)
