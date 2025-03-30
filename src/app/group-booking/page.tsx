'use client';

import { useState } from 'react';
import PageBanner from '@/components/PageBanner';

interface FormData {
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  organizationType: string;
  groupType: string;
  groupSize: string;
  preferredDestination: string;
  preferredDate: string;
  duration: string;
  budget: string;
  requirements: string;
}

export default function GroupBookingPage() {
  const [formData, setFormData] = useState<FormData>({
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    organizationType: 'corporate',
    groupType: 'adults',
    groupSize: '',
    preferredDestination: '',
    preferredDate: '',
    duration: '',
    budget: '',
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/group-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      setFormData({
        organizerName: '',
        organizerEmail: '',
        organizerPhone: '',
        organizationType: 'corporate',
        groupType: 'adults',
        groupSize: '',
        preferredDestination: '',
        preferredDate: '',
        duration: '',
        budget: '',
        requirements: '',
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner 
        title="Group Booking" 
        image="/images/banners/group-booking.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Group Trek Booking</h2>
            <p className="text-gray-600">
              Planning a trek for your company, school, or group? Fill out the form below and we'll help you organize an unforgettable adventure.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organizer Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700">
                  Organizer Name
                </label>
                <input
                  type="text"
                  id="organizerName"
                  name="organizerName"
                  value={formData.organizerName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="organizerEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="organizerEmail"
                  name="organizerEmail"
                  value={formData.organizerEmail}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="organizerPhone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="organizerPhone"
                  name="organizerPhone"
                  value={formData.organizerPhone}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="organizationType" className="block text-sm font-medium text-gray-700">
                  Organization Type
                </label>
                <select
                  id="organizationType"
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="corporate">Corporate</option>
                  <option value="school">School/College</option>
                  <option value="friends">Friends Group</option>
                  <option value="family">Family Group</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Group Details */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="groupType" className="block text-sm font-medium text-gray-700">
                  Group Type
                </label>
                <select
                  id="groupType"
                  name="groupType"
                  value={formData.groupType}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="adults">Adults Only</option>
                  <option value="family">Family with Children</option>
                  <option value="students">Students</option>
                  <option value="mixed">Mixed Group</option>
                </select>
              </div>

              <div>
                <label htmlFor="groupSize" className="block text-sm font-medium text-gray-700">
                  Group Size
                </label>
                <input
                  type="number"
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleInputChange}
                  min="5"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="preferredDestination" className="block text-sm font-medium text-gray-700">
                  Preferred Destination
                </label>
                <input
                  type="text"
                  id="preferredDestination"
                  name="preferredDestination"
                  value={formData.preferredDestination}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (days)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                  Budget per person (₹)
                </label>
                <input
                  type="number"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  min="0"
                  step="1000"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            {/* Special Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                Special Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Any special requirements, dietary restrictions, or specific activities..."
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-400"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <p className="text-green-600 text-center">
                Thank you! We'll get back to you with a group tour plan soon.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-600 text-center">
                Something went wrong. Please try again or contact us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
} 