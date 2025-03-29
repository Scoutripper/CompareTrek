'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Types
interface ParticipantInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContact: string;
  specialRequirements: string;
}

interface BookingFormData {
  startDate: string;
  numberOfParticipants: number;
  participants: ParticipantInfo[];
}

interface ValidationErrors {
  [key: string]: string[];
}

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

const validateParticipant = (participant: ParticipantInfo): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!participant.fullName.trim()) {
    errors.fullName = ['Full name is required'];
  } else if (participant.fullName.trim().length < 3) {
    errors.fullName = ['Full name must be at least 3 characters long'];
  }

  if (!participant.email) {
    errors.email = ['Email is required'];
  } else if (!validateEmail(participant.email)) {
    errors.email = ['Please enter a valid email address'];
  }

  if (!participant.phone) {
    errors.phone = ['Phone number is required'];
  } else if (!validatePhone(participant.phone)) {
    errors.phone = ['Please enter a valid 10-digit phone number'];
  }

  if (!participant.address.trim()) {
    errors.address = ['Address is required'];
  }

  if (!participant.emergencyContact.trim()) {
    errors.emergencyContact = ['Emergency contact is required'];
  } else if (!validatePhone(participant.emergencyContact)) {
    errors.emergencyContact = ['Please enter a valid 10-digit phone number'];
  }

  return errors;
};

// Error Message Component
const ErrorMessage = ({ message }: { message: string }) => (
  <p className="mt-1 text-sm text-red-600">{message}</p>
);

