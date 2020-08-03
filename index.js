const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.static("public"));

app.get("/getAllEvents", (req, res) => {
  request(
    `https://in.bookmyshow.com/serv/getData?cmd=GETTRAILERS&mtype=cs`,
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.json(body); // Show the HTML for the Google homepage.
      }
    }
  );
});
let users = [];
let currentPlayerServer = {};
let serverDiceNumber = 0;

io.on("connection", function(socket) {
  console.log("connected socket!");
  socket.on("load", () => {
    users = [];
  });
  socket.on("join", name => {
    if (users.length < 4) {
      users.push(name);
      io.emit("message", users);
    } else {
      io.emit("message", "full");
    }
  });
  socket.on("roleDice", ({ name, number, currentPlayer }) => {
    console.log("rolled");
    currentPlayerServer = currentPlayer;
    serverDiceNumber = number;
    socket.broadcast.emit("rolled", name, number, currentPlayer);
  });
  socket.on(
    "movedPawn",
    ({ id, color, pawnDetails, name, pawns, currentPlayer }) => {
      console.log("moved");
      socket.broadcast.emit(
        "move",
        id,
        color,
        pawnDetails,
        name,
        currentPlayerServer,
        serverDiceNumber,
        pawns
      );
    }
  );
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
