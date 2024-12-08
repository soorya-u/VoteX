from fastapi import UploadFile

from ..lib.pinata import pin_file_to_ipfs
from ..helpers import get_file_payload


async def pin_image_handler(image: UploadFile):
    file_payload = await get_file_payload(image)
    ipfs_hash = await pin_file_to_ipfs(file_payload)

    return {
        "message": "Pinning file to Pinata is Successfull",
        "ipfs_hash": ipfs_hash
    }
