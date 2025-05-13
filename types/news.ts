export interface NewsArticle {
  id: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export type NewsCategory = 
  | "technology" 
  | "business" 
  | "science";

export interface NewsSectionProps {
  title: string;
  articles: NewsArticle[];
  icon?: React.ReactNode;
}

// For AI-related features
export interface AISummary {
  id: string;
  articleId: string;
  bulletPoints: string[];
  createdAt: string;
}

export interface AIQuestion {
  id: string;
  articleId: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  text: string;
  selectedText?: string;
  selectedPosition?: {
    start: number;
    end: number;
  };
  reactions: {
    like: number;
    thinking: number;
    clap: number;
  };
  createdAt: string;
}