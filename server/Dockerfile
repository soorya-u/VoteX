FROM python:3.13.0-slim

WORKDIR /app


ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1


RUN apt update

RUN apt install -y curl
RUN apt install -y cmake build-essential
RUN apt install -y libterm-readline-perl-perl tesseract-ocr # pytesseract dependency
# Remove the below line after migrating to opencv-headless
RUN apt install -y ffmpeg libsm6 libxext6 # opencv dependency

RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"


COPY poetry.lock pyproject.toml ./

RUN poetry install

COPY . .

ENV TESSERACT_PATH=/usr/bin/tesseract

EXPOSE 8000

ENTRYPOINT [ "poetry", "run", "fastapi", "run", "src" ]