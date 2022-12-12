import firebase_admin
from firebase_admin import credentials, storage
from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


cred_obj = credentials.Certificate('mypics/api/labap-785cc-firebase-adminsdk-gdm5s-736b213798.json')
default_app = firebase_admin.initialize_app(cred_obj, {'storageBucket': 'labap-785cc.appspot.com'})


app = FastAPI()



@app.get("/")
def default():
    return {"response":"You are in the root path"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)




"""
UploadFile has the following attributes:

filename: A str with the original file name that was uploaded (e.g. myimage.jpg).
content_type: A str with the content type (MIME type / media type) (e.g. image/jpeg).
file: A SpooledTemporaryFile (a file-like object). This is the actual Python file that you can pass directly to other functions or libraries that expect a "file-like" object.

source: https://fastapi.tiangolo.com/tutorial/request-files/
"""

@app.post("/uploadpic")
async def upload_pic(image: UploadFile = File(...)): # ! image DEVE ESSERE LO STESSO NOME CHE ABBIAMO ANCHE NEL FRONTEND QUANDO FACCIAMO formData.append('image', acceptedFiles[0])

    print(image.filename)
    print(image.content_type)
# Put your local file path 

    bucket = storage.bucket()
    blob = bucket.blob(image.filename)
    result = blob.upload_from_file(file_obj = image.file, content_type = image.content_type)

# Opt : if you want to make public access from the URL
    blob.make_public()

    print("your file url", blob.public_url)
    return blob.public_url
    

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8080)