import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, ChatModel } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages } = await req.json();
    const user = await currentUser();
    const userId = user?.id;

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedSession = await ChatModel.findOneAndUpdate(
      { sessionId },
      { 
        $set: { 
          messages,
          userId: userId || null,
          updatedAt: new Date()
        }
      },
      { new: true }
    );

    if (!updatedSession) {
      return NextResponse.json(
        { error: "Chat session not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save chat history:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 