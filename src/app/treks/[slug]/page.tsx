'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import PageBanner from '@/components/PageBanner';
import { images } from '@/config/images';

// Mock data - replace with actual API call
const treks = {
  'valley-of-flowers': {
    name: 'Valley of Flowers Trek',
    image: images.destinations.uttarakhand.card,
    bannerImage: images.destinations.uttarakhand.banner,
    description: 'Experience the magical Valley of Flowers, a UNESCO World Heritage site nestled in Uttarakhand.',
    difficulty: 'Moderate',
    duration: '6 days',
    altitude: '3,858m',
    bestTime: 'July to September',
    cost: 12999,
    location: 'Uttarakhand',
    highlights: [
      'UNESCO World Heritage Site',
      'Rare Himalayan flora',
      'Pristine valleys',
      'Rich biodiversity'
    ]
  },
  // Add more treks here
};

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'included', label: 'What\'s Included' },
];

export default function TrekPage({ params }: { params: { slug: string } }) {
  const trek = treks[params.slug as keyof typeof treks];

  if (!trek) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState('overview');
  const [openDay, setOpenDay] = useState<number | null>(null);

  return (
    <div>
      <PageBanner
        title={trek.name}
        description={trek.description}
        image={trek.bannerImage}
        height="lg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Trek Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Difficulty</h3>
                  <p className="text-lg">{trek.difficulty}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Duration</h3>
                  <p className="text-lg">{trek.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Max Altitude</h3>
                  <p className="text-lg">{trek.altitude}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Best Time</h3>
                  <p className="text-lg">{trek.bestTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">Starting from</h3>
                  <p className="text-2xl font-bold text-primary-600">₹{trek.cost}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-2">
                {trek.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 