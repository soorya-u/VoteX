import face_recognition as fr
from fastapi import HTTPException, UploadFile, status

from ..helpers import image_to_array_transformer, get_file_payload
from ..lib.pinata import pin_file_to_ipfs


def verify_face(saved_image_path: str, current_image_path: str) -> bool | None:
    saved_image = fr.load_image_file(saved_image_path)
    current_image = fr.load_image_file(current_image_path)

    saved_image_encoding = fr.face_encodings(saved_image)
    current_image_encoding = fr.face_encodings(current_image)

    if len(saved_image_encoding) == 0 or len(current_image_encoding) == 0:
        return None

    result = fr.compare_faces([saved_image_encoding[0]],
                              current_image_encoding[0])

    return result[0]


async def register_face_handler(face_image: UploadFile, public_key: str):
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

    # Add Pinned URL to Stellar

    return {"message": pinned_url}
