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
      'organizerName',
      'organizerEmail',
      'organizerPhone',
      'organizationType',
      'groupType',
      'groupSize',
      'preferredDestination',
      'preferredDate',
      'duration',
      'budget',
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create group booking in database
    const groupBooking = await prisma.groupBooking.create({
      data: {
        organizerName: data.organizerName,
        organizerEmail: data.organizerEmail,
        organizerPhone: data.organizerPhone,
        organizationType: data.organizationType,
        groupType: data.groupType,
        groupSize: parseInt(data.groupSize),
        preferredDestination: data.preferredDestination,
        preferredDate: new Date(data.preferredDate),
        duration: parseInt(data.duration),
        budget: parseInt(data.budget),
        requirements: data.requirements || '',
        status: 'pending',
        userId: session?.user?.id,
      },
    });

    // TODO: Send email notification to admin and user
    // const emailService = new EmailService();
    // await emailService.sendGroupBookingNotification(groupBooking);

    return NextResponse.json({ success: true, data: groupBooking });
  } catch (error) {
    console.error('Error in group booking submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit group booking request' },
      { status: 500 }
    );
  }
} 