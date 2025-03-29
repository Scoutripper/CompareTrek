'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Sample blog posts data (in a real app, this would come from an API or database)
const blogPosts = [
  {
    id: 1,
    title: 'Essential Gear for High-Altitude Trekking',
    content: `High-altitude trekking requires careful preparation and the right equipment. In this comprehensive guide, we'll cover everything you need to know about gearing up for your high-altitude adventure.

    Essential Clothing:
    • Base layers: Merino wool or synthetic moisture-wicking materials
    • Insulating layers: Fleece and down jackets
    • Outer shell: Waterproof and breathable jacket and pants
    • Hiking pants: Convertible, quick-drying pants
    • Accessories: Warm hat, sun hat, gloves, and neck gaiter

    Footwear:
    • Waterproof hiking boots with good ankle support
    • Thick trekking socks (multiple pairs)
    • Camp shoes or sandals for rest periods

    Backpack and Storage:
    • 40-60L backpack with rain cover
    • Dry bags for electronics and clothes
    • Compression sacks for sleeping bag and down jacket

    Sleeping Gear:
    • -10°C to -20°C rated sleeping bag
    • Sleeping bag liner for extra warmth
    • Insulated sleeping pad

    Safety Equipment:
    • First aid kit with altitude sickness medication
    • Emergency shelter
    • Headlamp with extra batteries
    • Multi-tool or knife
    • Emergency whistle

    Remember to test all your gear before the trek and ensure everything fits properly. Quality gear might be expensive, but it's an investment in your safety and comfort at high altitudes.`,
    excerpt: 'A comprehensive guide to the gear you need for trekking in high altitude regions.',
    category: 'gear',
    author: 'Rahul Sharma',
    authorRole: 'Senior Trek Leader',
    authorImage: '/images/team/rahul.jpg',
    date: '2024-03-15',
    readTime: '8 min read',
    image: '/images/treks/gear-guide.jpg',
    tags: ['Gear', 'High Altitude', 'Safety', 'Equipment'],
  },
  // Add more blog posts as needed
];

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const currentPost = blogPosts.find((p) => p.id === Number(params.id));
    if (currentPost) {
      setPost(currentPost);
      // Find related posts (same category, excluding current post)
      const related = blogPosts
        .filter((p) => p.category === currentPost.category && p.id !== currentPost.id)
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
              </div>
            </div>
            <div className="text-gray-500">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-gray max-w-none mb-16"
        >
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-gray-200 pt-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Share this article</h2>
          <div className="flex space-x-4">
            <button className="bg-[#1DA1F2] text-white px-4 py-2 rounded-lg hover:bg-[#1a91da] transition-colors">
              Twitter
            </button>
            <button className="bg-[#4267B2] text-white px-4 py-2 rounded-lg hover:bg-[#365899] transition-colors">
              Facebook
            </button>
            <button className="bg-[#0077B5] text-white px-4 py-2 rounded-lg hover:bg-[#006399] transition-colors">
              LinkedIn
            </button>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="border-t border-gray-200 pt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="group">
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#85d4d6] transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </main>
  );
} 