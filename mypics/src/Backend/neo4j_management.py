from fastapi import FastAPI
from neo4j import GraphDatabase #pip install neo4j
from neo4j.exceptions import Neo4jError
from pydantic import BaseModel
import logging
import uvicorn
import uuid
import datetime
import pytz
from fastapi.middleware.cors import CORSMiddleware


uri = "neo4j+s://9b232952.databases.neo4j.io"
user = "neo4j"
password = "ERkpMgISHD1hksqu2wCkU5weSF2e5_cqlCOXShRFN6I"

class PublishedPost(BaseModel):
    fb_img_url: str
    description: str
    user_id: str

class User(BaseModel): #TODO: aggiungere profile_pic se serve
    user_id:str
    username:str

class LikeModel(BaseModel):
    user_id: str
    post_id: str

class Follows(BaseModel):
    user_id1: str
    user_id2: str

class Saved(BaseModel):
    user_id: str
    post_id: str

class Comment(BaseModel):
    user_id: str
    post_id: str
    datetime: str
    comment_text: str


app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def default():
    return {"response":"You are in the root path"}

@app.post("/post")
async def create_post(published_post: PublishedPost): #quando creo un post devo creare sia il nodo Post, ma anche la relazione "Published" con l'utente che ha creato il post
                                   #quindi invece di Post posso chiamarlo PublishedPost ed aggiungere il parametro "user_id", che mi servirà per aggiungere la relazione
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u) WHERE u:User and u.user_id = $u_id " #il MATCH va sempre prima di CREATE altrimenti rompe le balls
            "CREATE (p:Post { post_id: $p_id, fb_img_url: $img_url, description: $descr, datetime: localdatetime({timezone: 'Europe/Rome'}) }) "
            "CREATE (u)-[:PUBLISHED]->(p) "
            "RETURN p"
            )

    result = session.run(query, p_id = str(uuid.uuid4()), img_url = published_post.fb_img_url, descr = published_post.description, u_id = published_post.user_id)
    try:
        return [{"post_id": record["p"]["post_id"], "fb_img_url": record["p"]["fb_img_url"],"description":record["p"]["description"], "datetime":record["p"]["datetime"]} 
                    for record in result]
        #avrei potuto scrivere anche solo record["post_id"], quindi senza ["p"],
        #ma l'ho lasciato perché utile vedere come si fa quando la query ritorna più cose,
        #quindi nel caso in cui nella query c'è RETURN p1,p2 invece che semplicement RETURN p
    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise

