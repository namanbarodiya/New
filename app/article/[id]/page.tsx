import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchArticleById, fetchNews } from "@/lib/api/news";
import { ArticleContent } from "@/components/article/ArticleContent";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

// Generate metadata for SEO
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
    description: article.description ?? "Read the full article on ETCIO.com",
  };
}

// Static generation for static export compatibility
export async function generateStaticParams() {
  try {
    const articles = await fetchNews("technology", 100);

    if (!Array.isArray(articles)) {
      console.warn("Expected array of articles, got:", articles);
      return [];
    }

    const staticParams = articles
      .filter((article) => article?.id)
      .flatMap((article) => {
        const idStr = String(article.id);
        return [{ id: idStr }, { id: `article-${idStr}` }];
      });

    // Ensure unique params
    const uniqueParams = Array.from(
      new Set(staticParams.map((param) => JSON.stringify(param)))
    ).map((str) => JSON.parse(str));

    // Optionally include any manually added slugs
    uniqueParams.push({ id: "article-0" });

    return uniqueParams;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// Actual article page
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
