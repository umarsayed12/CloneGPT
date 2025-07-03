"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatProviderProps {
  children?: React.ReactNode;
}

interface MessageProps {
  sender: "User" | "AI";
  content: string;
}

const ChatContext = createContext<{
  messages: MessageProps[];
  addMessage: (message: MessageProps) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
}>({
  messages: [],
  addMessage: () => {},
  setMessages: () => {},
});

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  const addMessage = (message: MessageProps) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, setMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
