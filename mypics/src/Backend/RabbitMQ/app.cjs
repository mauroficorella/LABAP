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
  var response = JSON.stringify({ response: "error" });
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  rabbitMQHandler((connection) => {
    connection.createChannel(function (error, channel) {
      if (error) {
        throw error;
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

      //TODO controllare perchè dopo la seconda volta che si clicca su follow la response non viene più ricevuta
      channel.consume(
        queue,
        async function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
          response = JSON.stringify({ response: msg.content.toString() });
          console.log(response);
          res.send(response);
          channel.close(function () {
            connection.close();
          }); 
        },
        {
          noAck: true,
        }
      );
    });
  });
});

server.listen(5555, "localhost", () => {
  console.log("Running at at localhost:5555");
});
