import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai"; // or "@google/genai" depending on version

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `
      You are LotusFlow — an AI that generates reusable, clean React components using TailwindCSS.

      Respond STRICTLY in JSON format like this:

      {
        "chatMsg": "Short summary of the component",
        "code": "<div>...</div>"
      }

      Rules:
      - Return only the JSON object (no markdown, no commentary).
      - "code" must be a complete JSX component (React functional component).
      - Use TailwindCSS for styling.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent([systemPrompt, prompt]);
    const text = result.response.text();

    // 🧹 Remove code fences or backticks Gemini sometimes adds
    const cleaned = text.replace(/```json|```/g, "").trim();

    // Try to parse the JSON safely
    let data;
    try {
      data = JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse Gemini JSON:", err, cleaned);
      data = { chatMsg: "Generation failed", code: "" };
    }

    console.log("data", data)

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ chatMsg: "Error generating component", code: "" }, { status: 500 });
  }
}
