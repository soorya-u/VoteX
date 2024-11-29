FROM python:3.11.0-slim

WORKDIR /app


ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1


RUN apt update

RUN apt install -y curl
RUN apt install -y tesseract-ocr # pytesseract dependency
# Remove the below line after migrating to opencv-headless
RUN apt install -y ffmpeg libsm6 libxext6 # opencv dependency
RUN apt install -y cmake build-essential python3-dev libboost-python-dev libboost-system-dev libboost-thread-dev libx11-dev libopenblas-dev liblapack-dev libjpeg-dev zlib1g-dev g++

RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"


COPY poetry.lock pyproject.toml ./

RUN pip install --no-cache-dir --no-binary dlib dlib==19.24.6
RUN poetry install

COPY . .

ENV TESSERACT_PATH=/usr/bin/tesseract

EXPOSE 8000

ENTRYPOINT [ "poetry", "run", "fastapi", "run" ]