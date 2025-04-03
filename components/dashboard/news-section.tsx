"use client";

import { useSelector } from "react-redux";
import { ExternalLink, Loader2 } from "lucide-react";
import type { RootState } from "@/lib/redux/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export function NewsSection() {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="max-sm:text-xl">Crypto News</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6 sm:gap-4 relative">
        {loading && (
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && <p className="text-destructive">Failed to load news data</p>}

        {data &&
          data.slice(0, 5).map((article) => (
            <Link
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-lg hover:bg-muted"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-medium line-clamp-2 sm:text-base text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  <span className="mr-2">{article.source}</span>
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </p>
                 
                </div>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
      </CardContent>
    </Card>
  );
}
