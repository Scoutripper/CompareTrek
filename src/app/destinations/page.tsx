'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/components/PageBanner';
import DestinationCard from '@/components/DestinationCard';

const destinations = [
  {
    name: 'Uttarakhand',
    image: '/images/destinations/uttarakhand.jpg',
    trekCount: 15,
    slug: 'uttarakhand',
    description: 'Explore the majestic peaks and sacred valleys of Uttarakhand, known as the Land of Gods.',
  },
  {
    name: 'Himachal Pradesh',
    image: '/images/destinations/himachal-pradesh.jpg',
    trekCount: 12,
    slug: 'himachal-pradesh',
    description: 'Discover the pristine beauty and challenging trails of Himachal Pradesh.',
  },
  {
    name: 'Sikkim',
    image: '/images/destinations/sikkim.jpg',
    trekCount: 8,
    slug: 'sikkim',
    description: 'Experience the unique blend of culture and nature in the mystical state of Sikkim.',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    image: '/images/ladakh.jpg',
    description: 'The land of high passes and pristine lakes.',
    treks: 10,
    popularTreks: ['Markha Valley', 'Stok Kangri', 'Chadar Trek'],
    bestTime: 'June to September',
  },
  {
    id: 'kerala',
    name: 'Kerala',
    image: '/images/kerala.jpg',
    description: 'Lush green trails through the Western Ghats.',
    treks: 6,
    popularTreks: ['Chembra Peak', 'Agasthyakoodam', 'Meesapulimala'],
    bestTime: 'October to February',
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    image: '/images/karnataka.jpg',
    description: 'Beautiful trails through the Western Ghats of South India.',
    treks: 7,
    popularTreks: ['Kudremukh', 'Kumara Parvatha', 'Tadiandamol'],
    bestTime: 'October to February',
  }
];

export default function DestinationsPage() {
  return (
    <div>
      <PageBanner
        title="Popular Destinations"
        description="Explore the most breathtaking locations across India"
        image="/images/banners/destinations-banner.jpg"
        height="md"
      />
      
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.slug}
              name={destination.name}
              image={destination.image}
              trekCount={destination.trekCount}
              slug={destination.slug}
            />
          ))}
        </div>
      </section>
    </div>
  );
} 