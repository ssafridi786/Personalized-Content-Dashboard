"use client";
import React, { useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';
// 1. Import shadcn/ui components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// The Article interface remains the same
export interface Article {
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

interface ContentCardProps {
  article: Article;
  onToggleFavorite: (article: Article) => void;
  isFavorite: boolean;
}

const FALLBACK_IMAGE_URL = 'https://placehold.co/600x400/020617/ffffff.png?text=News';

export const ContentCard: React.FC<ContentCardProps> = ({ article, onToggleFavorite, isFavorite }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    // Use a flex container to ensure consistent height and proper spacing
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg dark:border-slate-700 group dark:bg-slate-900">
      
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          src={imageError || !article.urlToImage ? FALLBACK_IMAGE_URL : article.urlToImage}
          alt={article.title}
          onError={handleImageError}
        />
        <div className="absolute top-3 right-3">
          {/* Favorite icon with improved styling */}
          <Button
            size="icon"
            onClick={() => onToggleFavorite(article)}
            className={`rounded-full h-9 w-9 transition-colors duration-200 ${
              isFavorite 
                ? 'bg-yellow-400 text-white hover:bg-yellow-500' 
                : 'bg-black/50 text-white hover:bg-yellow-400'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Card content with improved padding and spacing */}
      <div className="flex flex-col flex-grow p-4">
        <CardHeader className="p-2 mb-2">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            {article.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {article.description || 'No description available.'}
          </p>
        </CardContent>

        {/* Card footer with a well-aligned, visible button */}
        <CardFooter className="p-0 pt-4 mt-auto">
          <Button asChild className=" w-full rounded-md bg-slate-800 text-white transition-colors hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
              Read More
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ContentCard;