// Step components
const TrekDetailsStep = ({ formData, setFormData, errors }: {
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
  errors: ValidationErrors;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'numberOfParticipants') {
      const num = parseInt(value);
      setFormData({
        ...formData,
        [name]: num,
        participants: Array(num).fill({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          emergencyContact: '',
          specialRequirements: '',
        }),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Calculate minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          min={minDate}
          value={formData.startDate}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.startDate ? 'border-red-500' : 'border-gray-300'
          } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
          required
        />
        {errors.startDate?.map((error, index) => (
          <ErrorMessage key={index} message={error} />
        ))}
      </div>
      <div>
        <label htmlFor="numberOfParticipants" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Participants
        </label>
        <input
          type="number"
          id="numberOfParticipants"
          name="numberOfParticipants"
          min="1"
          max="10"
          value={formData.numberOfParticipants}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-lg border ${
            errors.numberOfParticipants ? 'border-red-500' : 'border-gray-300'
          } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
          required
        />
        {errors.numberOfParticipants?.map((error, index) => (
          <ErrorMessage key={index} message={error} />
        ))}
      </div>
    </div>
  );
};

const ParticipantsStep = ({ formData, setFormData, errors }: {
  formData: BookingFormData;
  setFormData: (data: BookingFormData) => void;
  errors: ValidationErrors;
}) => {
  const handleParticipantChange = (index: number, field: keyof ParticipantInfo, value: string) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setFormData({ ...formData, participants: updatedParticipants });
  };

  return (
    <div className="space-y-8">
      {formData.participants.map((participant, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Participant {index + 1}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={participant.fullName}
                onChange={(e) => handleParticipantChange(index, 'fullName', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.fullName`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                required
              />
              {errors[`participants.${index}.fullName`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={participant.email}
                onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.email`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                required
              />
              {errors[`participants.${index}.email`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={participant.phone}
                onChange={(e) => handleParticipantChange(index, 'phone', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.phone`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                required
              />
              {errors[`participants.${index}.phone`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={participant.address}
                onChange={(e) => handleParticipantChange(index, 'address', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.address`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                required
              />
              {errors[`participants.${index}.address`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                value={participant.emergencyContact}
                onChange={(e) => handleParticipantChange(index, 'emergencyContact', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.emergencyContact`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                required
              />
              {errors[`participants.${index}.emergencyContact`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements
              </label>
              <input
                type="text"
                value={participant.specialRequirements}
                onChange={(e) => handleParticipantChange(index, 'specialRequirements', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors[`participants.${index}.specialRequirements`] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-[#85d4d6] focus:border-[#85d4d6]`}
                placeholder="Any dietary restrictions, medical conditions, etc."
              />
              {errors[`participants.${index}.specialRequirements`]?.map((error, i) => (
                <ErrorMessage key={i} message={error} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PaymentStep = ({ formData, onPaymentSuccess }: { 
  formData: BookingFormData;
  onPaymentSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cash' | 'upi' | 'bank'>('razorpay');
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const MAX_RETRIES = 3;

  const trekFee = 5999;
  const gst = 0.18;
  const totalAmount = formData.numberOfParticipants * trekFee;
  const gstAmount = totalAmount * gst;
  const finalAmount = totalAmount + gstAmount;

  // Add payment method icons and details
  const paymentMethods = [
    {
      id: 'razorpay',
      name: 'Pay Online',
      description: 'Credit/Debit Card, Net Banking, UPI',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 10H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'upi',
      name: 'UPI Payment',
      description: 'Google Pay, PhonePe, Paytm',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'cash',
      name: 'Pay in Cash',
      description: 'Pay at our office',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 9V7C17 5.89543 16.1046 5 15 5H5C3.89543 5 3 5.89543 3 7V13C3 14.1046 3.89543 15 5 15H7M9 19H19C20.1046 19 21 18.1046 21 17V11C21 9.89543 20.1046 9 19 9H9C7.89543 9 7 9.89543 7 11V17C7 18.1046 7.89543 19 9 19ZM14 14C14 15.1046 13.1046 16 12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer/NEFT',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 21H21M3 10H21M5 6L12 3L19 6M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  // Add bank details for bank transfer
  const bankDetails = {
    accountName: 'Scoutripper Adventures',
    accountNumber: 'XXXXXXXXXXXX',
    ifscCode: 'XXXXXX',
    bankName: 'XXXX Bank',
    branch: 'Main Branch',
  };

  // Add UPI details
  const upiDetails = {
    id: 'scoutripper@upi',
    qrCode: '/images/payments/upi-qr.png', // You'll need to add this image
  };

  // Add Razorpay script with proper loading check
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      setError('Payment system failed to initialize. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const createOrder = async (attempt = 1) => {
    try {
      console.log(`Attempt ${attempt} to create order:`, {
        amount: finalAmount,
        timestamp: new Date().toISOString(),
      });

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          receipt: `trek_booking_${Date.now()}`,
          notes: {
            trekDate: formData.startDate,
            participants: formData.numberOfParticipants,
            leadParticipant: formData.participants[0].fullName,
            attempt: attempt,
            paymentMethod: 'razorpay',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const data = await response.json();
      console.log('Order created successfully:', data);
      return data.orderId;
    } catch (error: any) {
      console.error(`Order creation attempt ${attempt} failed:`, error);
      throw error;
    }
  };

  const handleCashPayment = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Create a booking with cash payment method
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: finalAmount,
          currency: 'INR',
          receipt: `trek_booking_${Date.now()}`,
          notes: {
            trekDate: formData.startDate,
            participants: formData.numberOfParticipants,
            leadParticipant: formData.participants[0].fullName,
            paymentMethod: 'cash',
          },
          paymentMethod: 'cash',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create booking');
      }

      // Send confirmation email
      await fetch('/api/bookings/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking: {
            id: data.orderId,
            startDate: formData.startDate,
            participants: formData.participants,
            totalAmount: finalAmount,
            paymentMethod: 'cash',
          },
          trek: {
            title: 'Valley of Flowers Trek',
          },
        }),
      });

      onPaymentSuccess();
    } catch (error: any) {
      console.error('Cash booking failed:', error);
      setError(error.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === 'cash') {
      await handleCashPayment();
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setRetryCount(0);

      // Check if Razorpay is loaded
      if (!isRazorpayLoaded) {
        throw new Error('Payment system is initializing. Please try again in a moment.');
      }

      if (!(window as any).Razorpay) {
        throw new Error('Payment system is not available. Please try again later.');
      }

      // Create order first
      const orderId = await createOrder(1);
      
      if (!orderId) {
        throw new Error('Failed to create order. Please try again.');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: finalAmount * 100, // Convert to paise
        currency: 'INR',
        name: 'Scoutripper',
        description: 'Trek Booking Payment',
        order_id: orderId,
        handler: async function(response: any) {
          try {
            console.log('Payment successful, verifying...', response);

            const verifyResponse = await fetch('/api/bookings/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                booking: {
                  startDate: formData.startDate,
                  participants: formData.participants,
                  totalAmount: finalAmount,
                  paymentMethod: 'razorpay',
                },
              }),
            });

            if (!verifyResponse.ok) {
              const errorData = await verifyResponse.json();
              throw new Error(errorData.error || 'Payment verification failed');
            }

            // Send confirmation email
            await fetch('/api/bookings/email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                booking: {
                  id: orderId,
                  startDate: formData.startDate,
                  participants: formData.participants,
                  totalAmount: finalAmount,
                  paymentMethod: 'razorpay',
                },
                paymentId: response.razorpay_payment_id,
                trek: {
                  title: 'Valley of Flowers Trek',
                },
              }),
            });

            onPaymentSuccess();
          } catch (error: any) {
            console.error('Error in payment handler:', error);
            setError('Payment verification failed. Please contact support with your payment ID: ' + response.razorpay_payment_id);
            setIsLoading(false);
          }
        },
        prefill: {
          name: formData.participants[0].fullName,
          email: formData.participants[0].email,
          contact: formData.participants[0].phone,
        },
        theme: {
          color: '#85d4d6',
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setError('Payment cancelled by user');
            setIsLoading(false);
            setRetryCount(prev => prev + 1);
            if (retryCount >= 2) {
              setShowFallback(true);
            }
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      
      razorpay.on('payment.failed', function(response: any) {
        console.error('Payment failed:', response.error);
        setError(`Payment failed: ${response.error.description}`);
        setIsLoading(false);
        setRetryCount(prev => prev + 1);
        if (retryCount >= 2) {
          setShowFallback(true);
        }
      });

      razorpay.open();
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      setError(error.message || 'Failed to initiate payment. Please try again.');
      setIsLoading(false);
      setRetryCount(prev => prev + 1);
      if (retryCount >= 2) {
        setShowFallback(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Trek Fee (₹{trekFee} × {formData.numberOfParticipants})</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹{gstAmount.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-semibold">
            <span>Total Amount</span>
            <span>₹{finalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                paymentMethod === method.id
                  ? 'border-[#85d4d6] bg-[#85d4d6]/5'
                  : 'border-gray-200 hover:border-[#85d4d6]/50'
              }`}
            >
              <input
                type="radio"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <div className={`mr-3 ${paymentMethod === method.id ? 'text-[#85d4d6]' : 'text-gray-400'}`}>
                    {method.icon}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-500">{method.description}</div>
                  </div>
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 ml-4 flex items-center justify-center ${
                paymentMethod === method.id ? 'border-[#85d4d6] bg-white' : 'border-gray-300'
              }`}>
                {paymentMethod === method.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#85d4d6]" />
                )}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Payment Details based on selected method */}
      {paymentMethod === 'bank' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="font-medium mb-4">Bank Transfer Details</h4>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-500">Account Name:</span> {bankDetails.accountName}</p>
            <p><span className="text-gray-500">Account Number:</span> {bankDetails.accountNumber}</p>
            <p><span className="text-gray-500">IFSC Code:</span> {bankDetails.ifscCode}</p>
            <p><span className="text-gray-500">Bank:</span> {bankDetails.bankName}</p>
            <p><span className="text-gray-500">Branch:</span> {bankDetails.branch}</p>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <h4 className="font-medium mb-4">UPI Payment</h4>
          <div className="max-w-[200px] mx-auto mb-4">
            <Image
              src={upiDetails.qrCode}
              alt="UPI QR Code"
              width={200}
              height={200}
              className="w-full h-auto"
            />
          </div>
          <p className="text-sm text-gray-500">UPI ID: {upiDetails.id}</p>
          <p className="text-sm text-gray-500 mt-2">Scan QR code or use UPI ID to pay</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg whitespace-pre-line">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <button
          type="button"
          onClick={handlePayment}
          disabled={isLoading}
          className={`w-full bg-[#85d4d6] text-white py-3 rounded-lg transition-colors ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#6bc4c6]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            getPaymentButtonText()
          )}
        </button>
      </div>

      <p className="text-sm text-gray-500 text-center">
        {getPaymentDescription()}
      </p>
    </div>
  );

  function getPaymentButtonText() {
    switch (paymentMethod) {
      case 'razorpay':
        return 'Pay with Razorpay';
      case 'upi':
        return 'Confirm UPI Payment';
      case 'cash':
        return 'Confirm Cash Payment';
      case 'bank':
        return 'Confirm Bank Transfer';
      default:
        return 'Proceed to Payment';
    }
  }

  function getPaymentDescription() {
    switch (paymentMethod) {
      case 'razorpay':
        return 'Payment will be processed securely via Razorpay';
      case 'upi':
        return 'Please complete the UPI payment and click confirm';
      case 'cash':
        return 'Please pay the amount in cash at our office';
      case 'bank':
        return 'Please make the bank transfer and click confirm';
      default:
        return '';
    }
  }
};

const BookingConfirmation = ({ formData }: { formData: BookingFormData }) => (
  <div className="text-center space-y-6">
    <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-2xl font-semibold text-gray-900">Booking Confirmed!</h2>
    <p className="text-gray-600">
      Thank you for booking with Scoutripper. Your trek is scheduled for {formData.startDate}.
    </p>
    <div className="bg-white p-6 rounded-lg shadow-sm text-left">
      <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm text-gray-600">Number of Participants</dt>
          <dd className="text-gray-900">{formData.numberOfParticipants}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Lead Participant</dt>
          <dd className="text-gray-900">{formData.participants[0].fullName}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-600">Contact Email</dt>
          <dd className="text-gray-900">{formData.participants[0].email}</dd>
        </div>
      </dl>
    </div>
    <p className="text-sm text-gray-500">
      A confirmation email has been sent with detailed instructions.
    </p>
  </div>
);

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>({
    startDate: '',
    numberOfParticipants: 1,
    participants: [{
      fullName: '',
      email: '',
      phone: '',
      address: '',
      emergencyContact: '',
      specialRequirements: '',
    }],
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isConfirmed, setIsConfirmed] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    if (step === 1) {
      if (!formData.startDate) {
        newErrors.startDate = ['Please select a start date'];
      }
      if (formData.numberOfParticipants < 1 || formData.numberOfParticipants > 10) {
        newErrors.numberOfParticipants = ['Number of participants must be between 1 and 10'];
      }
    } else if (step === 2) {
      formData.participants.forEach((participant, index) => {
        const participantErrors = validateParticipant(participant);
        Object.entries(participantErrors).forEach(([field, messages]) => {
          newErrors[`participants.${index}.${field}`] = messages;
        });
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Validate all steps before proceeding to payment
      const step1Valid = validateStep(1);
      const step2Valid = validateStep(2);
      
      if (step1Valid && step2Valid) {
        handlePayment();
      } else {
        // If validation fails, go back to the first step with errors
        setCurrentStep(1);
      }
    }
  };

  const handlePayment = async () => {
    // Payment handling logic will be implemented here
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <main className="min-h-screen pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <BookingConfirmation formData={formData} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {['Trek Details', 'Participants', 'Payment'].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 === currentStep
                      ? 'bg-[#85d4d6] text-white'
                      : index + 1 < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-600">{step}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-[#85d4d6] -translate-y-1/2 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <TrekDetailsStep formData={formData} setFormData={setFormData} errors={errors} />
              )}
              {currentStep === 2 && (
                <ParticipantsStep formData={formData} setFormData={setFormData} errors={errors} />
              )}
              {currentStep === 3 && (
                <PaymentStep formData={formData} onPaymentSuccess={handlePayment} />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className={`px-6 py-2 bg-[#85d4d6] text-white rounded-lg hover:bg-[#6bc4c6] transition-colors ${
                currentStep === 1 ? 'ml-auto' : ''
              }`}
            >
              {currentStep === 3 ? 'Confirm Booking' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
} 