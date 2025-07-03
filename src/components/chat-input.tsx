"use client";

import { useChat } from "@/contexts/chat-context";
import { cn } from "@/lib/utils";
import React from "react";
import { Textarea } from "./ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown";
import { Button } from "./ui/button";
import { ArrowUp, Globe, Paperclip } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
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

const ChatInput = () => {
  const { isSignedIn } = useAuth();

  const { messages, addMessage } = useChat();

  const form = useForm<z.infer<typeof ChatFormSchema>>({
    resolver: zodResolver(ChatFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const content = form.watch("content");
  console.log(messages);

  const handleMessageSubmit = async (data: z.infer<typeof ChatFormSchema>) => {
    addMessage({
      sender: "User",
      content: data.content,
    });

    form.reset();
  };

  return (
    <div
      className={cn(
        "w-full mx-auto",
        messages.length <= 0
          ? "h-full flex flex-col items-center justify-center space-y-10"
          : "fixed max-w-[90%] sm:max-w-[60%] lg:max-w-[50%] bottom-5"
      )}
    >
      {messages.length <= 0 && (
        <h3 className="text-2xl font-semibold">CloneGPT</h3>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleMessageSubmit)}
          className="w-full min-h-12 max-h-52 overflow-auto p-2.5 [scrollbar-width:thin] bg-neutral-200 rounded-4xl"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ask anything"
                    className="w-full resize-none border-0 block p-4 focus-visible:ring-0 text-base shadow-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        form.handleSubmit(handleMessageSubmit)();
                      }
                    }}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between px-3">
            <div className="flex items-center justify-center space-x-2">
              {isSignedIn ? (
                <FormField
                  name="file"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <label htmlFor="file_input">
                          <span className="rounded-full flex items-center gap-1 cursor-pointer bg-transparent">
                            <Paperclip className="w-4 h-4" />
                            <span className="hidden sm:inline-block">
                              Attach
                            </span>
                            <Input
                              id="file_input"
                              title="Attach"
                              type="file"
                              accept=".jpg,.png,.jpeg,.pdf,.docx"
                              onChange={(e) => {
                                field.onChange(e.target.files);
                              }}
                              style={{ display: "none" }}
                            />
                          </span>
                        </label>
                      </FormControl>
                    </FormItem>
                  )}
                />
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="rounded-full cursor-pointer bg-transparent"
                    >
                      <Paperclip />
                      <span className="hidden sm:inline-block">Attach</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="p-0 rounded-2xl">
                    <UnauthorizedCard />
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                variant={"outline"}
                className="rounded-full cursor-pointer bg-transparent"
              >
                <Globe />
                <span className="hidden sm:inline-block">Search</span>
              </Button>
            </div>

            <Button
              type="submit"
              size={"icon"}
              disabled={!content}
              className="rounded-full cursor-pointer"
            >
              <ArrowUp />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;
