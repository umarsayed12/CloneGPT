"use client";

import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { Button } from "./ui/button";
import { ArrowUp, Globe, Paperclip, X } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { Input } from "./ui/input";
import UnauthorizedCard from "./ui/unauthorized-card";

const ChatFormSchema = z
  .object({
    content: z.string().min(1, { message: "This field is required." }),
    file: z
      .custom<FileList>((val) => val instanceof FileList && val.length > 0, {
        message: "This field is required.",
      })
      .optional(),
  })
  .refine(
    (data) => {
      return data.content || (data.file && data.file?.length > 0);
    },
    {
      message: "This field is required.",
    }
  );

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  hasMessages: boolean;
  historyLoad: boolean;
}

const ChatInput = ({
  historyLoad,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  hasMessages,
}: ChatInputProps) => {
  const { isSignedIn } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    const fileInput = document.getElementById("file_input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      setSelectedFile(null);
      const fileInput = document.getElementById(
        "file_input"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  return (
    <div
      className={cn(
        "w-full mx-auto transition-all duration-300 ease-in-out bg-white",
        !hasMessages && !historyLoad
          ? "h-full flex flex-col items-center justify-end"
          : "fixed bottom-0 max-w-[90%] sm:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]"
      )}
    >
      <div className="w-full">
        {selectedFile && (
          <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Paperclip className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700 truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              <span className="text-xs text-gray-500">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="w-full bg-white border border-gray-200 rounded-3xl shadow-lg focus-within:shadow-xl focus-within:border-blue-300 transition-all duration-200"
        >
          <div className="p-4">
            <Textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything"
              className="w-full resize-none border-0 focus-visible:ring-0 text-base shadow-none bg-transparent placeholder:text-gray-400 min-h-[20px] max-h-[200px]"
              rows={1}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim()) {
                    onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                  }
                }
              }}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between px-4 pb-3 pt-1">
            <div className="flex items-center space-x-2">
              {isSignedIn ? (
                <div className="relative">
                  <label htmlFor="file_input">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0 hover:bg-gray-100 cursor-pointer"
                      asChild
                    >
                      <span>
                        <Paperclip className="w-4 h-4" />
                      </span>
                    </Button>
                    <Input
                      id="file_input"
                      type="file"
                      accept=".jpg,.png,.jpeg,.pdf,.docx,.txt,.md"
                      onChange={(e) => handleFileSelect(e.target.files)}
                      className="hidden"
                      disabled={isLoading}
                    />
                  </label>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-0 rounded-2xl">
                    <UnauthorizedCard />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-full h-8 w-8 p-0 hover:bg-gray-100"
                disabled={isLoading}
              >
                <Globe className="w-4 h-4" />
              </Button>
            </div>

            <Button
              type="submit"
              size="sm"
              disabled={!input.trim() || isLoading}
              className={cn(
                "rounded-full h-8 w-8 p-0 transition-all duration-200",
                input.trim() && !isLoading
                  ? "bg-black hover:bg-gray-400 cursor-pointer text-white shadow-md hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </form>
        <div className="text-center py-1 bg-white">
          <p className="text-xs text-gray-500 bg-white">
            CloneGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
