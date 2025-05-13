"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNews } from "@/lib/api/news";
import { NewsArticle } from "@/types/news";

interface RecommendedArticlesProps {
  currentArticleId: string;
}

export function RecommendedArticles({ currentArticleId }: RecommendedArticlesProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadRecommendedArticles() {
      try {
        const allArticles = await fetchNews("technology", 10);
        const filteredArticles = allArticles
          .filter(article => article.id !== currentArticleId)
          .slice(0, 3);
        setArticles(filteredArticles);
      } catch (error) {
        console.error("Error loading recommended articles:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRecommendedArticles();
  }, [currentArticleId]);
  
  if (loading) {
    return <RecommendedArticlesSkeleton />;
  }
  
  if (articles.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recommended Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="flex flex-col border rounded-lg overflow-hidden group hover:shadow-md transition-all">
            <div className="relative h-36 overflow-hidden">
              <Image
                src={article.urlToImage || "https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg"}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <Link href={`/article/${article.id}`}>
                <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.description}
              </p>
              <div className="mt-auto">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href={`/article/${article.id}`} className="flex items-center justify-center">
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedArticlesSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col border rounded-lg overflow-hidden">
            <Skeleton className="h-36 w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-full mb-2" />
              <Skeleton className="h-5 w-4/5 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-3" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}