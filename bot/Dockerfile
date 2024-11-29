FROM python:3.10.0-slim

WORKDIR /app


ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1


RUN apt update
RUN apt upgrade -y
RUN apt install -y curl

RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"


COPY poetry.lock pyproject.toml ./

RUN poetry install

COPY . .

ENV SQLALCHEMY_SILENCE_UBER_WARNING=1

EXPOSE 8000

ENTRYPOINT [ "poetry", "run", "fastapi", "run", "src" ]