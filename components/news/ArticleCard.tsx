"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { NewsArticle } from "@/types/news";
import { AISummaryContent } from "@/components/ai/AISummaryContent";

interface ArticleCardProps {
  article: NewsArticle;
  variant?: "default" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  
  const defaultImage = "https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg";
  
  if (variant === "compact") {
    return (
      <div className="flex flex-col group rounded-lg overflow-hidden border transition-all hover:shadow-md">
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={article.urlToImage || defaultImage}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col p-4 flex-grow">
          <Link href={`/article/${article.id}`}>
            <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
              {article.title}
            </h3>
          </Link>
          <div className="flex justify-between mt-auto pt-2">
            <Button size="sm" variant="ghost" className="px-0" onClick={() => setSummaryOpen(true)}>
              Quick Summary
            </Button>
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/article/${article.id}`}>Read</Link>
            </Button>
          </div>
        </div>
        
        <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>AI Summary</DialogTitle>
            </DialogHeader>
            <AISummaryContent articleId={article.id} articleTitle={article.title} />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col group rounded-lg overflow-hidden border transition-all hover:shadow-md">
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <Image
          src={article.urlToImage || defaultImage}
          alt={article.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col p-5 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar className="mr-1 h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        <Link href={`/article/${article.id}`}>
          <h3 className="text-xl font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-3 mb-4 text-sm">
          {article.description || "Read the full article for more details."}
        </p>
        <div className="flex justify-between mt-auto">
          <Button variant="outline" onClick={() => setSummaryOpen(true)}>
            Quick Summary
          </Button>
          <Button asChild>
            <Link href={`/article/${article.id}`} className="flex items-center gap-1">
              Read
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Summary</DialogTitle>
          </DialogHeader>
          <AISummaryContent articleId={article.id} articleTitle={article.title} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function ArticleCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="flex flex-col rounded-lg overflow-hidden border">
        <Skeleton className="h-32 w-full" />
        <div className="p-4">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-3/4 mb-4" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col rounded-lg overflow-hidden border">
      <Skeleton className="h-48 md:h-56 w-full" />
      <div className="p-5">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}