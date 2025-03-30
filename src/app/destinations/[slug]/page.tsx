'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import Image from '@/components/ui/Image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ReviewSection from '@/components/ReviewSection';

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

const destinations = {
  'uttarakhand': {
    name: 'Uttarakhand',
    image: '/images/destinations/uttarakhand.jpg',
    bannerImage: '/images/destinations/uttarakhand-banner.jpg',
    description: 'Known as the Land of Gods, Uttarakhand offers some of the most spectacular trekking routes in India. From snow-capped peaks to lush valleys, ancient temples to pristine lakes, every trail here tells a story.',
    popularTreks: [
      { name: 'Valley of Flowers', difficulty: 'Moderate', duration: '6 days', slug: 'valley-of-flowers' },
      { name: 'Kedarkantha', difficulty: 'Easy-Moderate', duration: '6 days', slug: 'kedarkantha' },
      { name: 'Roopkund', difficulty: 'Difficult', duration: '8 days', slug: 'roopkund' },
      { name: 'Har Ki Dun', difficulty: 'Moderate', duration: '7 days', slug: 'har-ki-dun' },
    ],
    bestTime: 'March to June, September to December',
    highlights: [
      'Home to some of India\'s highest peaks',
      'Rich biodiversity and unique flora',
      'Ancient temples and pilgrimage routes',
      'Pristine alpine meadows and lakes',
    ],
  },
  'himachal-pradesh': {
    name: 'Himachal Pradesh',
    image: '/images/destinations/himachal-pradesh.jpg',
    bannerImage: '/images/destinations/himachal-pradesh-banner.jpg',
    description: 'Himachal Pradesh is a trekker\'s paradise with its diverse landscapes ranging from lush green valleys to barren trans-Himalayan deserts. The state offers treks for every skill level.',
    popularTreks: [
      { name: 'Hampta Pass', difficulty: 'Moderate', duration: '5 days', slug: 'hampta-pass' },
      { name: 'Triund', difficulty: 'Easy', duration: '2 days', slug: 'triund' },
      { name: 'Pin Parvati Pass', difficulty: 'Difficult', duration: '11 days', slug: 'pin-parvati-pass' },
      { name: 'Bhrigu Lake', difficulty: 'Moderate', duration: '4 days', slug: 'bhrigu-lake' },
    ],
    bestTime: 'April to June, September to November',
    highlights: [
      'Diverse landscapes and terrains',
      'Ancient Buddhist monasteries',
      'High-altitude alpine lakes',
      'Traditional Himalayan villages',
    ],
  },
  'sikkim': {
    name: 'Sikkim',
    image: '/images/destinations/sikkim.jpg',
    bannerImage: '/images/destinations/sikkim-banner.jpg',
    description: 'Sikkim offers a unique blend of culture and nature. With the majestic Kanchenjunga as its backdrop, the state provides some of the most scenic and culturally rich trekking experiences.',
    popularTreks: [
      { name: 'Goecha La', difficulty: 'Difficult', duration: '11 days', slug: 'goecha-la' },
      { name: 'Dzongri', difficulty: 'Moderate', duration: '6 days', slug: 'dzongri' },
      { name: 'Sandakphu', difficulty: 'Moderate', duration: '7 days', slug: 'sandakphu' },
      { name: 'Green Lake', difficulty: 'Difficult', duration: '9 days', slug: 'green-lake' },
    ],
    bestTime: 'March to May, October to December',
    highlights: [
      'Views of Kanchenjunga',
      'Rich Buddhist culture',
      'Diverse rhododendron forests',
      'High-altitude wetlands',
    ],
  },
};

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinations[params.slug as keyof typeof destinations];
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log('Fetching reviews for:', params.slug);
        const response = await fetch(`/api/reviews?type=location&itemId=${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        console.log('Fetched reviews:', data);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoadingReviews(false);
        console.log('Loading state set to false');
      }
    };

    fetchReviews();
  }, [params.slug]);

  if (!destination) {
    notFound();
  }

  console.log('Current reviews state:', reviews);
  console.log('Is loading reviews:', isLoadingReviews);

  return (
    <div>
      <PageBanner
        title={destination.name}
        description="Discover the beauty and adventure that awaits"
        image={destination.bannerImage}
        height="lg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 mb-12">
            {destination.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">Trek Details</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Best Time to Visit</h3>
                  <p>{destination.bestTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Available Treks</h3>
                  <p>{destination.popularTreks.length} treks</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Highlights</h2>
              <ul className="space-y-3">
                {destination.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center">
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Treks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {destination.popularTreks.map((trek) => (
                <Link key={trek.slug} href={`/treks/${trek.slug}`}>
                  <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-4">{trek.name}</h3>
                    <div className="flex justify-between text-gray-600">
                      <p>Difficulty: {trek.difficulty}</p>
                      <p>Duration: {trek.duration}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/treks"
                className="inline-block bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Explore All Treks
              </Link>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-16">
            {isLoadingReviews ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            ) : (
              <ReviewSection
                reviews={reviews}
                type="location"
                itemId={params.slug}
                itemName={destination.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 