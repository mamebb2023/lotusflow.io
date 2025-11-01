import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt, message } = await req.json();
    const userPrompt = prompt || message;
    if (!userPrompt) {
      return NextResponse.json(
        { chatMsg: "Missing prompt", code: "" },
        { status: 400 }
      );
    }

    const systemPrompt = `
      You are LotusFlow — an AI that generates clean React components using TailwindCSS.

      Respond STRICTLY in JSON format like this:

      {
        "chatMsg": "Short summary of the component",
        "code": "<div>...</div> or <button>...</button>"
      }

      CRITICAL RULES:
      - Generate ONE single React functional component only
      - DO NOT create separate reusable sub-components 
      - DO NOT extract parts into separate functions or components
      - ALL JSX must be inside the single main component's return statement
      - Components must be completely self-contained with no dependencies
      - For dynamic className with template literals, always use: className={\`...\${variable}...\`} Never use: className=\`...\`
      - Return ONLY the JSON object (no markdown, no code fences, no commentary)
      - Use TailwindCSS for all styling
      - The "code" field must contain a complete, standalone functional component

      EXAMPLE OF CORRECT FORMAT:
      function MyComponent() {
        const [state, setState] = useState(false);
        return (
          <div className="p-4">
            <button onClick={() => setState(!state)}>Click</button>
            {state && <p>Content</p>}
          </div>
        );
      }

      IMPORTANT:
      - Keep the component concise and focused on the main functionality
      - Prioritize clarity and simplicity in the generated code

      WRONG - DO NOT DO THIS:
      - If a reusable component is generated, set the variables for a default values
      - Creating Card, Button, or other reusable components separately 
      - Extracting logic into helper components
      - Using multiple function declarations
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();

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
    return NextResponse.json(
      { chatMsg: "Error generating component", code: "" },
      { status: 500 }
    );
  }
}