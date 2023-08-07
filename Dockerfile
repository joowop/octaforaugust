FROM ubuntu:20.04
RUN apt update -y
RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa -y
RUN apt-get update && apt-get install python3-pip -y
RUN apt-get install -y gcc default-libmysqlclient-dev pkg-config
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=0
WORKDIR /app

RUN apt install python3.9 -y

RUN pip install --upgrade pip

COPY . /app/
RUN pip install -r requirements.txt
