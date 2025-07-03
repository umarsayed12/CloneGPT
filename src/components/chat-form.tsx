"use client";

import { useChat } from "@/contexts/chat-context";
import { cn } from "@/lib/utils";
import React from "react";

const ChatForm = () => {
  const { messages } = useChat();
  console.log(messages);

  if (!messages) return null;
  console.log(messages);

  return (
    <div
      className={cn(
        messages.length > 0 &&
          "flex-1 flex flex-col gap-10 max-w-[90%] sm:max-w-[80%] lg:max-w-full w-full"
      )}
    >
      {messages.map((msg, i) => (
        <p
          className={` ${msg.sender === "User" ? "text-right" : "text-left"}`}
          key={i}
        >
          <span
            className={`${
              msg.sender === "User" ? "bg-accent" : "bg-transparent"
            } p-4 rounded-3xl`}
          >
            {msg.content}
          </span>
        </p>
      ))}
    </div>
  );
};

export default ChatForm;
