FROM python:3.10.0-slim

WORKDIR /app


ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1


RUN apt update
RUN apt upgrade -y
RUN apt install -y curl
RUN apt install -y tesseract-ocr # pytesseract dependency
# Remove the below line after migrating to opencv-headless
RUN apt install -y ffmpeg libsm6 libxext6 # opencv dependency
RUN apt install -y cmake build-essential python3-dev libboost-python-dev libboost-system-dev libboost-thread-dev libx11-dev libopenblas-dev liblapack-dev libjpeg-dev zlib1g-dev g++

RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"


COPY poetry.lock pyproject.toml ./

RUN poetry install

COPY . .

ENV SQLALCHEMY_SILENCE_UBER_WARNING=1
ENV TESSERACT_PATH=/usr/bin/tesseract

EXPOSE 8000

ENTRYPOINT [ "poetry", "run", "fastapi", "run" ]