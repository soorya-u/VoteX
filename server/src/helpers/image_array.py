import cv2
from fastapi import UploadFile
import numpy as np


async def image_base64_transformer(file: UploadFile):
    file_content = await file.read()
    await file.seek(0)
    image_array = cv2.imdecode(np.frombuffer(file_content, np.uint8),
                               cv2.IMREAD_COLOR)
    return cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB)


async def image_base64_bytes_transformer(content: bytes):
    image_array = cv2.imdecode(np.frombuffer(content, np.uint8),
                               cv2.IMREAD_COLOR)
    return cv2.cvtColor(image_array, cv2.COLOR_BGR2RGB)


async def image_to_buffer_array_transformer(file: UploadFile):
    file_content = await file.read()
    return np.frombuffer(file_content, np.uint8)
