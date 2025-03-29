'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Posts' },
  { id: 'guides', name: 'Trek Guides' },
  { id: 'tips', name: 'Tips & Advice' },
  { id: 'gear', name: 'Gear Reviews' },
  { id: 'stories', name: 'Trek Stories' },
  { id: 'destinations', name: 'Destinations' },
];

const blogPosts = [
  {
    id: 1,
    title: 'Essential Gear for High-Altitude Trekking',
    excerpt: 'A comprehensive guide to the gear you need for trekking in high altitude regions.',
    category: 'gear',
    author: 'Rahul Sharma',
    date: '2024-03-15',
    readTime: '8 min read',
    image: '/images/treks/gear-guide.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Best Time to Visit Valley of Flowers',
    excerpt: 'Learn about the perfect timing and conditions for the Valley of Flowers trek.',
    category: 'guides',
    author: 'Priya Patel',
    date: '2024-03-12',
    readTime: '6 min read',
    image: '/images/treks/valley-of-flowers.jpg',
  },
  {
    id: 3,
    title: 'Understanding Altitude Sickness',
    excerpt: 'Everything you need to know about altitude sickness and how to prevent it.',
    category: 'tips',
    author: 'Dr. Amit Kumar',
    date: '2024-03-10',
    readTime: '10 min read',
    image: '/images/treks/altitude-sickness.jpg',
  },
  {
    id: 4,
    title: 'Top 5 Winter Treks in India',
    excerpt: 'Discover the most beautiful winter treks in the Indian Himalayas.',
    category: 'destinations',
    author: 'Sneha Gupta',
    date: '2024-03-08',
    readTime: '7 min read',
    image: '/images/treks/winter-trek.jpg',
  },
  {
    id: 5,
    title: 'My Solo Trek to Hampta Pass',
    excerpt: 'A personal account of conquering Hampta Pass and the lessons learned.',
    category: 'stories',
    author: 'Arjun Reddy',
    date: '2024-03-05',
    readTime: '12 min read',
    image: '/images/treks/hampta-pass.jpg',
  },
  {
    id: 6,
    title: 'Choosing the Right Trekking Shoes',
    excerpt: 'A detailed guide to selecting the perfect trekking shoes for different terrains.',
    category: 'gear',
    author: 'Rahul Sharma',
    date: '2024-03-02',
    readTime: '9 min read',
    image: '/images/treks/trekking-shoes.jpg',
  },
  {
    id: 7,
    title: 'Monsoon Trekking: Tips and Precautions',
    excerpt: 'Essential tips for safe and enjoyable trekking during the monsoon season.',
    category: 'tips',
    author: 'Priya Patel',
    date: '2024-02-28',
    readTime: '8 min read',
    image: '/images/treks/monsoon-trek.jpg',
  },
  {
    id: 8,
    title: 'Hidden Gems: Lesser-Known Treks',
    excerpt: 'Explore these beautiful but less crowded trekking destinations.',
    category: 'destinations',
    author: 'Sneha Gupta',
    date: '2024-02-25',
    readTime: '11 min read',
    image: '/images/treks/hidden-gems.jpg',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trek Tales & Tips
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Stories, guides, and insights from the trekking community
          </motion.p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-16"
          >
            <Link href={`/blog/${featuredPost.id}`}>
              <div className="relative h-[500px] rounded-2xl overflow-hidden group">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#85d4d6] text-sm font-medium mb-4">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-200 mb-4">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-sm">
                    <span>{featuredPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Categories and Search */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#85d4d6] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-4 py-2 rounded-lg border-gray-300 focus:border-[#85d4d6] focus:ring-[#85d4d6]"
              />
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#85d4d6] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{post.author}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No posts found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
} 