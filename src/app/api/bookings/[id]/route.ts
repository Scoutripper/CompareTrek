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

interface RazorpayOrderNotes {
  trekDate?: string;
  participants?: any;
  leadParticipant?: string;
  paymentMethod?: string;
}

interface RazorpayOrder {
  id: string;
  amount: number;
  status: 'created' | 'attempted' | 'paid';
  notes?: RazorpayOrderNotes;
  payments?: Array<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Validate booking ID format
    if (!id.match(/^(order_|CASH_|BANK_|UPI_)/)) {
      return NextResponse.json(
        { error: 'Invalid booking ID format' },
        { status: 400 }
      );
    }

    // Check if it's a Razorpay order
    if (id.startsWith('order_')) {
      if (!razorpay) {
        return NextResponse.json(
          { error: 'Payment system is not configured' },
          { status: 503 }
        );
      }

      try {
        const order = await razorpay.orders.fetch(id) as RazorpayOrder;
        
        // Map Razorpay status to our status
        let status: 'pending' | 'confirmed' | 'failed';
        switch (order.status) {
          case 'paid':
            status = 'confirmed';
            break;
          case 'attempted':
            status = 'failed';
            break;
          default:
            status = 'pending';
        }

        // Validate required fields
        if (!order.notes?.trekDate) {
          console.error('Missing trek date in order notes:', order);
          return NextResponse.json(
            { error: 'Invalid booking data' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          id: order.id,
          amount: Number(order.amount) / 100,
          status,
          paymentMethod: order.notes?.paymentMethod || 'razorpay',
          paymentId: order.payments?.[0]?.id,
          startDate: order.notes.trekDate,
          participants: order.notes?.participants || [],
          leadParticipant: order.notes?.leadParticipant,
        });
      } catch (error: any) {
        console.error('Razorpay order fetch error:', error);
        if (error.statusCode === 404) {
          return NextResponse.json(
            { error: 'Booking not found' },
            { status: 404 }
          );
        }
        return NextResponse.json(
          { error: 'Failed to fetch booking details from payment provider' },
          { status: 500 }
        );
      }
    }

    // Handle cash/bank/UPI bookings
    if (id.startsWith('CASH_') || id.startsWith('BANK_') || id.startsWith('UPI_')) {
      // In a real app, fetch from database
      // For now, return mock data
      const paymentMethod = id.split('_')[0].toLowerCase();
      const amount = id.split('_')[2] ? parseFloat(id.split('_')[2]) : 0;
      
      if (isNaN(amount)) {
        return NextResponse.json(
          { error: 'Invalid booking amount' },
          { status: 400 }
        );
      }

      // Validate amount range
      if (amount < 100 || amount > 1000000) {
        return NextResponse.json(
          { error: 'Booking amount out of valid range' },
          { status: 400 }
        );
      }

      return NextResponse.json({
        id,
        amount,
        status: 'pending',
        paymentMethod,
        startDate: new Date().toISOString(),
        participants: [],
      });
    }

    return NextResponse.json(
      { error: 'Invalid booking ID format' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    );
  }
} 