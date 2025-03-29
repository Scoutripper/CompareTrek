'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';

const destinations = {
  'uttarakhand': {
    name: 'Uttarakhand',
    image: '/images/uttarakhand.jpg',
    description: 'Home to some of India\'s most sacred peaks and pristine valleys, Uttarakhand offers a perfect blend of spiritual and adventurous trekking experiences. From the Valley of Flowers to the mighty Roopkund, this state hosts some of the most iconic treks in India.',
    treks: 15,
    popularTreks: [
      { id: 'valley-of-flowers', name: 'Valley of Flowers', difficulty: 'Easy', duration: '6 days' },
      { id: 'kedarkantha', name: 'Kedarkantha Summit', difficulty: 'Moderate', duration: '6 days' },
      { id: 'roopkund', name: 'Roopkund Trek', difficulty: 'Difficult', duration: '8 days' },
    ],
    bestTime: 'March to June, September to December',
    weather: 'Summer: 15°C to 30°C\nWinter: -5°C to 15°C',
    altitude: '1,800m to 5,000m',
    highlights: [
      'Sacred peaks and temples',
      'Alpine meadows and forests',
      'Pristine lakes and glaciers',
      'Rich wildlife',
      'Traditional Garhwali culture'
    ]
  },
  'himachal-pradesh': {
    name: 'Himachal Pradesh',
    image: '/images/himachal.jpg',
    description: 'Known as the "Land of Gods," Himachal Pradesh offers diverse trekking experiences through ancient forests, high mountain passes, and remote villages. The state\'s varied landscape provides options for both beginners and experienced trekkers.',
    treks: 12,
    popularTreks: [
      { id: 'hampta-pass', name: 'Hampta Pass', difficulty: 'Moderate', duration: '5 days' },
      { id: 'triund', name: 'Triund Trek', difficulty: 'Easy', duration: '2 days' },
      { id: 'pin-parvati', name: 'Pin Parvati Pass', difficulty: 'Difficult', duration: '10 days' },
    ],
    bestTime: 'April to June, September to November',
    weather: 'Summer: 10°C to 25°C\nWinter: -10°C to 10°C',
    altitude: '2,000m to 4,500m',
    highlights: [
      'Ancient Buddhist monasteries',
      'Snow-capped peaks',
      'Apple orchards',
      'Remote mountain villages',
      'High-altitude lakes'
    ]
  },
  'sikkim': {
    name: 'Sikkim',
    image: '/images/sikkim.jpg',
    description: 'Sikkim offers a unique trekking experience with its blend of Himalayan landscapes and Buddhist culture. The state provides stunning views of Kanchenjunga and hosts some of the most pristine trekking routes in India.',
    treks: 8,
    popularTreks: [
      { id: 'goecha-la', name: 'Goecha La', difficulty: 'Difficult', duration: '10 days' },
      { id: 'dzongri', name: 'Dzongri Trek', difficulty: 'Moderate', duration: '6 days' },
      { id: 'sandakphu', name: 'Sandakphu Trek', difficulty: 'Moderate', duration: '7 days' },
    ],
    bestTime: 'March to May, October to December',
    weather: 'Summer: 5°C to 20°C\nWinter: -15°C to 5°C',
    altitude: '1,500m to 4,800m',
    highlights: [
      'Views of Kanchenjunga',
      'Buddhist monasteries',
      'Rhododendron forests',
      'High-altitude lakes',
      'Rich biodiversity'
    ]
  }
};

export default function DestinationPage() {
  const { id } = useParams();
  const destination = destinations[id as keyof typeof destinations];

  if (!destination) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/destinations" className="text-[#85d4d6] hover:text-[#6bc4c6]">
            View all destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center mb-16">
        <div className="absolute inset-0">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {destination.name}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {destination.description}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-6">Popular Treks</h2>
              <div className="grid gap-6">
                {destination.popularTreks.map((trek) => (
                  <Link
                    key={trek.id}
                    href={`/treks/${trek.id}`}
                    className="block bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{trek.name}</h3>
                        <p className="text-gray-600">Duration: {trek.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trek.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        trek.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {trek.difficulty}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <svg className="h-5 w-5 text-[#85d4d6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Best Time to Visit</h3>
                  <p className="text-gray-600">{destination.bestTime}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Weather</h3>
                  <p className="text-gray-600 whitespace-pre-line">{destination.weather}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Altitude Range</h3>
                  <p className="text-gray-600">{destination.altitude}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Available Treks</h3>
                  <p className="text-3xl font-bold text-[#85d4d6]">{destination.treks}</p>
                </div>
                <Link
                  href={`/treks?destination=${id}`}
                  className="block w-full bg-[#85d4d6] text-white text-center py-3 rounded-lg hover:bg-[#6bc4c6] transition-colors"
                >
                  View All Treks
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 