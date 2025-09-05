"use client";

import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import ChatForm from "@/components/chat-form";
import ChatInput from "@/components/chat-input";
import { useChatHistory } from "@/hooks/use-chat-history";
import { useChatContext } from "@/contexts/chat-context";
import { useState } from "react";

export default function ChatPage() {
  const { sessionId } = useParams();
  const { refreshChats, setMessages } = useChatContext();

  const actualSessionId = sessionId as string;
  const { messages: historyMessages, loading: historyLoading } =
    useChatHistory(actualSessionId);
  const [count, setCount] = useState(0);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    reload,
  } = useChat({
    api: "/api/chat",
    body: { sessionId: actualSessionId },
    initialMessages: historyMessages,
    onFinish: async (message) => {
      if (count < 1) {
        refreshChats();
        setCount((prev) => prev + 1);
      }
    },
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
