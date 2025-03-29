import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay only if credentials are available
let razorpay: Razorpay | null = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.error('Razorpay credentials are missing in environment variables');
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function createRazorpayOrder(data: any, attempt = 1): Promise<any> {
  try {
    console.log(`Attempt ${attempt} to create Razorpay order:`, {
      amount: data.amount,
      currency: data.currency,
      receipt: data.receipt,
    });

    const order = await razorpay!.orders.create({
      amount: Math.round(data.amount * 100),
      currency: data.currency,
      receipt: data.receipt,
      notes: data.notes,
    });

    console.log('Order created successfully:', {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: order.status,
    });

    return order;
  } catch (error: any) {
    console.error(`Attempt ${attempt} failed:`, {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
      description: error.error?.description,
    });

    if (attempt < MAX_RETRIES) {
      console.log(`Retrying after ${RETRY_DELAY}ms...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return createRazorpayOrder(data, attempt + 1);
    }

    throw error;
  }
}

async function createCashBooking(data: any): Promise<any> {
  try {
    // Generate a unique booking ID for cash payments
    const bookingId = `CASH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Here you would typically save the booking to your database
    // For now, we'll just return a mock response
    return {
      id: bookingId,
      amount: data.amount,
      currency: data.currency,
      status: 'pending',
      notes: {
        ...data.notes,
        paymentMethod: 'cash',
      },
    };
  } catch (error: any) {
    console.error('Failed to create cash booking:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    // Log environment check
    console.log('Environment check:', {
      node_env: process.env.NODE_ENV,
      razorpay_key_exists: !!process.env.RAZORPAY_KEY_ID,
      razorpay_secret_exists: !!process.env.RAZORPAY_KEY_SECRET,
    });

    const body = await request.json();
    const { amount, currency = 'INR', receipt, notes, paymentMethod = 'razorpay' } = body;

    // Detailed request validation
    const validationErrors = [];
    if (!amount) validationErrors.push('Amount is required');
    if (amount <= 0) validationErrors.push('Amount must be greater than 0');
    if (!receipt) validationErrors.push('Receipt ID is required');

    if (validationErrors.length > 0) {
      console.error('Validation errors:', validationErrors);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    console.log('Processing booking request:', {
      amount,
      currency,
      receipt,
      notes,
      paymentMethod,
      timestamp: new Date().toISOString(),
    });

    let result;
    if (paymentMethod === 'cash') {
      // Generate a unique booking ID for cash payments
      const bookingId = `CASH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      result = {
        id: bookingId,
        amount: amount,
        currency: currency,
        status: 'pending',
        notes: {
          ...notes,
          paymentMethod: 'cash',
        },
      };
    } else {
      if (!razorpay) {
        return NextResponse.json(
          { error: 'Payment system is not configured' },
          { status: 503 }
        );
      }

      // Create Razorpay order
      const order = await razorpay.orders.create({
        amount: Math.round(amount * 100),
        currency: currency,
        receipt: receipt,
        notes: notes,
      });

      result = {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        notes: notes,
      };
    }

    if (!result || !result.id) {
      throw new Error('Failed to create order');
    }

    return NextResponse.json({
      orderId: result.id,
      amount: result.amount,
      currency: result.currency,
      status: result.status,
      paymentMethod,
    });
  } catch (error: any) {
    console.error('Booking creation failed:', {
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
      description: error.error?.description,
      stack: error.stack,
    });

    // Determine appropriate error response
    if (error.statusCode === 401) {
      return NextResponse.json(
        { error: 'Invalid Razorpay credentials' },
        { status: 401 }
      );
    }

    if (error.error?.description) {
      return NextResponse.json(
        { error: error.error.description },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
} 