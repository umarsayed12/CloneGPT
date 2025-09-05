"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatProviderProps {
  children?: React.ReactNode;
}

interface MessageProps {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

const ChatContext = createContext<{
  messages: MessageProps[];
  addMessage: (message: MessageProps) => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>;
  refreshChats: () => void;
  chatRefreshKey: number;
}>({
  messages: [],
  addMessage: () => {},
  setMessages: () => {},
  refreshChats: () => {},
  chatRefreshKey: 0,
});

export const useChatContext = () => useContext(ChatContext);

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [chatRefreshKey, setChatRefreshKey] = useState(0);

  const addMessage = (message: MessageProps) => {
    setMessages((prev) => [...prev, message]);
  };

  const refreshChats = () => {
    setChatRefreshKey((prev) => prev + 1);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        setMessages,
        refreshChats,
        chatRefreshKey,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
