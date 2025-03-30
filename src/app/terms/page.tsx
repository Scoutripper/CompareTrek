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
    <div className="min-h-screen bg-gray-50">
      <PageBanner 
        title="Terms and Conditions" 
        image="/images/banners/terms.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Scoutripper. By accessing our website and using our services, you agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Booking and Payment</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Booking Process</h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>All bookings are subject to availability</li>
                  <li>A booking is confirmed only after full payment</li>
                  <li>Booking confirmation will be sent via email</li>
                  <li>Participants must be at least 18 years old or accompanied by an adult</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Payment Terms</h3>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>All prices are in Indian Rupees (INR)</li>
                  <li>Payments are processed securely through our payment partners</li>
                  <li>Additional charges may apply for special requirements</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Trek Participation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Health and Fitness</h3>
                <p className="text-gray-600 mb-2">
                  Participants must:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Be in good physical and mental health</li>
                  <li>Disclose any medical conditions before booking</li>
                  <li>Carry necessary medications and prescriptions</li>
                  <li>Follow guide instructions during the trek</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Equipment and Gear</h3>
                <p className="text-gray-600 mb-2">
                  Participants are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  <li>Bringing required personal equipment</li>
                  <li>Maintaining their gear in good condition</li>
                  <li>Using safety equipment provided by us</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Liability and Insurance</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                While we take all necessary precautions:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4">
                <li>Participants trek at their own risk</li>
                <li>We recommend personal travel insurance</li>
                <li>We are not liable for loss of personal belongings</li>
                <li>Force majeure circumstances may affect trek plans</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Photography and Content</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                By participating in our treks:
              </p>
              <ul className="list-disc list-inside text-gray-600 ml-4">
                <li>You agree to be photographed for promotional purposes</li>
                <li>You grant us rights to use your testimonials</li>
                <li>You may not use our content without permission</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Modifications</h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes acceptance of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms and Conditions, please contact us at:
              <br />
              <a href="mailto:legal@scoutripper.com" className="text-teal-600 hover:text-teal-700">
                legal@scoutripper.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 