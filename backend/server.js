const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    
     origin: [
      "http://localhost:5173",
      "http://localhost:5174"
    ],
    methods: ["GET", "POST"]
  }
});

let queueData = {
  queue: [],
  currentToken: null,
  avgTime: 0
};

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.emit("queueUpdate", queueData);

  socket.on("updateQueue", (data) => {

    queueData = data;

    io.emit("queueUpdate", queueData);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});