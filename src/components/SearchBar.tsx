'use client';

import { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { PopularSearch, SearchResult } from '@/types';
import Link from 'next/link';
import Image from 'next/image';

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
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error('Search error:', err);
      setResults([]);
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
      <div className={`relative transition-all duration-300 ${
        isFocused ? 'transform -translate-y-1' : ''
      }`}>
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
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isLoading && (
            <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          )}
        </div>
        <MagnifyingGlassIcon 
          className={`h-6 w-6 absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? 'text-white' : 'text-white/70'
          }`}
          aria-hidden="true"
        />
      </div>

      {/* Search Results */}
      {(isFocused && query) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-96 overflow-y-auto">
          {error ? (
            <div className="p-4 text-red-600 text-sm">{error}</div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  className="flex items-start p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={result.imageUrl}
                      alt={result.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{result.title}</h4>
                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {result.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length > 0 && !isLoading ? (
            <div className="p-4 text-gray-500 text-sm">No results found</div>
          ) : null}

          {/* Popular Searches */}
          {!query && (
            <div className="p-4">
              <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Popular Searches</h3>
              <div className="space-y-2">
                {popularSearches.map((search) => (
                  <button
                    key={search.name}
                    onClick={() => {
                      setQuery(search.name);
                      handleSearch(search.name);
                    }}
                    className="block w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm font-medium text-gray-900">{search.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{search.location}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
