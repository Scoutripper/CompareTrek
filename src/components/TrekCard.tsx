'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { Trek } from '@/types';

interface TrekCardProps extends Trek {
  onLike?: (id: string) => Promise<void>;
}

export default function TrekCard({
  id,
  title,
  location,
  imageUrl,
  rating,
  reviewCount,
  likes,
  isLiked = false,
  onLike,
}: TrekCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!onLike) return;

    setIsLoading(true);
    setError(null);
    try {
      await onLike(id);
    } catch (err) {
      setError('Failed to update like status');
      console.error('Error liking trek:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/treks/${id}`} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} trek in ${location}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder-trek.jpg';
          }}
        />
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
          onClick={handleLike}
          disabled={isLoading}
          aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-gray-300 border-t-primary-600 rounded-full animate-spin" />
          ) : isLiked ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
        {error && (
          <div className="absolute bottom-3 left-3 right-3 bg-red-100 text-red-700 text-sm px-3 py-1 rounded-lg">
            {error}
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/treks/${id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3">{location}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <StarSolidIcon className="h-4 w-4 text-yellow-400" aria-hidden="true" />
            <span className="text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <HeartSolidIcon className="h-4 w-4 text-red-500 mr-1" aria-hidden="true" />
            {likes}
          </div>
        </div>
      </div>
    </div>
  );
}
