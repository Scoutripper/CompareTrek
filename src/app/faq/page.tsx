'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PageBanner from '@/components/PageBanner';

const faqs = [
  {
    question: 'What is included in the trek package?',
    answer: 'Our trek packages include professional guides, accommodation, meals, transportation to and from the trek base, basic equipment, and safety gear. Each package may vary slightly based on the specific trek.',
  },
  {
    question: 'What is the difficulty level of the treks?',
    answer: 'We offer treks of varying difficulty levels, from beginner-friendly to challenging expeditions. Each trek description includes a difficulty rating and required fitness level to help you choose the right adventure.',
  },
  {
    question: 'What should I pack for a trek?',
    answer: 'We provide a detailed packing list for each trek, including essential clothing, footwear, personal items, and equipment. Some items may be available for rent or purchase at our base camp.',
  },
  {
    question: 'How do I prepare for a high-altitude trek?',
    answer: 'High-altitude treks require proper acclimatization and fitness preparation. We recommend starting a fitness routine 2-3 months before the trek, including cardio and strength training. We also provide detailed acclimatization guidelines.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Our cancellation policy varies based on the time of cancellation. Generally, cancellations made 30 days before the trek date receive a full refund, while cancellations closer to the date may incur a partial fee.',
  },
  {
    question: 'Do you provide travel insurance?',
    answer: 'While we recommend purchasing travel insurance, we do not provide it directly. We can recommend trusted insurance providers that offer coverage specifically for trekking activities.',
  },
  {
    question: 'What happens in case of bad weather?',
    answer: 'We closely monitor weather conditions and have contingency plans for various scenarios. If conditions become unsafe, we may modify the itinerary or postpone the trek. Your safety is our top priority.',
  },
  {
    question: 'Can I customize a trek package?',
    answer: 'Yes, we offer customized trek packages for groups and individuals. Contact our team to discuss your specific requirements, and we\'ll help create a tailored itinerary for your adventure.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen">
      <PageBanner
        title="Frequently Asked Questions"
        description="Find answers to common questions about our treks and services"
        image="/images/banners/faq-banner.jpg"
        height="lg"
      />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-6 h-6 text-[#85d4d6] transform transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 py-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Have Questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Our team is here to help.
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