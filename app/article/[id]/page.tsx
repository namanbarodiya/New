import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticleById, fetchNews } from "@/lib/api/news";
import { ArticleContent } from "@/components/article/ArticleContent";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata(
  { params }: ArticlePageProps
): Promise<Metadata> {
  const article = await fetchArticleById(params.id);
  
  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }
  
  return {
    title: article.title,
    description: article.description || "Read the full article on ETCIO.com",
  };
}

export async function generateStaticParams() {
  try {
    const articles = await fetchNews('technology', 100);
    
    if (!articles || !Array.isArray(articles)) {
      console.warn('No articles found or invalid data returned');
      return [];
    }
    
    return articles.map((article) => ({
      id: article.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticleById(params.id);
  
  if (!article) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleContent article={article} />
    </div>
  );
}