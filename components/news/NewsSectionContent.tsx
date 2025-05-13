import { fetchNews } from "@/lib/api/news";
import { NewsSection } from "@/components/news/NewsSection";

interface NewsSectionContentProps {
  title: string;
  limit?: number;
}

export async function NewsSectionContent({ title, limit = 3 }: NewsSectionContentProps) {
  const articles = await fetchNews("technology", limit);
  
  return <NewsSection title={title} articles={articles} />;
}