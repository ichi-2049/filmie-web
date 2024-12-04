'use client'

import React, { useState, useCallback, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { MoviesInfiniteList } from '@/features/movie/components/MovieList';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 500);
  }, []);

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Input 
          type="text" 
          placeholder="映画を検索..." 
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>
      <MoviesInfiniteList searchQuery={debouncedQuery} />
    </main>
  );
}