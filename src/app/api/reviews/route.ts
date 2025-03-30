import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

interface ReviewWithUser {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: {
    name: string | null;
  };
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to submit a review' },
        { status: 401 }
      );
    }

    const { type, itemId, rating, comment } = await request.json();

    // Validate required fields
    if (!type || !itemId || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating is between 1 and 5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        type,
        itemId,
        rating,
        comment,
        userId: session.user.id,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const itemId = searchParams.get('itemId');

    if (!type || !itemId) {
      return NextResponse.json(
        { error: 'Missing type or itemId parameter' },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        type,
        itemId,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Format the reviews to match the expected interface
    const formattedReviews = reviews.map((review: ReviewWithUser) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      userName: review.user.name || 'Anonymous',
      createdAt: review.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 