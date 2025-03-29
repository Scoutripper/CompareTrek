'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircleIcon, CalendarIcon, UserGroupIcon, CurrencyRupeeIcon } from '@heroicons/react/24/outline';

interface BookingDetails {
  id: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'failed';
  paymentMethod: string;
  paymentId?: string;
  startDate: string;
  participants: any[];
}

export default function BookingConfirmationPage() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const bookingId = searchParams.get('bookingId');
    if (!bookingId) {
      setError('Booking ID not found');
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch booking details');
        }
        const data = await response.json();
        
        if (isMounted) {
          setBooking(data);
          // Only continue polling if status is pending
          if (data.status !== 'pending') {
            clearInterval(intervalId);
          }
        }
      } catch (error: any) {
        console.error('Error fetching booking:', error);
        if (isMounted) {
          setError(error.message || 'Failed to load booking details');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Initial fetch
    fetchBookingDetails();

    // Start polling if initial fetch returns pending status
    if (booking?.status === 'pending') {
      intervalId = setInterval(fetchBookingDetails, 10000); // Poll every 10 seconds
    }

    // Cleanup function
    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [searchParams]); // Remove booking?.status from dependencies

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 mx-auto mb-4 border-4 border-[#85d4d6] border-t-transparent rounded-full"></div>
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">Booking Not Found</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <div className="mt-6 space-x-4">
              <Link 
                href="/support" 
                className="inline-block text-[#85d4d6] hover:underline"
              >
                Contact Support
              </Link>
              <Link 
                href="/treks" 
                className="inline-block text-[#85d4d6] hover:underline"
              >
                Browse Treks
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
              booking.status === 'confirmed' ? 'bg-green-100' :
              booking.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {booking.status === 'confirmed' ? (
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : booking.status === 'pending' ? (
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {booking.status === 'confirmed' ? 'Booking Confirmed!' :
             booking.status === 'pending' ? 'Booking Pending' : 'Booking Failed'}
          </h1>
          <p className="text-lg text-gray-600">
            {booking.status === 'confirmed' ? 'Your trek is scheduled and confirmed.' :
             booking.status === 'pending' ? 'We are processing your booking.' : 'There was an issue with your booking.'}
          </p>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center text-gray-600 mb-4">
                  <CalendarIcon className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Start Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(booking.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <UserGroupIcon className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Participants</p>
                    <p className="font-medium text-gray-900">
                      {booking.participants.length} {booking.participants.length === 1 ? 'person' : 'people'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <CurrencyRupeeIcon className="h-5 w-5 mr-2" />
                  <div>
                    <p className="text-sm">Total Amount</p>
                    <p className="font-medium text-gray-900">
                      ₹{booking.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Booking ID</p>
                <p className="font-mono text-gray-900 mb-4">{booking.id}</p>
                <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                <p className="font-mono text-gray-900 capitalize">{booking.paymentMethod}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900">Next Steps</h2>
          </div>
          <div className="px-6 py-4">
            {booking.status === 'confirmed' ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  A confirmation email has been sent with detailed instructions.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-4 py-2 border border-[#85d4d6] text-[#85d4d6] rounded-lg hover:bg-[#85d4d6] hover:text-white transition-colors"
                  >
                    View Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-[#85d4d6] text-white rounded-lg hover:bg-[#6bc4c6] transition-colors"
                  >
                    Book Another Trek
                  </Link>
                </div>
              </div>
            ) : booking.status === 'pending' ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {booking.paymentMethod === 'cash' ? 
                    'Please visit our office to complete the cash payment.' :
                   booking.paymentMethod === 'bank' ?
                    'Please complete the bank transfer using the provided details.' :
                   booking.paymentMethod === 'upi' ?
                    'Please complete the UPI payment using the provided QR code or UPI ID.' :
                    'We are processing your payment. Please wait.'}
                </p>
                <p className="text-sm text-gray-500">
                  This page will automatically update once your payment is confirmed.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  We apologize for the inconvenience. Please try booking again or contact our support team.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/support"
                    className="inline-flex items-center px-4 py-2 border border-[#85d4d6] text-[#85d4d6] rounded-lg hover:bg-[#85d4d6] hover:text-white transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/treks"
                    className="inline-flex items-center px-4 py-2 bg-[#85d4d6] text-white rounded-lg hover:bg-[#6bc4c6] transition-colors"
                  >
                    Try Again
                  </Link>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
} 