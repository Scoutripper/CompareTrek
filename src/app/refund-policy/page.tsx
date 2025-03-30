import PageBanner from '@/components/PageBanner';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageBanner 
        title="Refund Policy" 
        image="/images/banners/refund-policy.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cancellation and Refund Policy</h2>
            <p className="text-gray-600 mb-4">
              We understand that plans can change. Here's our policy regarding cancellations and refunds for our treks and tours.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cancellation Timeline</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-teal-500 pl-4">
                <h3 className="text-xl font-semibold mb-2">30+ Days Before Trek</h3>
                <p className="text-gray-600">
                  Full refund minus processing fees (5% of the total amount)
                </p>
              </div>

              <div className="border-l-4 border-teal-400 pl-4">
                <h3 className="text-xl font-semibold mb-2">15-29 Days Before Trek</h3>
                <p className="text-gray-600">
                  75% refund of the total amount
                </p>
              </div>

              <div className="border-l-4 border-teal-300 pl-4">
                <h3 className="text-xl font-semibold mb-2">7-14 Days Before Trek</h3>
                <p className="text-gray-600">
                  50% refund of the total amount
                </p>
              </div>

              <div className="border-l-4 border-teal-200 pl-4">
                <h3 className="text-xl font-semibold mb-2">Less than 7 Days</h3>
                <p className="text-gray-600">
                  No refund available
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal list-inside text-gray-600 ml-4 space-y-2">
                <li>Log in to your account</li>
                <li>Go to your bookings</li>
                <li>Select the booking you wish to cancel</li>
                <li>Click on the "Cancel Booking" button</li>
                <li>Fill out the cancellation form</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Special Circumstances</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Weather and Natural Events</h3>
              <p className="text-gray-600">
                If we cancel a trek due to adverse weather conditions or natural events, you will receive a full refund or the option to reschedule for a later date.
              </p>

              <h3 className="text-xl font-semibold mb-2">Medical Emergencies</h3>
              <p className="text-gray-600">
                In case of medical emergencies (with valid documentation), we will provide a full refund minus processing fees or the option to reschedule.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
            <p className="text-gray-600">
              Refunds will be processed within 7-10 business days after approval. The amount will be credited back to the original payment method used for booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our refund policy, please contact us at:
              <br />
              <a href="mailto:support@scoutripper.com" className="text-teal-600 hover:text-teal-700">
                support@scoutripper.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 