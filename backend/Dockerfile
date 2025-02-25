FROM python:3.11.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY src /app/src

WORKDIR /app

EXPOSE 5000

CMD ["sh", "-c", "flask db upgrade && flask run --host=0.0.0.0 --port=5000"]
