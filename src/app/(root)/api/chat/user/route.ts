import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, ChatModel } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const chats = await ChatModel.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json(
      {
        userId,
        chats: chats.map((chat) => ({
          sessionId: chat.sessionId,
          messages: chat.messages,
          createdAt: chat.createdAt,
          updatedAt: chat.updatedAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user's chats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
