import os

from stellar_sdk import Durability, Keypair, Network
from stellar_sdk.soroban_server_async import SorobanServerAsync
from stellar_sdk.contract import ContractClientAsync
from stellar_sdk.scval import to_bool, to_string, to_uint256, to_vec, to_void, to_struct, to_address, to_symbol, to_native
from stellar_sdk.xdr import SCVal, LedgerEntryData

from typing import Callable, Dict, List, Literal, Any, Tuple, Type

RPC_URL = r"https://soroban-testnet.stellar.org"

CONTRACT_FUNCTIONS = Literal[
    "set_voter_as_approved",
    "set_candidate_as_verified",
    "approve_candidate",
    "reject_candidate",
    "set_voting_period",
    "reset_contract",
]

CONTRACT_VARIABLES = Literal[
    "Admin",
    "StartTime",
    "EndTime",
    "Voters",
    "Candids",
    "Voter",
    "Candidate",
]

NATIVE_TO_SCVAL_MAPPER: Dict[Type, Callable[[Any], SCVal]] = {
    bool: lambda x: to_bool(x),
    int: lambda x: to_uint256(x),
}

admin_secret = os.getenv("ADMIN_SECRET") or ""
contract_id = os.getenv("CONTRACT_ID") or ""

admin_keypair = Keypair.from_secret(admin_secret)


async def get_contract_data(param: CONTRACT_VARIABLES
                            | Tuple[CONTRACT_VARIABLES, str]):

    server = SorobanServerAsync(RPC_URL)
    key = get_scval_key(param)

    ledger = await server.get_contract_data(contract_id, key,
                                            Durability.PERSISTENT)
    if ledger is None:
        return None

    ledger_data = LedgerEntryData.from_xdr(ledger.xdr)
    await server.close()

    return to_native(ledger_data.contract_data.val)


async def invoke_contract_functions(function_name: CONTRACT_FUNCTIONS,
                                    params: List[Any] = []):

    contract = ContractClientAsync(contract_id, RPC_URL,
                                   Network.TESTNET_NETWORK_PASSPHRASE)

    scval_params = list(map(native_to_scval, params)) or None
    transaction = await contract.invoke(function_name, scval_params,
                                        admin_keypair.public_key)
    await transaction.sign_and_submit(admin_keypair)


def native_to_scval(param: Any) -> SCVal:

    if isinstance(param, list):
        scval_elem = [native_to_scval(i) for i in param]
        return to_vec(scval_elem)

    if isinstance(param, dict):
        scval_dict = {
            str(key): native_to_scval(value)
            for key, value in param.items()
        }
        return to_struct(scval_dict)

    if isinstance(param, str):
        # Address characters are uppercase and is of 56 characters and starts with G
        if param.isupper() and len(param) == 56 and param[0] == "G":
            return to_address(param)
        else:
            return to_string(param)

    convertor = NATIVE_TO_SCVAL_MAPPER.get(type(param))
    if convertor is None:
        return to_void()
    return convertor(param)


def get_scval_key(param: CONTRACT_VARIABLES | Tuple[CONTRACT_VARIABLES, str]):
    if isinstance(param, tuple):
        symbol, address = param
        return to_vec([to_symbol(symbol), to_address(address)])
    return to_symbol(param)
