from typing import Any
import face_recognition as fr
from fastapi import HTTPException, UploadFile, status

from ..lib.pinata import pin_file_to_ipfs, get_file_from_ipfs
from ..lib.stellar import invoke_contract_functions, get_contract_data, admin_keypair

from ..helpers import image_to_array_transformer, get_file_payload, bytes_to_array_transformer, image_base64_transformer


async def face_registration_handler(
    face_image: UploadFile,
    public_key: str,
):
    image_array = await image_base64_transformer(face_image)

    face_encoding = fr.face_encodings(image_array)
    if len(face_encoding) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Face could not be detected")
    elif len(face_encoding) > 1:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Multiple Face has been detected")

    file_payload = await get_file_payload(face_image, public_key)

    ipfs_hash = await pin_file_to_ipfs(file_payload)

    await invoke_contract_functions(
        "set_voter_as_approved",
        [public_key, ipfs_hash, admin_keypair.public_key])

    return {"message": "Face Registration Completed", "ipfs_hash": ipfs_hash}


async def face_verification_handler(
    face_image: UploadFile,
    public_key: str,
):
    current_image_array = await image_base64_transformer(face_image)

    current_image_encoding = fr.face_encodings(current_image_array)

    if len(current_image_encoding) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Face could not be detected")
    elif len(current_image_encoding) > 1:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Multiple Face has been detected")

    voter: Any = await get_contract_data(("Voter", public_key))

    if not voter or not isinstance(voter["face_ipfs_hash"], str):
        return HTTPException(
            status.HTTP_502_BAD_GATEWAY,
            "Unable to find the Saved Image or it is corrupted")

    file_bytes = await get_file_from_ipfs(voter["face_ipfs_hash"])
    saved_image_array = bytes_to_array_transformer(file_bytes)

    saved_image_encoding = fr.face_encodings(saved_image_array)

    if len(saved_image_encoding) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Face could not be detected in Saved Image")
    elif len(current_image_encoding) > 1:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Multiple Face has been detected in Saved Image")

    result = fr.compare_faces([saved_image_encoding[0]],
                              current_image_encoding[0])

    if bool(result[0]) is True:
        return {"message": "Authorization Complete"}
    else:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Face did not Match")
