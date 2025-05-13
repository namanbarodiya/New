"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { generateSummary } from "@/lib/api/openai";

interface AISummaryContentProps {
  articleId: string;
  articleTitle: string;
  articleContent?: string; // Add this to receive full content
}

export function AISummaryContent({
  articleId,
  articleTitle,
  articleContent,
}: AISummaryContentProps) {
  const [loading, setLoading] = useState(true);
  const [bulletPoints, setBulletPoints] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const cacheKey = `summary-${articleId}`;
        const cachedSummary = localStorage.getItem(cacheKey);

        if (cachedSummary) {
          setBulletPoints(JSON.parse(cachedSummary));
          setLoading(false);
          return;
        }

        const response = await generateSummary(articleTitle, articleContent);

        if (response.success) {
          setBulletPoints(response.data.summary);
          localStorage.setItem(cacheKey, JSON.stringify(response.data.summary));
        } else {
          setError(response.error || "Failed to generate summary");
        }
      } catch (err) {
        setError("An error occurred while generating the summary");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, [articleId, articleTitle, articleContent]);

  if (loading) {
    return (
      <div className="py-4">
        <p className="text-sm text-muted-foreground mb-4">Generating summary...</p>
        <div className="space-y-3">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex items-start gap-2">
              <Skeleton className="h-5 w-5 rounded-full mt-1" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4">
        <p className="text-red-500">Error: {error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try again later or contact support if this issue persists.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <p className="text-sm text-muted-foreground mb-4">
        Here's a quick summary of the key points from this article:
      </p>
      <ul className="space-y-3">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
