"use client";

import { useChat } from "ai/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatInput from "@/components/chat-input";
import { useChatHistory } from "@/hooks/use-chat-history";
export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const routeSessionId = params.sessionId as string;

  const [sessionId, setSessionId] = useState(routeSessionId);
  const { messages: historyMessages, loading: historyLoading } =
    useChatHistory(sessionId);

  useEffect(() => {
    if (routeSessionId === "" && messages.length > 0) {
      const newId = `session_${Date.now()}`;
      router.replace(`api/chat/${newId}`);
      setSessionId(newId);
    }
  }, [routeSessionId, router, historyMessages]);
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      body: { sessionId },
      initialMessages: historyMessages,
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
        {!historyLoading && (
          <ChatForm messages={messages} isLoading={isLoading} />
        )}
        <ChatInput
          historyLoad={historyLoading}
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
