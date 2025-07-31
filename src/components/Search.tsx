'use client';

import React, { useState } from 'react';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup, CommandEmpty } from '@/components/ui/command';
import useDebounce from '@/hooks/useDebounce'; // Assuming you have this custom hook
import { useGetNewsQuery } from '@/lib/redux/apiSlice';

const Search = () => {
  const [query, setQuery] = useState('');
  // 1. Debounce the search query. The API will only be called 400ms after the user stops typing.
  const debouncedQuery = useDebounce(query, 400);
  
  // 2. The hook is now skipped if there's no search term, preventing unnecessary API calls.
  const { data, isLoading } = useGetNewsQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });
  const articles = data ?? [];

  return (
    <Command className="rounded-lg border shadow-sm">
      <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Search across all content..."
      />
      {/* 3. The results list only appears when the user is actively searching. */}
      {query && (
        <CommandList>
          {isLoading && <CommandItem>Searching...</CommandItem>}
          <CommandEmpty>No results found for "{query}".</CommandEmpty>
          {(articles.length > 0 && !isLoading) && (
            <CommandGroup heading="Top Results">
              {articles.slice(0, 7).map((article) => (
                <CommandItem 
                  key={article.url} 
                  onSelect={() => window.open(article.url, '_blank')}
                  className="cursor-pointer"
                >
                  <span className="line-clamp-1 text-sm">{article.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default Search;
