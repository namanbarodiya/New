"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Calendar, User, Clock, Share2, MessageSquare, ThumbsUp, Lightbulb, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewsArticle } from "@/types/news";
import { formatDistanceToNow } from "date-fns";
import { AISummaryContent } from "@/components/ai/AISummaryContent";
import { AskAIDialog } from "@/components/ai/AskAIDialog";
import { ArticleComments } from "@/components/comments/ArticleComments";
import { RecommendedArticles } from "@/components/article/RecommendedArticles";

interface ArticleContentProps {
  article: NewsArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [askAIOpen, setAskAIOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("article");
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  
  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  const defaultImage = "https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg";

  // Generate a longer content for demo purposes if the API content is too short
  const fullContent = article.content || article.description || "No content available.";
  const expandedContent = fullContent.length < 500 
    ? `${fullContent}\n\n${article.description}\n\nTechnology continues to evolve at a rapid pace, transforming industries and creating new opportunities for innovation. This article explores the latest developments and their impact on businesses and consumers alike.\n\nExperts in the field suggest that these advancements will continue to accelerate, pushing the boundaries of what's possible and challenging traditional business models.\n\n"The future of technology is not just about creating new products, but about reimagining how we live and work," says industry analyst Sarah Johnson.\n\nCompanies that embrace these changes and adapt quickly will likely see significant advantages in the marketplace, while those that resist may find themselves increasingly irrelevant.\n\nAs we look ahead, it's clear that the intersection of artificial intelligence, cloud computing, and data analytics will drive the next wave of technological innovation.`
    : fullContent;
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link href="/technology" className="hover:text-primary">Technology</Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{article.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center">
            <User className="mr-1 h-4 w-4" />
            <span>{article.author || "ETCIO Staff"}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>
        
        <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden mb-6">
          <Image
            src={article.urlToImage || defaultImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <Button variant="outline" size="sm" onClick={() => setSummaryOpen(true)}>
            AI Summary
          </Button>
          <Button variant="outline" size="sm" onClick={() => setAskAIOpen(true)}>
            Ask AI
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-10">
        <TabsList className="mb-6">
          <TabsTrigger value="article">Article</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="article">
          <div className="prose prose-lg max-w-none">
            {expandedContent.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <Separator className="my-8" />
          
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-muted-foreground">
              Was this article helpful?
            </div>
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-1 h-4 w-4" />
                      <span>Like</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like this article</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Lightbulb className="mr-1 h-4 w-4" />
                      <span>Thinking</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This made me think</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Heart className="mr-1 h-4 w-4" />
                      <span>Love</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Love this article</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comments">
          <ArticleComments articleId={article.id} />
        </TabsContent>
      </Tabs>
      
      <Separator className="my-8" />
      
      <RecommendedArticles currentArticleId={article.id} />
      
      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Summary</DialogTitle>
          </DialogHeader>
          <AISummaryContent articleId={article.id} articleTitle={article.title} />
        </DialogContent>
      </Dialog>
      
      <AskAIDialog open={askAIOpen} onOpenChange={setAskAIOpen} article={article} />
    </div>
  );
}