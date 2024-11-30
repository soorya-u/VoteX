from aiohttp import FormData, ClientSession
from fastapi import HTTPException, status
from typing import Dict
import os

PINATA_GATEWAY = r"https://gateway.pinata.cloud/ipfs"
PINATA_FILE_PIN_URL = r"https://api.pinata.cloud/pinning/pinFileToIPFS"

PINATA_API_KEY = os.getenv("PINATA_API_KEY") or ""
PINATA_API_SECRET = os.getenv("PINATA_API_SECRET") or ""

headers = {
    "pinata_api_key": PINATA_API_KEY,
    "pinata_secret_api_key": PINATA_API_SECRET,
}


async def pin_file_to_ipfs(data: FormData):
    async with ClientSession() as session:
        async with session.post(PINATA_FILE_PIN_URL,
                                data=data,
                                headers=headers) as res:
            response_json: Dict[str, str | int] = await res.json()

            if ("error" in response_json.keys()):
                raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR,
                                    "Unable to Upload to Pinata")

            ipfs_hash = response_json['IpfsHash']
            return f"{ipfs_hash}"


async def get_file_from_ipfs(ipfs_hash: str):
    async with ClientSession() as session:
        async with session.get(f"{PINATA_GATEWAY}/{ipfs_hash}") as res:
            response_bytes = await res.read()
            return response_bytes
