from fastapi import UploadFile
from io import BytesIO
import numpy as np
from PIL import Image


async def image_to_array_transformer(file: UploadFile):
    file_content = await file.read()
    await file.seek(0)
    image = Image.open(BytesIO(file_content))
    image_array = np.array(image)
    return image_array


async def image_to_buffer_array_transformer(file: UploadFile):
    file_content = await file.read()
    return np.frombuffer(file_content, np.uint8)


def bytes_to_array_transformer(file_content: bytes):
    image = Image.open(BytesIO(file_content))
    image_array = np.array(image)
    return image_array
