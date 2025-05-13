"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface ArticleCommentsProps {
  articleId: string;
}

export function ArticleComments({ articleId }: ArticleCommentsProps) {
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Comments</h2>
      </div>

      <div className="space-y-4">
        <Textarea
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[100px]"
        />
        <Button className="w-full sm:w-auto">
          Post Comment
        </Button>
      </div>

      <div className="pt-8 space-y-8">
        <p className="text-center text-muted-foreground">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    </div>
  );
}