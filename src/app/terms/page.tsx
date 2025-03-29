'use client';

import { motion } from 'framer-motion';
import PageBanner from '@/components/PageBanner';

const terms = [
  {
    title: 'Booking and Payment',
    content: [
      'All bookings are subject to availability and confirmation.',
      'A deposit payment is required to secure your booking.',
      'Full payment must be made at least 30 days before the trek date.',
      'Prices are subject to change without notice.',
      'We accept payments through secure online channels.',
    ],
  },
  {
    title: 'Cancellation Policy',
    content: [
      'Cancellations made 30 days or more before the trek date receive a full refund.',
      'Cancellations made 15-29 days before the trek date receive a 50% refund.',
      'Cancellations made less than 15 days before the trek date are non-refundable.',
      'No refunds are provided for no-shows or early departures.',
      'We reserve the right to cancel treks due to unsafe conditions or insufficient bookings.',
    ],
  },
  {
    title: 'Health and Safety',
    content: [
      'Participants must be in good physical condition and meet the fitness requirements for their chosen trek.',
      'Medical information must be disclosed at the time of booking.',
      'Participants are responsible for obtaining appropriate travel insurance.',
      'Our guides are trained in first aid and emergency procedures.',
      'We reserve the right to refuse participation if safety is compromised.',
    ],
  },
  {
    title: 'Equipment and Gear',
    content: [
      'Participants are responsible for bringing appropriate clothing and personal gear.',
      'We provide group equipment such as tents and cooking gear.',
      'Equipment rental is available for an additional fee.',
      'Participants must treat all equipment with care and respect.',
      'Lost or damaged equipment must be replaced at full cost.',
    ],
  },
  {
    title: 'Environmental Responsibility',
    content: [
      'We follow Leave No Trace principles on all treks.',
      'Participants must dispose of waste properly.',
      'We minimize our environmental impact through sustainable practices.',
      'We support local communities and conservation efforts.',
      'Participants must respect local customs and traditions.',
    ],
  },
  {
    title: 'Liability and Insurance',
    content: [
      'Participants acknowledge the inherent risks of trekking.',
      'We are not liable for personal injury or property damage.',
      'Travel insurance is mandatory for all participants.',
      'Participants must sign a liability waiver before the trek.',
      'We maintain emergency evacuation procedures and contacts.',
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <PageBanner
        title="Terms and Conditions"
        description="Please read our terms and conditions carefully before booking a trek"
        image="/images/banners/terms-banner.jpg"
        height="lg"
      />

      {/* Terms Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {terms.map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{term.title}</h2>
                <ul className="space-y-4">
                  {term.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-[#85d4d6] mr-3 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            If you have any questions about our terms and conditions, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#85d4d6] text-white py-3 px-8 rounded-md hover:bg-[#6bc4c6] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </main>
  );
} 