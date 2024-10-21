import face_recognition

def compare_faces(saved_image_path, current_image_path):
    saved_image = face_recognition.load_image_file(saved_image_path)
    current_image = face_recognition.load_image_file(current_image_path)

    saved_image_encoding = face_recognition.face_encodings(saved_image)
    current_image_encoding = face_recognition.face_encodings(current_image)

    if len(saved_image_encoding) == 0 or len(current_image_encoding) == 0:
        return False

    result = face_recognition.compare_faces([imageA_encoding[0]], selfie_encoding[0])

    return result[0]
