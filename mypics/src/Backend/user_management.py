import firebase_admin
from firebase_admin import db
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

class User(BaseModel):
    username: str
    email: str
    password: str

cred_obj = firebase_admin.credentials.Certificate('api/labap-785cc-firebase-adminsdk-gdm5s-736b213798.json')
default_app = firebase_admin.initialize_app(cred_obj, {
	'databaseURL':'https://labap-785cc-default-rtdb.europe-west1.firebasedatabase.app/'
	})

ref = db.reference("/")


router = FastAPI()

#@router.post("users/{userid}")
@router.post("/users")
async def create_user(user: User):
    username=user.username
    password=user.password
    email=user.email
    #CON ref.update FACCIAMO AGGIORNARE IL DB AGGIUNGENDO SEMPLICEMENTE
    #CON ref.set INVECE CANCELLA TUTTO E INSERISCE DA ZERO
    #ref.update({userid: {
    ref.update({'prova': { #QUA PRATICAMENTE POI QUANDO LO IMPLEMENTIAMO GLI PASSIAMO userid 
        'username': username,
        'password': password,
        'email': email
        }})
    return {"status":200}
    
@router.get("/users")
async def get_user():
    print("Hello world!")
    return {"status":200}

if __name__ == "__main__":
    uvicorn.run(router, host="127.0.0.1", port=8000)
#per entrare nella pagina dove provare le post bisogna andare all'indirizzo dove runna il server /docs


