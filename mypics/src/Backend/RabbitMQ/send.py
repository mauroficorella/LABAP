import pika

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

#creazione della hello queue
channel.queue_declare(queue='hello')

#invio del messaggio alla hello queue 
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")

#chiusura connessione
connection.close()