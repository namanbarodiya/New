// lib/api/gemini.ts
export async function askQuestion(
  question: string,
  title: string,
  content: string
): Promise<{ success: boolean; data?: { answer: string }; error?: string }> {
  const API_KEY = "AIzaSyB4KLI31l6SBCWzGOLQC2FiueRcIyzFDlc";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Answer the following question based on this news article:\n\nTitle: ${title}\n\nContent: ${content}\n\nQuestion: ${question}`,
              },
            ],
          },
        ],
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return { success: false, error: data.error.message };
    }

    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return {
      success: true,
      data: { answer: answer || "AI could not generate an answer." },
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { success: false, error: "Request to AI failed." };
  }
}
