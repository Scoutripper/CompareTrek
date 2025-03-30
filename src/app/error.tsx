'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import AnimatedContainer from '@/components/AnimatedContainer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        <AnimatedContainer>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            We apologize for the inconvenience. Our team has been notified and is working on fixing the issue.
          </p>
          <div className="space-x-4">
            <button
              onClick={reset}
              className="inline-block bg-[#85d4d6] text-white px-6 py-3 rounded-lg hover:bg-[#6bc4c6] transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
} 