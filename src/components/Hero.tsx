'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';

const images = [
  {
    src: '/images/hero/hero-1.jpg',
    alt: 'Majestic Himalayan peaks',
    title: 'Explore the Himalayas',
    description: 'Discover breathtaking views and unforgettable experiences',
  },
  {
    src: '/images/destinations/uttarakhand.jpg',
    alt: 'Uttarakhand mountain landscape',
    title: 'Uttarakhand Adventures',
    description: 'Experience the magic of Uttarakhand\'s pristine trails',
  },
  {
    src: '/images/destinations/sikkim.jpg',
    alt: 'Sikkim mountain view',
    title: 'Sikkim Treks',
    description: 'Explore the hidden gems of Northeast India',
  },
  {
    src: '/images/destinations/himachal.jpg',
    alt: 'Himachal Pradesh mountains',
    title: 'Himachal Pradesh',
    description: 'Trek through the majestic mountains of Himachal',
  },
  {
    src: '/images/treks/valley-of-flowers.jpg',
    alt: 'Valley of Flowers Trek',
    title: 'Valley of Flowers',
    description: 'A paradise of alpine flowers and pristine meadows',
  },
  {
    src: '/images/treks/hampta-pass.jpg',
    alt: 'Hampta Pass Trek',
    title: 'Hampta Pass',
    description: 'Cross the dramatic mountain pass at 14,100 ft',
  },
  {
    src: '/images/treks/kedarkantha.jpg',
    alt: 'Kedarkantha Summit',
    title: 'Kedarkantha Summit',
    description: 'Experience the thrill of winter trekking',
  },
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <div 
      className="relative min-h-[600px] w-full overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Image Slider with Overlay */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="100vw"
                onError={(e) => {
                  console.error(`Error loading image: ${images[currentImageIndex].src}`);
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-trek.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </div>
            
            {/* Slide Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-32 left-8 right-8 text-white max-w-md z-10"
            >
              <h2 className="text-2xl font-bold mb-2">{images[currentImageIndex].title}</h2>
              <p className="text-white/90">{images[currentImageIndex].description}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none"
      >
        <button
          onClick={previousSlide}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white pointer-events-auto transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white pointer-events-auto transition-all"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </motion.div>

      {/* Image Navigation and Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-10 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 text-white transition-all"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </button>
            <div className="text-white/80 text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>

          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  currentImageIndex === index 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 w-4 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            Discover Your Next
            <span className="block text-primary-400">Mountain Adventure</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow"
          >
            Join India's largest trekking community and explore breathtaking trails across the Himalayas
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <SearchBar />
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">500+</div>
              <div className="text-sm sm:text-base text-white/80">Treks Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">10K+</div>
              <div className="text-sm sm:text-base text-white/80">Happy Trekkers</div>
            </div>
            <div className="text-center md:col-span-1 col-span-2">
              <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">4.8/5</div>
              <div className="text-sm sm:text-base text-white/80">Average Rating</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/treks"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg text-center shadow-xl shadow-primary-900/20"
            >
              Explore Treks
            </Link>
            <Link
              href="/about"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg hover:bg-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-lg text-center"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </div>
  );
}
