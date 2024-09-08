"use client";

import React, { useState } from "react";
import { ChatCompletionMessageInterface } from "@/app/chat-completion-message.interface";
import createChatCompletion from "@/app/createChatCompletion";

function Chat() {
  const [messages, setMessages] = useState<ChatCompletionMessageInterface[]>(
    [],
  );
  const [message, setMessage] = useState("");

  const handleMessage = async () => {
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ];

    setMessages(updatedMessages);
    setMessage("");

    const response = (await createChatCompletion(updatedMessages)).choices[0]
      ?.message;

    setMessages([...updatedMessages, response]);
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-10 container mx-auto">
      <div className="flex flex-col gap-3 h-[75%] overflow-scroll w-full">
        {messages.map((message) => (
          <div
            key={""}
            className={
              message.role === "user" ? "chat chat-start" : "chat chat-end"
            }
          >
            <div className="chat-bubble">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="input input-bordered w-full m-10"
        placeholder="Please enter message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await handleMessage();
          }
        }}
      />
    </div>
  );
}

export default Chat;
