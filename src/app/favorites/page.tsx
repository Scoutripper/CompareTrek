'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline';

// Sample favorite treks (replace with actual data from your API/localStorage)
const sampleFavorites = [
  {
    id: 1,
    title: 'Valley of Flowers Trek',
    location: 'Uttarakhand',
    duration: '6 days',
    difficulty: 'Moderate',
    price: 12999,
    image: '/images/trek1.jpg',
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 2,
    title: 'Hampta Pass Trek',
    location: 'Himachal Pradesh',
    duration: '5 days',
    difficulty: 'Moderate',
    price: 11999,
    image: '/images/trek2.jpg',
    rating: 4.7,
    reviews: 98,
  },
];

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800',
  'Easy-Moderate': 'bg-blue-100 text-blue-800',
  'Moderate': 'bg-yellow-100 text-yellow-800',
  'Difficult': 'bg-red-100 text-red-800',
};

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(sampleFavorites);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch actual favorites from API/localStorage
    setIsLoading(false);
  }, []);

  const removeFavorite = (trekId: number) => {
    setFavorites(prev => prev.filter(trek => trek.id !== trekId));
    // TODO: Update API/localStorage
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Your Favorite Treks
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Keep track of the treks you're interested in
            </p>
          </div>
        </div>
      </div>

      {/* Favorites List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <HeartOutline className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
            <p className="text-gray-600 mb-6">
              Start exploring treks and add them to your favorites
            </p>
            <Link
              href="/treks"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              Explore Treks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((trek, index) => (
              <motion.div
                key={trek.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={trek.image}
                      alt={trek.title}
                      fill
                      className="object-cover"
                    />
                    <button
                      onClick={() => removeFavorite(trek.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <HeartSolid className="h-6 w-6 text-red-500" />
                    </button>
                  </div>
                  <div className="p-6">
                    <Link href={`/treks/${trek.id}`}>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                          {trek.title}
                        </h3>
                        <span className="text-lg font-bold text-primary-600">
                          ₹{trek.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{trek.location}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-600">{trek.duration}</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          difficultyColors[trek.difficulty as keyof typeof difficultyColors]
                        }`}>
                          {trek.difficulty}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(trek.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 15.585l-6.327 3.89 1.42-7.897L.222 6.974l7.947-1.194L10 0l1.831 5.78 7.947 1.194-4.871 4.604 1.42 7.897L10 15.585z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          ({trek.reviews} reviews)
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 