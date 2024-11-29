import os
import requests
from typing import Any

PINATA_GATEWAY = r"https://gateway.pinata.cloud/ipfs"
PINATA_FILE_PIN_URL = r"https://api.pinata.cloud/pinning/pinJSONToIPFS"

PINATA_API_KEY = os.getenv("PINATA_API_KEY") or "",
PINATA_API_SECRET = os.getenv("PINATA_API_SECRET") or ""

headers = {
    "pinata_api_key": PINATA_API_KEY,
    "pinata_secret_api_key": PINATA_API_SECRET,
}


# The data must be of FormData type
def pin_file_to_ipfs(data: Any):
    res = requests.post(PINATA_FILE_PIN_URL, data, headers=headers)
    return f"{PINATA_GATEWAY}/{res.json()['IpfsHash']}"
