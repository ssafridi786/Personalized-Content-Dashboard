// src/components/dashboard/ContentFeed.tsx
"use client";

import React, { useState, useMemo } from 'react';
// 1. Import all the new hooks
import { 
  useGetNewsQuery, 
  useGetPopularMoviesQuery, 
  useGetSocialPostsQuery 
} from '@/lib/redux/apiSlice'; 

import { addFavorite, removeFavorite } from '@/lib/redux/favoritesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store'; 
import { ContentCard, Article } from '@/components/dashboard/ContentCard'; 
import PostPagination from '@/components/dashboard/PostPagination';

// New component for displaying API errors
const ApiErrorMessage = ({ isErrorNews, isErrorMovies }: { isErrorNews: boolean, isErrorMovies: boolean }) => {
  if (!isErrorNews && !isErrorMovies) return null;

  const errorMessages = [];
  if (isErrorNews) errorMessages.push("news");
  if (isErrorMovies) errorMessages.push("movies");

  return (
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <span className="font-medium">Error!</span> Failed to load {errorMessages.join(' and ')}. Please ensure API keys are set.
    </div>
  );
};

export function ContentFeed() {
  // 2. Call all three hooks to fetch data in parallel
  const { data: newsData, isLoading: isLoadingNews, isError: isErrorNews } = useGetNewsQuery('general');
  const { data: movieData, isLoading: isLoadingMovies, isError: isErrorMovies } = useGetPopularMoviesQuery();
  const { data: socialData, isLoading: isLoadingSocial, isError: isErrorSocial } = useGetSocialPostsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12; // Show 12 items per page (e.g., 3 rows on a 4-column grid)

  const favoriteArticles = useSelector((state: RootState) => state.favorites.articles);
  const dispatch = useDispatch();

  // --- Logic for handling favorites remains the same ---
  const handleToggleFavorite = (article: Article) => {
    const isCurrentlyFavorite = favoriteArticles.some(fav => fav.url === article.url);
    if (isCurrentlyFavorite) {
      dispatch(removeFavorite(article));
    } else {
      dispatch(addFavorite(article));
    }
  };
  const isArticleFavorite = (articleUrl: string) => favoriteArticles.some(fav => fav.url === articleUrl);

  // 3. Combine and shuffle the data from all sources
  const combinedData = useMemo(() => {
    // Only include data from successful queries
    const news = isErrorNews ? [] : newsData ?? [];
    const movies = isErrorMovies ? [] : movieData ?? [];
    const social = isErrorSocial ? [] : socialData ?? [];

    // Combine all articles into one array and shuffle it for a mixed feed
    return [...news, ...movies, ...social].sort(() => Math.random() - 0.5);
  }, [newsData, movieData, socialData, isErrorNews, isErrorMovies, isErrorSocial]);

  // 4. Calculate total pages and slice the data for the current page
  const totalPages = Math.ceil(combinedData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return combinedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [combinedData, currentPage]);

  // 5. Handler to change the current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to top on page change
  };

  // --- Render UI based on loading and error states ---
  const isLoading = isLoadingNews || isLoadingMovies || isLoadingSocial;

  if (isLoading && combinedData.length === 0) {
    return <div className="p-4">Loading your personalized feed...</div>;
  }

  if (combinedData.length === 0) {
    return (
        <div className="p-4">
            <ApiErrorMessage isErrorNews={isErrorNews} isErrorMovies={isErrorMovies} />
            No content found.
        </div>
    );
  }
  
  return (
    <>
      <ApiErrorMessage isErrorNews={isErrorNews} isErrorMovies={isErrorMovies} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {paginatedData.map((article: Article) => (
          <ContentCard
            key={article.url + article.title} // Create a more unique key
            article={article}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isArticleFavorite(article.url)}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <PostPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
  </>
    );
}

export default ContentFeed;