@app.delete("/post/{post_id}")
async def delete_post(post_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (p) WHERE p:Post and p.post_id = $p_id "
            "DETACH DELETE p"
            )
    try:
        result = session.run(query, p_id = post_id)
        return {"response": "Deleted Post with post_id " + post_id} 

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.post("/user")
async def create_user(user_model: User): #ho messo user_model perché user era già la variabile per l'utente di neo4j che mi serve nel driver
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "CREATE (u:User { user_id: $u_id, username: $u_name}) " #TODO: aggiungere profile_pic se serve
            "RETURN u"
            )
    result = session.run(query, u_id = user_model.user_id, u_name = user_model.username)
    try:
        return [{"user_id": record["u"]["user_id"], "username": record["u"]["username"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise

@app.delete("/user/{user_id}")
async def delete_user(user_id: str): 
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u) WHERE u:User and u.user_id = $u_id "
            "DETACH DELETE u"
            )
    try:
        result = session.run(query, u_id = user_id)
        return {"response": "Deleted User with user_id " + user_id} 


    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.post("/comment")
async def create_comment(comment: Comment): 
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u) WHERE u:User and u.user_id = $u_id " #il MATCH va sempre prima di CREATE altrimenti rompe le balls
            "MATCH (p) WHERE p:Post and p.post_id = $p_id "
            "CREATE (c:Comment { comment_id: $c_id, comment_text: $c_text, datetime: $c_datetime }) "
            "CREATE (u)-[:COMMENTED]->(c) "
            "CREATE (c)-[:COMMENT_ON]->(p) "
            "RETURN c"
            )
    result = session.run(query, c_id = str(uuid.uuid4()), c_text = comment.comment_text, c_datetime = comment.datetime, u_id = comment.user_id, p_id = comment.post_id)
    try:
        return [{"comment_id": record["c"]["comment_id"], "comment_text": record["c"]["comment_text"],"datetime":record["c"]["datetime"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.delete("/comment/{comment_id}")
async def delete_comment(comment_id: str): 
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (c) WHERE c:Comment and c.comment_id = $c_id "
            "DETACH DELETE c"
            )
    try:
        result = session.run(query, c_id = comment_id)
        return {"response": "Deleted Comment with comment_id " + comment_id} 


    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise





@app.post("/likes")
async def create_or_remove_likes(like: LikeModel): #quando creo un post devo creare sia il nodo Post, ma anche la relazione "Published" con l'utente che ha creato il post
                                   #quindi invece di Post posso chiamarlo PublishedPost ed aggiungere il parametro "user_id", che mi servirà per aggiungere la relazione
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query1 = (
            "OPTIONAL MATCH (u:User)-[r:LIKES]->(p:Post) "
            "WITH u, p "
            "WHERE u.user_id = $u_id and p.post_id = $p_id "
            "RETURN u, p"
            )
    result1 = session.run(query1, u_id = like.user_id, p_id = like.post_id)


    try:
        result1_list = [{"user_id": record["u"]["user_id"], "post_id": record["p"]["post_id"]} 
                        for record in result1]
        #result array is something like [{'user_id': 'sajfkancaskcasca', 'post_id': '99831e32-eb67-4aa9-bb07-ce9b74c76446'}]
        #if there is the LIKES relationship between the user and the post, it's [] otherwise
        print(type(result1_list))
        print(result1_list)
        if not result1_list: #if result1_list is empty -> non c'era la LIKES relationship e quindi devo aggiungerla
            query2 = (
                "MATCH (u) WHERE u:User and u.user_id = $u_id "
                "MATCH (p) WHERE p:Post and p.post_id = $p_id "
                "CREATE (u)-[:LIKES]->(p) "
                "RETURN u, p"
                )
            operation_performed = "Added LIKES relationship"
        else: #result list is not empty
            query2 = (
                "MATCH (u:User)-[r:LIKES]->(p:Post) "
                "WHERE u.user_id = $u_id AND p.post_id = $p_id "
                "DELETE r "
                "RETURN u, p"
            )

            operation_performed = "Removed LIKES relationship"

        result2 = session.run(query2, u_id = like.user_id, p_id = like.post_id)
        result2_list = [{"user_id": record["u"]["user_id"], "post_id": record["p"]["post_id"]} 
                        for record in result2]
        return {"response": operation_performed + " from User " + result2_list[0]["user_id"] + " to Post " + result2_list[0]["post_id"]}
    
    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query2, exception=exception))
            raise

