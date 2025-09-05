import { MemoryClient } from "mem0ai";

let memoryClient: MemoryClient | null = null;
interface MemoryItem {
  id?: string;
  content?: string;
  text?: string;
  metadata?: {
    user_id?: string;
    userId?: string;
    sessionId?: string;
    timestamp?: string;
  };
  score?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
export function getMemoryClient(): MemoryClient {
  if (!memoryClient) {
    memoryClient = new MemoryClient({
      apiKey: process.env.MEM0_API_KEY!,
    });
  }
  return memoryClient;
}

export async function saveToMemory(
  content: string,
  userId: string,
  sessionId: string
) {
  try {
    const client = getMemoryClient();
    const messages = [
      {
        role: "assistant" as const,
        content: content,
      },
    ];
    await client.add(messages, {
      user_id: `${userId}_${sessionId}`,
      metadata: {
        userId: userId,
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error saving to memory:", error);
  }
}

export async function getMemories(
  userId: string,
  sessionId: string,
  limit: number = 10
): Promise<string> {
  try {
    const client = getMemoryClient();
    const memories = await client.getAll({
      user_id: `${userId}_${sessionId}`,
      limit,
    });

    if (!memories || memories.length === 0) {
      return "";
    }

    const memoryText = memories
      .map((memory: MemoryItem) => memory.content || memory.text)
      .filter(Boolean)
      .join("\n");

    return memoryText
      ? `\nPrevious context from this conversation:\n${memoryText}`
      : "";
  } catch (error) {
    console.error("Error retrieving memories:", error);
    return "";
  }
}
