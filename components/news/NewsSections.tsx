import { Suspense } from "react";
import { NewsSectionContent } from "@/components/news/NewsSectionContent";
import { NewsSectionSkeleton } from "@/components/news/NewsSection";

export function NewsSections() {
  return (
    <>
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsSectionContent title="For You" limit={3} />
      </Suspense>
      
      <Suspense fallback={<NewsSectionSkeleton />}>
        <NewsSectionContent title="Trending in Your Industry" limit={3} />
      </Suspense>
      
      <Suspense fallback={<NewsSectionSkeleton count={5} isCompact={true} />}>
        <NewsSectionContent title="Editor's Top 5 Picks" limit={5} />
      </Suspense>
    </>
  );
}