#per la relazione follows fare la stessa identica cosa che ho fatto per /likes
@app.post("/follows")
async def create_or_remove_follows(follows: Follows): #quando creo un post devo creare sia il nodo Post, ma anche la relazione "Published" con l'utente che ha creato il post
                                   #quindi invece di Post posso chiamarlo PublishedPost ed aggiungere il parametro "user_id", che mi servirà per aggiungere la relazione
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query1 = (
            "OPTIONAL MATCH (u1:User)-[r:FOLLOWS]->(u2:User) "
            "WITH u1, u2 "
            "WHERE u1.user_id = $u1_id AND u2.user_id = $u2_id "
            "RETURN u1, u2"
            )
    result1 = session.run(query1, u1_id = follows.user_id1, u2_id = follows.user_id2)

    try:
        result1_list = [{"user_id1": record["u1"]["user_id"], "user_id2": record["u2"]["user_id"]} 
                        for record in result1]
        #result array is something like [{'user_id': 'sajfkancaskcasca', 'post_id': '99831e32-eb67-4aa9-bb07-ce9b74c76446'}]
        #if there is the LIKES relationship between the user and the post, it's [] otherwirse
        print(type(result1_list))
        print(result1_list)
        if not result1_list: #if result1_list is empty -> non c'era la LIKES relationship e quindi devo aggiungerla
            query2 = (
                "MATCH (u1) WHERE u1:User and u1.user_id = $u1_id "
                "MATCH (u2) WHERE u2:User and u2.user_id = $u2_id "
                "CREATE (u1)-[:FOLLOWS]->(u2) "
                "RETURN u1, u2"
                )
            operation_performed = "Added FOLLOWS relationship"
        else: #result list is not empty
            query2 = (
                "MATCH (u1:User)-[r:FOLLOWS]->(u2:User) "
                "WHERE u1.user_id = $u1_id AND u2.user_id = $u2_id "
                "DELETE r "
                "RETURN u1, u2"
            )
            operation_performed = "Removed FOLLOWS relationship"

        result2 = session.run(query2, u1_id = follows.user_id1, u2_id = follows.user_id2)
        result2_list = [{"user_id1": record["u1"]["user_id"], "user_id2": record["u2"]["user_id"]} 
                        for record in result2]
        print(result2_list)
        print(operation_performed)
        return {"response": operation_performed + " from User " + result2_list[0]["user_id1"] + " to User " + result2_list[0]["user_id2"]}
    
    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query2, exception=exception))
            raise



@app.post("/saved") 
async def create_or_remove_saved(saved: Saved): #quando creo un post devo creare sia il nodo Post, ma anche la relazione "Published" con l'utente che ha creato il post
                                   #quindi invece di Post posso chiamarlo PublishedPost ed aggiungere il parametro "user_id", che mi servirà per aggiungere la relazione
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query1 = (
            "OPTIONAL MATCH (u:User)-[r:SAVED]->(p:Post) "
            "WITH u, p "
            "WHERE u.user_id = $u_id and p.post_id = $p_id "
            "RETURN u, p"
            )
    result1 = session.run(query1, u_id = saved.user_id, p_id = saved.post_id)

    
    try:
        result1_list = [{"user_id": record["u"]["user_id"], "post_id": record["p"]["post_id"]} 
                        for record in result1]
        #result array is something like [{'user_id': 'sajfkancaskcasca', 'post_id': '99831e32-eb67-4aa9-bb07-ce9b74c76446'}]
        #if there is the LIKES relationship between the user and the post, it's [] otherwirse
        print(type(result1_list))
        print(result1_list)
        if not result1_list: #if result1_list is empty -> non c'era la LIKES relationship e quindi devo aggiungerla
            query2 = (
                "MATCH (u) WHERE u:User and u.user_id = $u_id "
                "MATCH (p) WHERE p:Post and p.post_id = $p_id "
                "CREATE (u)-[:SAVED]->(p) "
                "RETURN u, p"
                )
            operation_performed = "Added SAVED relationship"
        else: #result list is not empty
            query2 = (
                "MATCH (u:User)-[r:SAVED]->(p:Post) "
                "WHERE u.user_id = $u_id AND p.post_id = $p_id "
                "DELETE r "
                "RETURN u, p"
            )

            operation_performed = "Removed SAVED relationship"

        result2 = session.run(query2, u_id = saved.user_id, p_id = saved.post_id)
        result2_list = [{"user_id": record["u"]["user_id"], "post_id": record["p"]["post_id"]} 
                        for record in result2]
        return {"response": operation_performed + " from User " + result2_list[0]["user_id"] + " to Post " + result2_list[0]["post_id"]}
    
    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query2, exception=exception))
            raise



