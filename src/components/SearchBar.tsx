'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { PopularSearch, SearchResult } from '@/types';

const popularSearches: PopularSearch[] = [
  { name: 'Valley of Flowers Trek', location: 'Uttarakhand' },
  { name: 'Kedarkantha Summit', location: 'Uttarakhand' },
  { name: 'Hampta Pass', location: 'Himachal Pradesh' },
  { name: 'Brahmatal Trek', location: 'Uttarakhand' },
];

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Replace with actual API call
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch search results');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <div 
        className={`relative transition-all duration-300 ${
          isFocused ? 'transform -translate-y-1' : ''
        }`}
      >
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for treks, locations, or experiences..."
          className="w-full px-6 py-4 pl-14 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md
            text-white placeholder-white/70 focus:border-white/30 focus:ring-4 focus:ring-white/10
            outline-none transition-all duration-300 text-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          aria-label="Search treks and destinations"
        />
        <MagnifyingGlassIcon 
          className={`h-6 w-6 absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${isFocused ? 'text-white' : 'text-white/70'}`}
          aria-hidden="true"
        />
      </div>

      <div 
        className={`absolute mt-2 inset-x-0 bg-white rounded-xl shadow-lg border border-gray-100 
          divide-y divide-gray-100 transform transition-all duration-300 origin-top
          ${isFocused ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        role="dialog"
        aria-label="Search results"
      >
        <div className="p-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="h-6 w-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-red-600 text-sm px-3 py-2">{error}</div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg group transition-colors"
                >
                  <span className="flex-grow">{result.title}</span>
                  <span className="flex items-center text-gray-400 group-hover:text-gray-600">
                    <MapPinIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                    {result.location}
                  </span>
                </button>
              ))}
            </div>
          ) : query ? (
            <div className="text-gray-500 text-sm px-3 py-2">No results found</div>
          ) : (
            <>
              <div className="text-xs font-medium text-gray-500 px-3 mb-2">Popular Searches</div>
              <div className="space-y-1">
                {popularSearches.map((item) => (
                  <button
                    key={item.name}
                    className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg group transition-colors"
                    onClick={() => {
                      setQuery(item.name);
                      handleSearch(item.name);
                    }}
                  >
                    <span className="flex-grow">{item.name}</span>
                    <span className="flex items-center text-gray-400 group-hover:text-gray-600">
                      <MapPinIcon className="h-4 w-4 mr-1" aria-hidden="true" />
                      {item.location}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
