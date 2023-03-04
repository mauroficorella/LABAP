var express = require("express");
var bodyParser = require("body-parser");
var rabbitMQHandler = require("./connection.cjs");

var app = express();
var router = express.Router();
var server = require("http").Server(app);
var socketIO = require("socket.io")(server);

var calcSocket = socketIO.of("/calc");

rabbitMQHandler((connection) => {
  connection.createChannel((err, channel) => {
    if (err) {
      throw new Error(err);
    }
    var mainQueue = "calc_sum";
    console.log(mainQueue);
    var ex = "calc_sum";

    /*channel.assertQueue(mainQueue, {
      durable: false
    });
    channel.sendToQueue(mainQueue, Buffer.from("Hello World"));
    console.log(" [x] Sent %s", "hello world");*/
    channel.assertExchange(ex, "direct", {
      durable: false,
    });

    channel.assertQueue(
      "",
      { exclusive: true },
      (err, queue) => {
        if (err) {
          throw new Error(err);
        }
        channel.bindQueue(queue.queue, mainQueue, "");
        channel.consume(queue.queue, (msg) => {
          var result = JSON.stringify({
            result: Object.values(
              JSON.parse(msg.content.toString()).task
            ).reduce(
              (accumulator, currentValue) =>
                parseInt(accumulator) + parseInt(currentValue)
            ),
          });
          calcSocket.emit("calc", result);
        });
      },
      { noAck: true }
    );
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
router.route("/calc/sum").post((req, res) => {
  rabbitMQHandler((connection) => {
    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err);
      }
      var ex = "calc_sum";
      var msg = JSON.stringify({ task: req.body });

      channel.assertExchange(ex, "direct", {
        durable: false,
      });

      channel.publish(ex, "", new Buffer(msg), { persistent: false });

      channel.close(() => {
        connection.close();
      });
    });
  });
});

server.listen(5555, "localhost", () => {
  console.log("Running at at localhost:5555");
});
