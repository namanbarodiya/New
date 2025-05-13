import { AIResponse } from "@/types/news";

const GEMINI_API_KEY = "AIzaSyB4KLI31l6SBCWzGOLQC2FiueRcIyzFDlc";
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

async function fetchGeminiResponse(prompt: string): Promise<string> {
  const res = await fetch(GEMINI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
}

export async function generateSummary(articleTitle: string, articleContent?: string): Promise<AIResponse> {
  try {
    const prompt = `You are an expert AI assistant embedded in a tech news platform.
    
Please summarize this article in 4 bullet points, focusing on:
- Major updates or announcements
- Strategic implications
- Market impact
- Key technologies

Article Title: ${articleTitle}
Article Content: ${articleContent || articleTitle}

Format the response as clean bullet points without any prefixes or headers.`;

    const response = await fetchGeminiResponse(prompt);
    const bulletPoints = response
      .split('\n')
      .map(point => point.trim())
      .filter(point => point.length > 0);

    return {
      success: true,
      data: {
        summary: bulletPoints,
      },
    };
  } catch (error) {
    console.error('Error generating summary:', error);
    return {
      success: false,
      error: 'Failed to generate summary',
    };
  }
}

export async function askQuestion(question: string, articleTitle: string, articleContent?: string): Promise<AIResponse> {
  try {
    const prompt = `You are an expert AI assistant embedded in a tech news platform.
    
Please answer this question based on the article content:

Article Title: ${articleTitle}
Article Content: ${articleContent || articleTitle}

Question: ${question}

Provide a clear, concise answer based only on the information available in the article.`;

    const response = await fetchGeminiResponse(prompt);

    return {
      success: true,
      data: {
        answer: response,
      },
    };
  } catch (error) {
    console.error('Error answering question:', error);
    return {
      success: false,
      error: 'Failed to generate answer',
    };
  }
}