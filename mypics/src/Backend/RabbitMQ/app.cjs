var express = require("express");
var bodyParser = require("body-parser");
var rabbitMQHandler = require("./connection.cjs");

var app = express();
var router = express.Router();
var server = require("http").Server(app);
var socketIO = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

var user_queue;

var following_user_id;

/*rabbitMQHandler((connection) => {
  connection.createChannel((err, channel) => {
    if (err) {
      throw new Error(err);
    }
    var mainQueue = "calc_sum";
    var ex = "calc_sum";

    /*channel.assertQueue(mainQueue, {
      durable: false
    });
    channel.sendToQueue(mainQueue, Buffer.from("Hello World"));
    console.log(" [x] Sent %s", "hello world");
    channel.assertExchange(ex, "direct", {
      durable: false,
    });

    channel.assertQueue(
      user_queue,
      { exclusive: true },
      (err, queue) => {
        if (err) {
          throw new Error(err);
        }
        channel.bindQueue(queue.queue, mainQueue, "");
        channel.consume(queue.queue, (msg) => {
          /*console.log(JSON.parse(msg.content.toString()).task);

          var user_id = JSON.parse(msg.content.toString()).task.user_id;
          mainQueue = "follow_queue_" + user_id;

          var result = JSON.stringify({ following_user_id: following_user_id });
          /*var result = JSON.stringify({
            result: Object.values(
              JSON.parse(msg.content.toString()).task
            ).reduce(
              (accumulator, currentValue) =>
                parseInt(accumulator) + parseInt(currentValue)
            ),
          });
          console.log(result);
          calcSocket.emit("calc", result);
          calcSocket.emit("calc", result);
        });
      },
      { noAck: true }
    );
  });
});*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);
router.route("/calc/sum").post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  rabbitMQHandler((connection) => {
    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err);
      }
      var ex = "calc_sum";
      var msg = JSON.stringify({ task: req.body });

      console.log("req.body");
      console.log(req.body);
      user_queue = "follow_queue_" + req.body.followed_user_id;
      following_user_id = req.body.following_user_id;

      /*channel.assertExchange(ex, "direct", {
        durable: false,
      });

      channel.publish(ex, "", new Buffer(msg), { persistent: false });*/

      channel.assertQueue(user_queue, {
        durable: true,
      });
      channel.sendToQueue(user_queue, Buffer.from(following_user_id), {
        persistent: true,
      });
      console.log(" [x] Sent '%s'", msg);

      var calcSocket = socketIO.of("/calc");

      calcSocket.emit("calc", "ciao frontend");

      channel.close(() => {
        connection.close();
      });
    });
  });
});

server.listen(5555, "localhost", () => {
  console.log("Running at at localhost:5555");
});
