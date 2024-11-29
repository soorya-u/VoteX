import os
from typing import List
import cv2
import pytesseract
import re

TESSERACT_PATH = os.getenv('TESSERACT_PATH')


def get_phone_number_from_aadhaar_card(image_path: str) -> str:
    img = cv2.imread(image_path)

    if img is None:
        return "Error: Unable to load the image. Check the file path or format."

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    text = pytesseract.image_to_string(gray_img)

    phone_pattern = r'\b[6-9]\d{9}\b'
    phone_numbers: List[str] = re.findall(phone_pattern, text)

    if phone_numbers:
        return phone_numbers[0]
    else:
        return "No phone number found in the image."
