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

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AllChatsResponse {
  userId: string;
  chats: ChatSession[];
}
