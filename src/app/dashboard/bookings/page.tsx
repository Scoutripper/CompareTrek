'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Booking {
  id: string;
  trekName: string;
  startDate: string;
  participants: number;
  leadParticipant: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalAmount: number;
  paymentId: string;
}

// Sample data (replace with actual data from your API)
const sampleBookings: Booking[] = [
  {
    id: 'BK001',
    trekName: 'Valley of Flowers Trek',
    startDate: '2024-07-15',
    participants: 2,
    leadParticipant: 'John Doe',
    status: 'confirmed',
    totalAmount: 23998,
    paymentId: 'pay_123456',
  },
  // Add more sample bookings...
];

export default function BookingsDashboard() {
  const [bookings, setBookings] = useState<Booking[]>(sampleBookings);
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');

  const filteredBookings = bookings.filter(
    booking => filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">Manage and view your trek bookings</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex space-x-4">
          {(['all', 'confirmed', 'pending', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === status
                  ? 'bg-[#85d4d6] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {booking.trekName}
                    </h3>
                    <p className="text-gray-600">Booking ID: {booking.id}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-medium">
                      {new Date(booking.startDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-medium">{booking.participants} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Lead Participant</p>
                    <p className="font-medium">{booking.leadParticipant}</p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={`/bookings/${booking.id}`}
                      className="text-[#85d4d6] hover:text-[#6bc4c6] font-medium"
                    >
                      View Details
                    </Link>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          // Handle download itinerary
                        }}
                        className="text-[#85d4d6] hover:text-[#6bc4c6] font-medium"
                      >
                        Download Itinerary
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No bookings found</p>
          </div>
        )}
      </div>
    </main>
  );
} 