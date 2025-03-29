'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Sample trek data (replace with actual data from your API)
const treks = [
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
  {
    id: 3,
    title: 'Kedarkantha Summit',
    location: 'Uttarakhand',
    duration: '6 days',
    difficulty: 'Easy-Moderate',
    price: 10999,
    image: '/images/trek3.jpg',
    rating: 4.9,
    reviews: 156,
  },
  // Add more treks here
];

const difficultyColors = {
  'Easy': 'bg-green-100 text-green-800',
  'Easy-Moderate': 'bg-blue-100 text-blue-800',
  'Moderate': 'bg-yellow-100 text-yellow-800',
  'Difficult': 'bg-red-100 text-red-800',
};

export default function TreksPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreks = treks.filter(trek => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        trek.title.toLowerCase().includes(query) ||
        trek.location.toLowerCase().includes(query)
      );
    }
    if (selectedFilter === 'all') return true;
    return trek.difficulty.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Discover Amazing Treks
            </h1>
            <p className="mt-4 text-xl text-gray-300">
              Explore the most beautiful trails across India
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-md ${
                selectedFilter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            {Object.keys(difficultyColors).map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedFilter(difficulty)}
                className={`px-4 py-2 rounded-md ${
                  selectedFilter === difficulty
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search treks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Trek Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTreks.map((trek, index) => (
            <motion.div
              key={trek.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/treks/${trek.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={trek.image}
                      alt={trek.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900">
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
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 