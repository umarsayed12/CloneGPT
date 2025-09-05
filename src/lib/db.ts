import mongoose from "mongoose";
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
let cached: MongooseCache = (
  global as typeof globalThis & { mongoose?: MongooseCache }
).mongoose ?? {
  conn: null,
  promise: null,
};
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(process.env.MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("Connected to MongoDB Atlas");
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const chatSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String },
  messages: [
    {
      id: String,
      role: { type: String, enum: ["user", "assistant"] },
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const ChatModel =
  mongoose.models.Chat || mongoose.model("Chat", chatSchema);
