// この行をファイルの最初に追加してください
"use client";

import Image from "next/image";
import styles from "./page.module.css";
import io from "socket.io-client";
import React, { useState } from "react";

const socket = io("http://localhost:3000/");

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);

  const handleSendMessage = () => {
    // サーバーに送信
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  // サーバーから受信
  socket.on("received_message", (data) => {
    console.log(messageList);
    setMessageList([...messageList, data]);
  });

  return (
    <main className={styles.main}>
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={() => handleSendMessage()}>送信</button>

      <ul>
        {messageList.map((chat) => (
          <li key={chat.message}>{chat.message}</li>
        ))}
      </ul>
    </main>
  );
}
