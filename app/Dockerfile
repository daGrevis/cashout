FROM python:3.5-alpine

ENV PYTHONUNBUFFERED 1
WORKDIR /app

COPY . /app
RUN set -ex \
    && pip install --no-cache-dir -r requirements.txt

EXPOSE 5000
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "app:app"]
