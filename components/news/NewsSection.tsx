import { BadgePlus, Sparkles, Star } from "lucide-react";
import { NewsArticle, NewsSectionProps } from "@/types/news";
import { ArticleCard, ArticleCardSkeleton } from "@/components/news/ArticleCard";

export function NewsSection({ title, articles, icon }: NewsSectionProps) {
  const sectionIcons = {
    "For You": <BadgePlus className="h-5 w-5" />,
    "Trending in Your Industry": <Sparkles className="h-5 w-5" />,
    "Editor's Top 5 Picks": <Star className="h-5 w-5" />,
  };

  const displayIcon = icon || sectionIcons[title as keyof typeof sectionIcons] || null;
  const isCompact = title === "Editor's Top 5 Picks";

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        {displayIcon && <span className="text-primary">{displayIcon}</span>}
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            variant={isCompact ? "compact" : "default"}
          />
        ))}
      </div>
    </section>
  );
}

export function NewsSectionSkeleton({ count = 3, isCompact = false }: { count?: number; isCompact?: boolean }) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-5 w-5 rounded-full bg-muted"></div>
        <div className="h-8 w-48 rounded-md bg-muted"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(count).fill(0).map((_, i) => (
          <ArticleCardSkeleton key={i} variant={isCompact ? "compact" : "default"} />
        ))}
      </div>
    </section>
  );
}