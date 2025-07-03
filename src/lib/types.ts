export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface SaveChatParams {
  sessionId: string;
  messages: ChatMessage[];
  userId?: string;
}
