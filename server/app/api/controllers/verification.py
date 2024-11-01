import face_recognition as fr

def verify_face(saved_image_path: str, current_image_path: str) -> bool | None:
    saved_image = fr.load_image_file(saved_image_path)
    current_image = fr.load_image_file(current_image_path)

    saved_image_encoding = fr.face_encodings(saved_image)
    current_image_encoding = fr.face_encodings(current_image)

    if len(saved_image_encoding) == 0 or len(current_image_encoding) == 0:
        return None

    result = fr.compare_faces([saved_image_encoding[0]], current_image_encoding[0])

    return result[0]