@app.get("/saved/{user_id}") #ritorno tutti i post salvati più quanti sono (?)(?)(?) #TODO-> meglio farlo qui che nel front end credo (?)
async def get_all_saved(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:SAVED]->(p:Post) WHERE u.user_id = $u_id "
            "RETURN p"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"post_id": record["p"]["post_id"],"fb_img_url": record["p"]["fb_img_url"] ,"description": record["p"]["description"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/published/{user_id}") #ritorno tutti i post pubblicati da uno specifico utente
async def get_all_published(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:PUBLISHED]->(p:Post) WHERE u.user_id = $u_id "
            "RETURN u, p "
            "ORDER BY p.datetime DESC"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"post_id": record["p"]["post_id"],"fb_img_url": record["p"]["fb_img_url"] ,"description": record["p"]["description"], "datetime":record["p"]["datetime"],"user_id":record["u"]["user_id"], "username":record["u"]["username"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.get("/likes/{user_id}") #ritorno tutti i post piaciuti a uno specifico utente #TODO:SERVE??? Penso di no
async def get_all_liked(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:LIKES]->(p:Post) WHERE u.user_id = $u_id "
            "RETURN p"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"post_id": record["p"]["post_id"],"fb_img_url": record["p"]["fb_img_url"] ,"description": record["p"]["description"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/peoplewholiked/{post_id}") #ritorna tutte le persone a cui è piciuto uno specifico post
async def get_people_who_liked(post_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:LIKES]->(p:Post) WHERE p.post_id = $p_id "
            "RETURN u"
            )
    try:
        result = session.run(query, p_id = post_id)
        return [{"user_id": record["u"]["user_id"],"username": record["u"]["username"]} #TODO: aggiungere profile_pic se serve 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/comments/{post_id}") #ritorna tutti i commenti su uno specifico post e le persone che li hanno fatti
async def get_comments(post_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:COMMENTED]->(c:Comment)-[:COMMENT_ON]->(p:Post) WHERE p.post_id = $p_id "
            "RETURN u, c"
            )
    try:
        result = session.run(query, p_id = post_id)
        return [{"user_id": record["u"]["user_id"],"username": record["u"]["username"], "comment_id": record["c"]["comment_id"], "comment_text": record["c"]["comment_text"],"datetime":record["c"]["datetime"]} #TODO: aggiungere profile_pic se serve 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/followers/{user_id}") #ritorno tutti i follower di uno specifico utente
async def get_followers(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u1:User)-[:FOLLOWS]->(u2:User) WHERE u2.user_id = $u_id "
            "RETURN u1"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"user_id": record["u1"]["user_id"],"username": record["u1"]["username"]} #TODO: aggiungere profile_pic se serve
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/followed/{user_id}") #ritorno tutti i follower di uno specifico utente
async def get_followed(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u1:User)-[:FOLLOWS]->(u2:User) WHERE u1.user_id = $u_id "
            "RETURN u2"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"user_id": record["u2"]["user_id"],"username": record["u2"]["username"]} #TODO: aggiungere profile_pic se serve
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.get("/numfollowers/{user_id}") 
async def get_num_followers(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u1:User)-[r:FOLLOWS]->(u2:User) WHERE u2.user_id = $u_id "
            "RETURN count(r) as count"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"num_followers": record["count"]} for record in result]
    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/numfollowed/{user_id}") 
async def get_num_followed(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u1:User)-[r:FOLLOWS]->(u2:User) WHERE u1.user_id = $u_id "
            "RETURN count(r) as count"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"num_followed": record["count"]} for record in result]
      

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/numlikes/{post_id}") #ritorno tutti i like ad uno specifico post
async def get_num_likes(post_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[r:LIKES]->(p:Post) WHERE p.post_id = $p_id "
            "RETURN count(r) as count"
            )
    try:
        result = session.run(query, p_id = post_id)
        return [{"num_likes": record["count"]} for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/numpublished/{user_id}") 
async def get_num_published(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[r:PUBLISHED]->(p:Post) WHERE u.user_id = $u_id "
            "RETURN count(r) as count"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"num_published": record["count"]} for record in result]
      

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise


