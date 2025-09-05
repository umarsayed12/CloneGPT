import { useState, useEffect, useCallback } from "react";
import { AllChatsResponse, ChatSession } from "@/lib/types";

export function useAllChats(userId: string | undefined) {
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(false);

  const loadAllChats = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/chat/user?userId=${userId}`);
      if (response.ok) {
        const data: AllChatsResponse = await response.json();
        setChats(data.chats || []);
      }
    } catch (error) {
      console.error("Error loading all chats:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadAllChats();
  }, [loadAllChats]);

  return {
    chats,
    loading,
    refetch: loadAllChats,
  };
}
