"use client";

import { useChat } from "ai/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatForm from "@/components/chat-form";
import ChatInput from "@/components/chat-input";
import { useUser } from "@clerk/nextjs";
import { useChatContext } from "@/contexts/chat-context";

export default function NewChatPage() {
  const router = useRouter();
  const { user } = useUser();
  const { refreshChats } = useChatContext();
  const [hasRedirected, setHasRedirected] = useState(false);
  const [newSessionId, setNewSessionId] = useState<string>("");
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
    reload,
  } = useChat({
    api: "/api/chat",
    body: {
      sessionId: newSessionId,
    },
    onFinish: async (message) => {
      if (!hasRedirected && user?.id && newSessionId) {
        setHasRedirected(true);
        router.replace(`/chat/${newSessionId}`);
        refreshChats();
      }
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  useEffect(() => {
    if (!newSessionId) {
      const generatedSessionId = `session_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      setNewSessionId(generatedSessionId);
    }
  }, [newSessionId]);

  return (
    <div
      className={`flex items-center justify-center ${
        !messages.length ? "pt-0" : "pt-10"
      } px-5`}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
        <ChatForm messages={messages} isLoading={isLoading} />
        <ChatInput
          historyLoad={false}
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
