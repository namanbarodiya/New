// lib/api/gemini.ts

const GEMINI_API_KEY = "AIzaSyB4KLI31l6SBCWzGOLQC2FiueRcIyzFDlc";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

export async function generateSummary(articleText: string): Promise<string> {
  try {
    const res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Summarize the following article in 3-4 bullet points:\n\n${articleText}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await res.json();

    const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return summary || "No summary available.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Failed to generate summary.";
  }
}
