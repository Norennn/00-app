"use client";

import Image from "next/image";
import styles from "./page.module.css";
import io from "socket.io-client";
import React, { useState, useEffect } from "react";

// 環境変数を使用して接続先を設定
const socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "https://zero0-app.onrender.com/"
);

export default function Home() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);

  useEffect(() => {
    // サーバーから受信
    socket.on("received_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });

    // クリーンアップ
    return () => {
      socket.off("received_message");
    };
  }, []);

  const handleSendMessage = () => {
    // サーバーに送信
    socket.emit("send_message", { message: message });
    setMessage("");
  };

  return (
    <main className={styles.main}>
      チャットアプリ
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button onClick={() => handleSendMessage()}>送信する</button>
      <ul>
        {messageList.map((chat, index) => (
          <li key={index}>{chat.message}</li>
        ))}
      </ul>
    </main>
  );
}
