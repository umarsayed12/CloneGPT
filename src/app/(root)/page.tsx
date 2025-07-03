"use client";
import ChatInput from "@/components/chat-input";
import ChatForm from "@/components/chat-form";
import React from "react";
import { useChat } from "@/contexts/chat-context";

const HomePage = () => {
  const { messages } = useChat();
  return (
    <div
      className={`flex items-center justify-center ${
        !messages.length ? "pt-40" : "pt-10"
      } px-5`}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
        <ChatForm />
        <ChatInput />
      </div>
    </div>
  );
};

export default HomePage;
