'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TrekCard from '@/components/TrekCard';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Trek, Destination } from '@/types';

// Sample data - replace with actual data from API/database
const featuredTreks: Trek[] = [
  {
    id: '1',
    title: 'Valley of Flowers Trek',
    location: 'Uttarakhand, India',
    imageUrl: '/images/trek1.jpg',
    rating: 4.8,
    reviewCount: 124,
    likes: 356,
    isLiked: false
  },
  {
    id: '2',
    title: 'Hampta Pass Trek',
    location: 'Himachal Pradesh, India',
    imageUrl: '/images/trek2.jpg',
    rating: 4.6,
    reviewCount: 98,
    likes: 287,
    isLiked: true
  },
  {
    id: '3',
    title: 'Kedarkantha Summit',
    location: 'Uttarakhand, India',
    imageUrl: '/images/trek3.jpg',
    rating: 4.9,
    reviewCount: 156,
    likes: 423,
    isLiked: false
  },
];

const destinations: Destination[] = [
  {
    name: 'Uttarakhand',
    image: '/images/uttarakhand.jpg',
    treks: 15,
  },
  {
    name: 'Himachal Pradesh',
    image: '/images/himachal.jpg',
    treks: 12,
  },
  {
    name: 'Sikkim',
    image: '/images/sikkim.jpg',
    treks: 8,
  },
];

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-bg.jpg"
              alt="Mountain landscape"
              fill
              priority
              className="object-cover"
              quality={100}
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Amazing Treks
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore the most beautiful trails across India
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/treks"
                className="inline-block bg-[#85d4d6] text-[#2F4858] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#6bc4c6] transition-colors"
              >
                Explore Treks
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="w-6 h-10 border-2 border-white rounded-full p-1">
              <motion.div 
                className="w-1.5 h-3 bg-white rounded-full mx-auto"
                animate={{ 
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </section>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <section className="mb-24">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Treks</h2>
                <p className="text-gray-600">Discover our most popular trekking experiences</p>
              </div>
              <Link href="/treks" className="text-primary-600 hover:text-primary-700 font-medium">
                View all treks →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTreks.map((trek) => (
                <TrekCard key={trek.id} {...trek} />
              ))}
            </div>
          </section>

          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore the most breathtaking locations across India</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <div 
                  key={destination.name}
                  className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Image
                    src={destination.image}
                    alt={`${destination.name} trekking destination`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60 group-hover:via-black/40 group-hover:to-black/70 transition-all duration-300" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-white/90">
                      {destination.treks} treks available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Ready for your next adventure?
              </h2>
              <p className="text-gray-600 mb-8">
                Join our community of adventurers and explore the most beautiful trails
              </p>
              <div className="inline-flex gap-4">
                <Link 
                  href="/register"
                  className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Started
                </Link>
                <Link 
                  href="/contact"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Scoutripper</h3>
              <p className="text-gray-600 text-sm">
                Your trusted partner for trekking adventures in India.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-primary-600">About Us</Link></li>
                <li><Link href="/treks" className="hover:text-primary-600">All Treks</Link></li>
                <li><Link href="/blog" className="hover:text-primary-600">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-primary-600">Contact</Link></li>
                <li><Link href="/faq" className="hover:text-primary-600">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-primary-600">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/scoutripper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                  aria-label="Follow us on Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://twitter.com/scoutripper" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600"
                  aria-label="Follow us on Twitter"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Scoutripper. All rights reserved.
          </div>
        </div>
      </footer>
    </ErrorBoundary>
  );
}
