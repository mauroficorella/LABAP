import json
import requests


def run_script():

    #requests.get("http://localhost:82/addservice")
    requests.get("http://host.docker.internal:82/addservice")

    print("ciao")
    #r1 = requests.get(url = "http://localhost:9200/images/_search")
    r1 = requests.get(url = "http://host.docker.internal:9200/images/_search")
    data1 = r1.json()
    
    arr = []
    print(data1)
    if not(data1["error"]):
        for elem in data1["hits"]["hits"]:
            arr.append(elem["_source"]["uri"])
    
    print("ARRAY---------")
    print(arr)
    
    #r2 = requests.get(url = "http://localhost:81/get_all_posts_urls")
    r2 = requests.get(url = "http://host.docker.internal:81/get_all_posts_urls")
    data2 = r2.json()
    print("Num posts: "+ str(len(data2)))

    for item in data2:
        if (item["fb_img_url"] not in arr):
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
                            #"url": "http://localhost:9200/images/img",
                            "url": "http://host.docker.internal:9200/images/img",
                            "http_method": "POST"
                        }
                    }
                },
                "data": [
                   item["fb_img_url"]
                ]
            }
            
            jsondata = json.dumps(myobj)
            #r = requests.post("http://localhost:8080/predict", jsondata)
            r = requests.post("http://host.docker.internal:8080/predict", jsondata)




if __name__ == "__main__":
    run_script()