FROM python:3.9
WORKDIR /Backend
RUN pip install fastapi uvicorn neo4j
COPY ./main.py /Backend/
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]