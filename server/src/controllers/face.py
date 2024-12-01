import face_recognition as fr
from fastapi import HTTPException, UploadFile, status

from ..helpers import image_to_array_transformer, get_file_payload, bytes_to_array_transformer
from ..lib.pinata import pin_file_to_ipfs, get_file_from_ipfs


async def face_registration_handler(face_image: UploadFile, public_key: str):
    image_array = await image_to_array_transformer(face_image)

    face_encoding = fr.face_encodings(image_array)
    if len(face_encoding) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Face could not be detected")
    elif len(face_encoding) > 1:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Multiple Face has been detected")

    file_payload = await get_file_payload(face_image, public_key)

    pinned_url = await pin_file_to_ipfs(file_payload)

    # TODO: Add pinned_url to Stellar

    return {"message": pinned_url}


async def face_verification_handler(face_image: UploadFile, public_key: str):
    current_image_array = await image_to_array_transformer(face_image)

    current_image_encoding = fr.face_encodings(current_image_array)

    if len(current_image_encoding) == 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Face could not be detected")
    elif len(current_image_encoding) > 1:
        raise HTTPException(status.HTTP_400_BAD_REQUEST,
                            "Multiple Face has been detected")

    # TODO: Fetch Face Recognition Image from Pinata
    test_ipfs_hash = "QmPRTw2AD3su3SvHbXYVed9SV2N7qNVnzg85j1jyw8oxSa"

    file_bytes = await get_file_from_ipfs(test_ipfs_hash)
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
