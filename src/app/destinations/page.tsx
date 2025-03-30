'use client';

import PageBanner from '@/components/PageBanner';
import DestinationCard from '@/components/DestinationCard';
import { motion } from 'framer-motion';

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
    name: 'Ladakh',
    image: '/images/destinations/ladakh.jpg',
    trekCount: 10,
    slug: 'ladakh',
    description: 'The land of high passes and pristine lakes.',
  },
  {
    name: 'Kerala',
    image: '/images/destinations/kerala.jpg',
    trekCount: 6,
    slug: 'kerala',
    description: 'Lush green trails through the Western Ghats.',
  },
  {
    name: 'Karnataka',
    image: '/images/destinations/karnataka.jpg',
    trekCount: 7,
    slug: 'karnataka',
    description: 'Beautiful trails through the Western Ghats of South India.',
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen">
      <PageBanner
        title="Popular Destinations"
        description="Explore the most breathtaking locations across India"
        image="/images/banners/destinations-banner.jpg"
        height="md"
      />
      
      <section className="container mx-auto px-4 py-16">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <DestinationCard
                name={destination.name}
                image={destination.image}
                trekCount={destination.trekCount}
                slug={destination.slug}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
} 