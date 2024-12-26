import getChatCompletion from "@/utils/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt is required" },
        { status: 400 }
      );
    }

    const aiResponse = await getChatCompletion(prompt);

    return NextResponse.json({ success: true, result: aiResponse });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: `Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
