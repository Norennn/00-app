const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const port = process.env.PORT || 8000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "https://zero0-app.onrender.com/",
      "http://localhost:3000",
      "https://00-app-ebon.vercel.app/",
    ],
    credentials: true,
  },
});

// 静的ファイルを提供する設定
app.use(express.static(join(__dirname, "public")));

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

server.listen(port, (err) => {
  if (err) {
    console.error("サーバー起動エラー:", err);
  } else {
    console.log(`server running at ${port}`);
  }
});
