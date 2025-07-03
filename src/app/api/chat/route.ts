import { streamText } from "ai";
import { model } from "@/lib/ai";
import { NextRequest, NextResponse } from "next/server";
import { ChatModel, connectToDatabase } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();
    const user = await currentUser();
    const userId = user?.id;

    const result = streamText({
      model: model,
      messages: messages,
      system:
        "Act as CloneGPT, a ChatGPT-style AI assistant. Your personality is warm, expressive, and emotionally intelligent. You behave like a friendly and helpful companion. Always explain things clearly, use emojis naturally, and engage with empathy. Maintain a balance between friendliness and clarity. Respond like ChatGPT would: concise when needed, in-depth when asked, and never condescending. Always be approachable, supportive, and aware of the user’s tone and needs.",
      onFinish: async (result) => {
        try {
          await connectToDatabase();
          const assistantMessage = {
            id: `msg_${Date.now()}`,
            role: "assistant" as const,
            content: result.text,
            timestamp: new Date(),
          };
          const allMessages = [
            ...messages.map((msg: any, index: number) => ({
              id: msg.id || `msg_${Date.now()}_${index}`,
              role: msg.role,
              content: msg.content,
              timestamp: msg.timestamp || new Date(),
            })),
            assistantMessage,
          ];

          const chatData = {
            sessionId: sessionId || `session_${Date.now()}`,
            userId: userId || null,
            messages: allMessages,
            updatedAt: new Date(),
          };
          await ChatModel.findOneAndUpdate(
            { sessionId: chatData.sessionId },
            {
              $set: {
                userId: chatData.userId,
                messages: chatData.messages,
                updatedAt: chatData.updatedAt,
              },
              $setOnInsert: {
                createdAt: new Date(),
              },
            },
            {
              upsert: true,
              new: true,
              runValidators: true,
            }
          );

          console.log(
            `Chat saved successfully for session: ${chatData.sessionId}`
          );
        } catch (error) {
          console.error("Error saving chat:", error);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const userId = searchParams.get("userId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const query: any = { sessionId };
    if (userId) {
      query.userId = userId;
    }

    const chat = await ChatModel.findOne(query);

    if (!chat) {
      return NextResponse.json({ messages: [] }, { status: 200 });
    }

    return NextResponse.json({
      messages: chat.messages,
      sessionId: chat.sessionId,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    });
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
