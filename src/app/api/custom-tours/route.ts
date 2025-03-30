import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const session = await getServerSession(authOptions);

    // Validate required fields
    const requiredFields = [
      'name',
      'email',
      'phone',
      'destination',
      'groupSize',
      'startDate',
      'duration',
      'budget',
      'accommodation',
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create custom tour request in database
    const customTour = await prisma.customTour.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        destination: data.destination,
        groupSize: parseInt(data.groupSize),
        startDate: new Date(data.startDate),
        duration: parseInt(data.duration),
        budget: parseInt(data.budget),
        accommodation: data.accommodation,
        activities: data.activities,
        requirements: data.requirements,
        userId: session?.user?.id,
        status: 'pending',
      },
    });

    // Send email notification (implement your email service here)
    // await sendEmail({
    //   to: data.email,
    //   subject: 'Custom Tour Request Received',
    //   text: `Thank you for your custom tour request. We'll get back to you soon.`,
    // });

    return NextResponse.json(customTour);
  } catch (error) {
    console.error('Error creating custom tour request:', error);
    return NextResponse.json(
      { error: 'Failed to create custom tour request' },
      { status: 500 }
    );
  }
} 