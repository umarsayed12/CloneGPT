import { useState } from "react";

export function useDeleteHistory(userId?: string) {
  const [loading, setLoading] = useState(false);

  const deleteChat = async (sessionId: string) => {
    if (!sessionId) return;

    setLoading(true);
    try {
      const url = userId
        ? `/api/chat?sessionId=${sessionId}&userId=${userId}`
        : `/api/chat?sessionId=${sessionId}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("History Deleted Successfully!");
      }
    } catch (error) {
      console.error("Error deleting chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteChat, loading };
}
