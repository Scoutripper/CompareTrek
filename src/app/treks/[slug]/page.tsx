'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import { StarIcon, CalendarIcon, MapPinIcon, ChartBarIcon } from '@heroicons/react/24/solid';
import ReviewSection from '@/components/ReviewSection';

interface Tab {
  id: string;
  label: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

// Sample trek data (replace with actual data from your API)
const treks = {
  'valley-of-flowers': {
    name: 'Valley of Flowers Trek',
    description: 'Experience the breathtaking beauty of the Valley of Flowers, a UNESCO World Heritage site nestled in the Western Himalayas.',
    bannerImage: '/images/treks/valley-of-flowers.jpg',
    difficulty: 'Moderate',
    duration: '6 days',
    altitude: '3,858m',
    bestTime: 'July to September',
    cost: 12999,
    rating: 4.8,
    reviews: 127,
    highlights: [
      'UNESCO World Heritage Site',
      'Rare Himalayan Flora',
      'Pristine Alpine Meadows',
      'Hemkund Sahib Visit',
      'Local Culture Experience'
    ],
    overview: `The Valley of Flowers Trek is a mesmerizing journey through one of India's most beautiful landscapes. 
    Located in the Chamoli district of Uttarakhand, this UNESCO World Heritage site comes alive with hundreds of species 
    of wildflowers during the monsoon season. The trek offers a perfect blend of natural beauty, adventure, and spiritual experience.`,
    itinerary: [
      {
        day: 1,
        title: 'Arrival at Govindghat',
        description: 'Arrive at Govindghat and prepare for the trek. Evening briefing and equipment check.'
      },
      {
        day: 2,
        title: 'Trek to Ghangaria',
        description: 'A 9km trek from Govindghat to Ghangaria (3050m). Stay overnight at Ghangaria.'
      },
      {
        day: 3,
        title: 'Valley of Flowers',
        description: 'Full day exploration of the Valley of Flowers. Return to Ghangaria by evening.'
      },
      {
        day: 4,
        title: 'Hemkund Sahib',
        description: 'Visit to Hemkund Sahib (4329m). Return to Ghangaria.'
      },
      {
        day: 5,
        title: 'Return to Govindghat',
        description: 'Trek back to Govindghat from Ghangaria.'
      },
      {
        day: 6,
        title: 'Departure',
        description: 'Departure from Govindghat with beautiful memories.'
      }
    ],
    included: [
      'Professional trek guide',
      'Camping equipment',
      'All meals during the trek',
      'First aid and safety equipment',
      'Forest permits and entry fees',
      'Transportation from base camp'
    ]
  },
  // Add more treks here
};

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary' },
  { id: 'included', label: 'What\'s Included' },
];

export default function TrekPage({ params }: { params: { slug: string } }) {
  const [trek, setTrek] = useState<any>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    // Fetch trek data
    const fetchTrek = async () => {
      // Replace with your actual trek data fetching logic
      const trekData = {
        name: 'Valley of Flowers',
        slug: 'valley-of-flowers',
        description: 'A beautiful trek through the valley of flowers...',
        image: '/images/treks/valley-of-flowers.jpg',
        difficulty: 'Moderate',
        duration: '6 days',
        price: 12999,
        altitude: '3658m',
        bestTime: 'July to September',
        location: 'Uttarakhand',
      };
      setTrek(trekData);
    };

    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const response = await fetch(`/api/reviews?type=trek&itemId=${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchTrek();
    fetchReviews();
  }, [params.slug]);

  if (!trek) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState('overview');
  const [openDay, setOpenDay] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <PageBanner
        title={trek.name}
        description={trek.description}
        image={trek.bannerImage}
        height="lg"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Trek Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <ChartBarIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm">Difficulty</span>
                  </div>
                  <p className="text-lg font-semibold">{trek.difficulty}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <p className="text-lg font-semibold">{trek.duration}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm">Max Altitude</span>
                  </div>
                  <p className="text-lg font-semibold">{trek.altitude}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center text-gray-600 mb-2">
                    <StarIcon className="h-5 w-5 mr-2 text-yellow-400" />
                    <span className="text-sm">Rating</span>
                  </div>
                  <p className="text-lg font-semibold">{trek.rating} ({trek.reviews})</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-sm font-medium ${
                          activeTab === tab.id
                            ? 'border-b-2 border-primary-600 text-primary-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {activeTab === 'overview' && (
                        <div className="prose max-w-none">
                          <p>{trek.overview}</p>
                        </div>
                      )}
                      {activeTab === 'itinerary' && (
                        <div className="space-y-4">
                          {trek.itinerary.map((day) => (
                            <div
                              key={day.day}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left"
                              >
                                <span className="font-medium">Day {day.day}: {day.title}</span>
                                <svg
                                  className={`w-5 h-5 transform transition-transform ${
                                    openDay === day.day ? 'rotate-180' : ''
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                              <AnimatePresence>
                                {openDay === day.day && (
                                  <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 py-3 bg-gray-50">
                                      {day.description}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      )}
                      {activeTab === 'included' && (
                        <ul className="space-y-2">
                          {trek.included.map((item) => (
                            <li key={item} className="flex items-center">
                              <svg
                                className="w-5 h-5 text-green-500 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Review Section */}
              {!isLoadingReviews && (
                <ReviewSection
                  reviews={reviews}
                  type="trek"
                  itemId={params.slug}
                  itemName={trek.name}
                />
              )}
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-2xl font-bold mb-4">₹{trek.cost.toLocaleString()}</h3>
                <p className="text-gray-600 mb-6">per person</p>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span>Best Time: {trek.bestTime}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    <span>{trek.rating} ({trek.reviews} reviews)</span>
                  </div>
                </div>
                <Link
                  href={`/treks/${params.slug}/book`}
                  className="block w-full bg-primary-600 text-white text-center px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Book Now
                </Link>
                <p className="text-sm text-gray-500 text-center mt-4">
                  No payment required to book
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 