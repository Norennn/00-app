const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("接続されました");

  // クライアントから受信
  socket.on("send_message", (data) => {
    console.log(data);

    // クライアントへ送信
    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("接続されてません");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
