import { GoogleGenerativeAI } from "@google/generative-ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const model = google("gemini-1.5-flash");

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
