import { useState, useEffect } from "react";
import { ChatMessage } from "@/lib/types";

export function useChatHistory(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const loadChatHistory = async () => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/chat/history?sessionId=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveChatHistory = async (newMessages: ChatMessage[]) => {
    try {
      await fetch("/api/chat/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages: newMessages }),
      });
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, [sessionId]);

  return { messages, loading, saveChatHistory };
}
