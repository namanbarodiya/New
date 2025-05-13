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
import { getAIAnswer } from "@/lib/api/openai"; // 👈 Your real AI query function

interface AskAIDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: NewsArticle;
}

export function AskAIDialog({ open, onOpenChange, article }: AskAIDialogProps) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    setAnswer("");
    setError("");

    try {
      const response = await getAIAnswer(question, article.content);

      if (response.success) {
        setAnswer(response.data?.answer || "No answer generated.");
      } else {
        setError(response.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("AI response error:", err);
      setError("Sorry, we couldn't process your question at the moment.");
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
            Ask questions about "{article.title}" and get AI-powered answers.
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

          {error && (
            <div className="mt-4 text-sm text-red-500">
              {error}
            </div>
          )}

          {answer && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Answer:</h4>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm whitespace-pre-line">{answer}</p>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
