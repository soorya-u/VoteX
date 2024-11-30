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
