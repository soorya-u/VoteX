from fastapi import UploadFile
from aiohttp import FormData
import mimetypes


async def get_file_payload(file: UploadFile, public_key: str = "") -> FormData:
    file_name = public_key or file.filename or "no_name"
    file_content = await file.read()
    file_type = file.content_type or mimetypes.guess_type(
        file_name)[0] or "application/octet-stream"

    form_data = FormData()
    form_data.add_field(
        "file",
        file_content,
        content_type=file_type,
        filename=file_name,
    )

    return form_data
