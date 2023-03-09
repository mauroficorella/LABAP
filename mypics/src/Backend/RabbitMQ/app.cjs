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

var calcSocket = socketIO.of("/calc");

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
      user_queue = "queue_" + req.body.followed_user_id;
      following_user_id = req.body.following_user_id;

      /*channel.assertExchange(ex, "direct", {
        durable: false,
      });

      channel.publish(ex, "", new Buffer(msg), { persistent: false });*/

      channel.assertQueue(user_queue, {
        durable: true,
      });
      channel.sendToQueue(
        user_queue,
        Buffer.from("User " + following_user_id + " started following you :)"),
        {
          persistent: true,
        }
      );
      console.log(" [x] Sent '%s'", msg);
      calcSocket.emit("abcdef95", JSON.stringify({ result: "new valentano" }));

      channel.close(() => {
        connection.close();
      });
    });
  });
});

router.route("/receive").post((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  var response = "";
  rabbitMQHandler((connection) => {
    connection.createChannel((err, channel) => {
      if (err) {
        throw new Error(err);
      }

      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        console.log("req.body");
        console.log(req.body);
        queue = "queue_" + req.body.user_id;

        channel.assertQueue(queue, {
          durable: true,
        });

        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );

        channel.consume(
          queue,
          function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            response = msg.content.toString();

            //calcSocket.emit("abcdef95", msg);
          },
          {
            noAck: true,
          }
        );
      });
      /*var mainQueue = "calc_sum";

      channel.assertQueue(
        "",
        { exclusive: true },
        (err, queue) => {
          if (err) {
            throw new Error(err);
          }
          //channel.bindQueue(queue.queue, mainQueue, '')
          channel.consume(mainQueue, (msg) => {
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
      );}*/
    });
  });
  return response;
});

server.listen(5555, "localhost", () => {
  console.log("Running at at localhost:5555");
});
