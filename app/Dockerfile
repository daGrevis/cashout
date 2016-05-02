FROM python:3.5-alpine

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY . /app
RUN set -ex \
    && pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["python", "app.py"]
