// src/lib/redux/apiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article } from '@/components/dashboard/ContentCard';

// --- TYPE DEFINITIONS for different API responses ---

// For GNews API
interface GNewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}
interface GNewsApiResponse {
  totalArticles: number;
  articles: GNewsArticle[];
}

// For TMDB API
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
}
interface TmdbApiResponse {
  results: Movie[];
}

// For our Mock Social Post
interface SocialPost {
    id: string;
    username: string;
    avatarUrl: string;
    postText: string;
    timestamp: string;
}

// --- API KEYS from environment variables ---
const GNEWS_API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY;
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// --- API SLICE DEFINITION ---

export const apiSlice = createApi({
  reducerPath: 'api',
  // We set a baseQuery here, but we can override it in specific endpoints
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), 
  
  endpoints: (builder) => ({
    
    // 1. GNEWS ENDPOINT
    getNews: builder.query<Article[], string>({
      query: (searchTerm = 'general') => ({
        url: `https://gnews.io/api/v4/everything?q=${searchTerm}&lang=en&apikey=${GNEWS_API_KEY}`,
        method: 'GET',
      }),
      transformResponse: (response: GNewsApiResponse): Article[] => {
        return response.articles.map(article => ({
          title: article.title,
          description: article.description,
          urlToImage: article.image,
          url: article.url,
          publishedAt: article.publishedAt,
          source: { id: 'gnews', name: article.source.name },
          author: article.source.name,
          content: article.content,
        }));
      },
    }),

    // 2. TMDB ENDPOINT
    getPopularMovies: builder.query<Article[], void>({
      query: () => ({
        url: `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
      }),
      transformResponse: (response: TmdbApiResponse): Article[] => {
        return response.results.map(movie => ({
          title: movie.title,
          description: movie.overview,
          urlToImage: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          publishedAt: movie.release_date,
          source: { id: 'tmdb', name: 'The Movie Database' },
          author: 'TMDB',
          content: movie.overview,
        }));
      },
    }),

    // 3. MOCK SOCIAL MEDIA ENDPOINT
    getSocialPosts: builder.query<Article[], void>({
      // We use `queryFn` for custom logic, perfect for mocks.
      queryFn: async () => {
        // Simulate a network delay
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        const mockData: SocialPost[] = [
          { id: '1', username: 'devInsights', avatarUrl: 'https://placehold.co/100x100/7c3aed/ffffff?text=DI', postText: 'Just shipped a new feature using Next.js 14 and RTK Query. The developer experience is amazing! #webdev', timestamp: new Date().toISOString() },
          { id: '2', username: 'reactFan', avatarUrl: 'https://placehold.co/100x100/1d4ed8/ffffff?text=RF', postText: 'What are your favorite custom hooks? Looking for inspiration for my new project.', timestamp: new Date().toISOString() },
        ];

        // Transform the mock data to fit the Article interface
        const transformedData: Article[] = mockData.map(post => ({
            title: `Post by @${post.username}`,
            description: post.postText,
            urlToImage: post.avatarUrl,
            url: '#', // Social posts might not have a dedicated URL
            publishedAt: post.timestamp,
            source: { id: 'social', name: 'Social Feed' },
            author: `@${post.username}`,
            content: post.postText,
        }));

        return { data: transformedData };
      }
    }),

  }),
});

// Export the new hooks
export const { 
  useGetNewsQuery, 
  useGetPopularMoviesQuery, 
  useGetSocialPostsQuery 
} = apiSlice;
