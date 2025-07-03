"use client";

import { cn } from "@/lib/utils";
import { Message } from "ai";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatFormProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatForm = ({ messages, isLoading }: ChatFormProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-10 max-w-4xl w-full mx-auto px-4 pt-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
          <div className="px-1 text-pretty text-3xl whitespace-pre-wrap">
            How can I help you today?
          </div>
        </div>
      )}

      {messages.map((message, index) => (
        <div
          key={message.id || index}
          className={cn(
            "flex gap-4 group",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          <div
            className={cn(
              "rounded-4xl px-5 py-3 break-words",
              message.role === "user"
                ? "bg-neutral-300 text-black ml-auto max-w-[85%] sm:max-w-[75%]"
                : "bg-transparent w-full text-gray-900"
            )}
          >
            <div className="prose prose-sm max-w-none">{message.content}</div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4 group justify-start">
          <div className="bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 max-w-[85%] sm:max-w-[75%]">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatForm;
