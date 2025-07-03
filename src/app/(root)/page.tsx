"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatInput from "@/components/chat-input";

export default function ChatPage() {
  const [sessionId] = useState(() => `session_${Date.now()}`);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { sessionId },
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });

  return (
    <div
      className={`flex items-center justify-center ${
        !messages.length ? "pt-0" : "pt-10"
      } px-5`}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
        <ChatForm messages={messages} isLoading={isLoading} />
        <ChatInput
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          hasMessages={messages.length > 0}
        />
      </div>
    </div>
  );
}
