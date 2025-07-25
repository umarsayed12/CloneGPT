"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatInput from "@/components/chat-input";
import { useRouter } from "next/navigation";

export default function ChatPage() {
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const router = useRouter();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { sessionId },
      onError: (error) => {
        console.error("Chat error:", error);
      },
    });
  useEffect(() => {
    if (messages.length > 0) {
      router.replace(`/api/chat/${sessionId}`);
    }
  }, [messages, router]);
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
