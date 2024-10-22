from fastapi import FastAPI

from face_verification import verify_face

app = FastAPI()


@app.get("/")
async def root():
    return {"status": True}


@app.get("/api/compare")
async def compare(pinata_image: str, uploaded_image: str):
    return verify_face(pinata_image, uploaded_image)
