'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import PageBanner from '@/components/PageBanner';

const supportCategories = [
  {
    title: 'Trek Booking Support',
    description: 'Get help with trek bookings, modifications, and cancellations',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    links: [
      { text: 'Booking Process', href: '/faq#booking' },
      { text: 'Cancellation Policy', href: '/terms#cancellation' },
      { text: 'Payment Issues', href: '/contact' },
      { text: 'Group Bookings', href: '/contact' },
    ],
  },
  {
    title: 'Technical Support',
    description: 'Issues with website, account, or payments',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    links: [
      { text: 'Account Issues', href: '/contact' },
      { text: 'Website Problems', href: '/contact' },
      { text: 'Payment Gateway', href: '/contact' },
      { text: 'Password Reset', href: '/contact' },
    ],
  },
  {
    title: 'Trek Preparation',
    description: 'Resources and guides for trek preparation',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    links: [
      { text: 'Gear Checklist', href: '/blog/essential-trek-gear' },
      { text: 'Fitness Guide', href: '/blog/trek-fitness-guide' },
      { text: 'Medical Guidelines', href: '/faq#medical' },
      { text: 'Weather Information', href: '/blog/weather-guide' },
    ],
  },
  {
    title: 'General Inquiries',
    description: 'Other questions and information',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    links: [
      { text: 'About Us', href: '/about' },
      { text: 'Contact Details', href: '/contact' },
      { text: 'Terms & Conditions', href: '/terms' },
      { text: 'FAQs', href: '/faq' },
    ],
  },
];

const quickLinks = [
  { text: 'Emergency Contact', href: '/contact', description: 'Get immediate assistance' },
  { text: 'FAQs', href: '/faq', description: 'Find answers to common questions' },
  { text: 'Trek Guidelines', href: '/terms', description: 'Important rules and policies' },
  { text: 'Safety Information', href: '/blog/safety-guidelines', description: 'Stay safe during your trek' },
];

const contactMethods = [
  {
    title: 'Call Us',
    description: 'Mon-Sat from 9am to 6pm',
    icon: PhoneIcon,
    contact: '+91 98765 43210',
    action: 'Call now',
    href: 'tel:+919876543210',
  },
  {
    title: 'Email Us',
    description: 'We\'ll respond within 24 hours',
    icon: EnvelopeIcon,
    contact: 'support@scoutripper.com',
    action: 'Send email',
    href: 'mailto:support@scoutripper.com',
  },
  {
    title: 'Live Chat',
    description: 'Available during business hours',
    icon: ChatBubbleLeftRightIcon,
    contact: 'Start a conversation',
    action: 'Chat now',
    href: '#', // Replace with actual chat widget trigger
  },
];

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const supportOptions = [
  {
    title: '24/7 Emergency Support',
    description: 'Our emergency support team is available round the clock to assist you during your trek.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Medical Assistance',
    description: 'Our trek leaders are certified in first aid and carry comprehensive medical kits.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Equipment Support',
    description: 'We provide high-quality trekking equipment and gear for rent or purchase.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

const supportChannels = [
  {
    title: 'Phone Support',
    description: 'Call us at +91 98765 43210 for immediate assistance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    title: 'Email Support',
    description: 'Email us at support@scoutripper.com for detailed assistance.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time for instant help.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen">
      <PageBanner
        title="Support Center"
        description="We're here to help you with any questions or concerns"
        image="/images/banners/support-banner.jpg"
        height="lg"
      />

      {/* Support Options Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8 text-center"
              >
                <div className="text-[#85d4d6] mb-4 flex justify-center">{option.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{option.title}</h3>
                <p className="text-gray-600">{option.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Channels Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How Can We Help You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-[#85d4d6]">{channel.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{channel.title}</h3>
                </div>
                <p className="text-gray-600">{channel.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Check Our FAQ</h2>
          <p className="text-gray-600 mb-8">
            Find answers to frequently asked questions about our treks and services.
          </p>
          <a
            href="/faq"
            className="inline-block bg-[#85d4d6] text-white py-3 px-8 rounded-md hover:bg-[#6bc4c6] transition-colors"
          >
            View FAQ
          </a>
        </div>
      </section>
    </main>
  );
} 