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

      IMAGE URL RULES (VERY IMPORTANT):
      - NEVER use source.unsplash.com or unsplash.it - these are deprecated
      - For placeholder images, use one of these VALID services:
        * https://picsum.photos/WIDTH/HEIGHT (e.g., https://picsum.photos/400/300)
        * https://placehold.co/WIDTHxHEIGHT (e.g., https://placehold.co/400x300)
        * https://via.placeholder.com/WIDTHxHEIGHT (e.g., https://via.placeholder.com/400x300)
      - For specific themed images, use picsum.photos with size parameters
      - Always use HTTPS URLs for images
      - Example: <img src="https://picsum.photos/400/300" alt="Description" />

      EXAMPLE OF CORRECT FORMAT:
      function MyComponent() {
        const [state, setState] = useState(false);
        return (
          <div className="p-4">
            <img src="https://picsum.photos/400/300" alt="Placeholder" className="rounded-lg" />
            <button onClick={() => setState(!state)}>Click</button>
            {state && <p>Content</p>}
          </div>
        );
      }

      IMPORTANT:
      - If requested to create a Card, Button, or simple UI element, generate it in a flex centered container
      - ALWAYS use working image URLs from the approved services above
      - Ensure the generated code is clean, functional, and ready to use in a React project
      - Keep the component concise and focused on the main functionality
      - Prioritize clarity and simplicity in the generated code
      - Always use working, valid image URLs from the approved services above

      WRONG - DO NOT DO THIS:
      - Using unsplash.it URLs
      - Creating Card, Button, or other reusable components separately 
      - Extracting logic into helper components
      - Using multiple function declarations
      - If a reusable component is generated, set the variables for default values
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent([systemPrompt, userPrompt]);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();

    let data;
    
    try {
      data = JSON.parse(cleaned);
      
      // Post-process to replace any broken Unsplash URLs
      if (data.code) {
        data.code = data.code
          .replace(/source\.unsplash\.com\/[^"'\s]+/g, 'picsum.photos/400/300')
          .replace(/unsplash\.it\/[^"'\s]+/g, 'picsum.photos/400/300')
          .replace(/images\.unsplash\.com\/[^"'\s]+/g, 'picsum.photos/400/300');
      }
    } catch (err) {
      console.error("Failed to parse Gemini JSON:", err, cleaned);
      data = { chatMsg: "Generation failed", code: "" };
    }

    console.log("data", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { chatMsg: "Error generating component", code: "" },
      { status: 500 }
    );
  }
}