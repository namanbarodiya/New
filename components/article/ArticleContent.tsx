"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { NewsArticle } from "@/types/news";

interface AskAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: NewsArticle;
}

export function AskAIDialog({ open, onOpenChange, article }: AskAIDialogProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      const prompt = `Based on this article titled "${article.title}", answer the following question:\n\nArticle Content:\n${article.content}\n\nQuestion:\n${question}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${AIzaSyB4KLI31l6SBCWzGOLQC2FiueRcIyzFDlc}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        setAnswer(data.candidates[0].content.parts[0].text);
      } else {
        setAnswer("Sorry, I couldn't find a good answer. Please try again.");
      }
    } catch (error) {
      console.error("Failed to get AI response:", error);
      setAnswer("Sorry, I couldn't process your question at this time. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ask AI about this article</DialogTitle>
          <DialogDescription>
            Ask questions about "{article.title}" and get AI-powered answers
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask your question about the article..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          
          <div className="flex justify-end">
            <Button type="submit" disabled={loading || !question.trim()}>
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Thinking..." : "Ask AI"}
            </Button>
          </div>

          {answer && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Answer:</h4>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{answer}</p>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
