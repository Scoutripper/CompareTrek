'use client';

import Link from 'next/link';
import AnimatedContainer from '@/components/AnimatedContainer';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <AnimatedContainer>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
          <div className="space-x-4">
            <Link
              href="/"
              className="inline-block bg-[#85d4d6] text-white px-6 py-3 rounded-lg hover:bg-[#6bc4c6] transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/treks"
              className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore Treks
            </Link>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
} 