@app.get("/numsaved/{user_id}") 
async def get_num_published(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[r:SAVED]->(p:Post) WHERE u.user_id = $u_id "
            "RETURN count(r) as count"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"num_saved": record["count"]} for record in result]
      

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.get("/followedposts/{user_id}") #ritorno i tutti post pubblicati dalle persone che uno specifico utente segue 
#TODO: ORDINARE IN BASE ALLA DATA DI PUBBLICAZIONE
async def get_all_published(user_id: str):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u1:User)-[:FOLLOWS]->(u2:User)-[:PUBLISHED]->(p:Post) WHERE u1.user_id = $u_id "
            "RETURN u2, p"
            )
    try:
        result = session.run(query, u_id = user_id)
        return [{"post_id": record["p"]["post_id"],"fb_img_url": record["p"]["fb_img_url"] ,"description": record["p"]["description"], "user_id":record["u2"]["user_id"], "username":record["u2"]["username"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise



@app.get("/popularposts/{num_posts}") #ritorno i post più popolari (con il maggior numero di like)
async def get_all_published(num_posts: int):
    neo4j_driver = GraphDatabase.driver(uri=uri, auth=(user,password))
    session = neo4j_driver.session()
    query = (
            "MATCH (u:User)-[:PUBLISHED]->(p:Post)<-[r:LIKES]->(u:User) "
            "WITH count(r) AS num_likes "
            "ORDER BY num_likes "
            "RETURN u, p "
            "LIMIT $limit "
            )
    try:
        result = session.run(query, limit = num_posts)
        return [{"post_id": record["p"]["post_id"],"fb_img_url": record["p"]["fb_img_url"] ,"description": record["p"]["description"], "user_id":record["u2"]["user_id"], "username":record["u2"]["username"]} 
                    for record in result]

    except Neo4jError as exception:
            logging.error("{query} raised an error: \n {exception}".format(
                query=query, exception=exception))
            raise





if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)








"""

Query da fare:
OK ----------------------------- create_user(uuid) -> (POST)
OK ----------------------------- create_post(fb_img_url) -> (POST)
NO ----------------------------- create_published(uuid, fb_img_url) -> NO! La relazione published la creo quando creo il post
OK ----------------------------- create_or_remove_likes(uuid, fb_img_url)
OK ----------------------------- create_saved(uuid, fb_img_url)
OK ----------------------------- create_or_remove_follows(uuid1,uuid2) -> uuid1 follows uuid2

OK ----------------------------- delete_user(uuid)
OK ----------------------------- delete_post(fb_img_url)
-> per entrambe le delete DEVO USARE DETACH DELETE (vedi https://neo4j.com/graphacademy/training-updating-40/03-updating40-deleting-nodes-and-relationships/ )


- ????check_published(uuid, fb_img_url) -> (GET) checks whether User with uuid published the Post with fb_img_url
                                in realtà non serve perché se sul mio profilo mostro i miei post non mi serve
                                controllare che sia mio per poterlo modificare o rimuovere ad esempio
                                posso fare tutto prendendo i miei post quando l'utente logga e salvandoli in un array
                                evitanto così di andare a fare chiamate rest sui miei post per qualsiasi cosa
                                ovviamente questo non si applica sui like ai post o sulla lista di post pubblicati perché quelli possono cambiare mentre che sono loggato
                                

OK ----------------------------- get_all_saved(uuid)
OK ----------------------------- get_all_published(uuid)
OK ----------------------------- get_num_published(uuid)
OK ----------------------------- get_num_saved(uuid)
OK ----------------------------- get_all_liked(uuid) -> SERVE???????????

OK ----------------------------- get_all_followers(uuid)
OK ----------------------------- get_num_followers(uuid)
OK ----------------------------- get_all_followed(uuid)
OK ----------------------------- get_num_followed(uuid)
- get_all_posts(uuid) -> cioè???
- get_num_posts(fb_img_url) --> CIOè??????????
- get_all_likes(uuid)
OK ----------------------------- get_num_likes(fb_img_url)

- get_likes_to_post(post_id)


"""