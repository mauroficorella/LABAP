from fastapi import FastAPI

app = FastAPI()
    
@app.get("/users")
def get_user():
    return {"Hello": "World"}