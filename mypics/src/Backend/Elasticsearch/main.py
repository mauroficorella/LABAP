from fastapi import FastAPI
from pydantic import BaseModel
import requests
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class Image(BaseModel):
    img_url: str

@app.get("/search/{search_input}")
async def search(search_input: str):
    # sending get request and saving the response as response object
    r = requests.get(url = "http://host.docker.internal:9200/images/_search", params={'q': search_input})
    
    # extracting data in json format
    data = r.json()

    return data

@app.get("/addservice")
async def add_service():
    myobj = {
    "mllib":"caffe",
    "description":"image classification service",
    "type":"supervised",
    "parameters":{
    "input":{
      "connector":"image"
    },
    "mllib":{
      "nclasses":1000
    }
    },
    "model":{
        "repository":"/opt/models/ggnet/"
    }
    }
    jsondata = json.dumps(myobj)
    # sending get request and saving the response as response object
    r = requests.post("http://host.docker.internal:8080/services/imageserv", jsondata)
    
    # extracting data in json format
    data = r.json()

    return data

@app.post("/addindex")
async def add_index(image: Image):
    myobj = {
    "service": "imageserv",
    "parameters": {
        "mllib": {"gpu": True},
        "input": {
            "width": 224,
            "height": 224
        },
        "output": {
            "best": 3,
            "template": "{ {{#body}}{{#predictions}} \"uri\":\"{{uri}}\",\"categories\": [ {{#classes}} { \"category\":\"{{cat}}\",\"score\":{{prob}} } {{^last}},{{/last}}{{/classes}} ] {{/predictions}}{{/body}} }",
            "network": {
                "url": "http://host.docker.internal:9200/images/img",
                "http_method": "POST"
            }
        }
    },
    "data": [
        image.img_url
    ]
    }
    jsondata = json.dumps(myobj)
    r = requests.post("http://host.docker.internal:8080/predict", jsondata)

    data = r.json()
    print(data)

    return data


