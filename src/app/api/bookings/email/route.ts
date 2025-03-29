import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { booking, trek } = body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.participants[0].email,
      subject: `Booking Confirmation - ${trek.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #2d3748; text-align: center; padding: 20px 0;">
            Your Trek Booking is Confirmed!
          </h1>
          
          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4a5568; margin-bottom: 15px;">Booking Details</h2>
            <p><strong>Trek:</strong> ${trek.title}</p>
            <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>Participants:</strong> ${booking.participants.length}</p>
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Total Amount Paid:</strong> ₹${booking.totalAmount.toLocaleString()}</p>
          </div>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4a5568; margin-bottom: 15px;">Lead Participant</h2>
            <p><strong>Name:</strong> ${booking.participants[0].fullName}</p>
            <p><strong>Email:</strong> ${booking.participants[0].email}</p>
            <p><strong>Phone:</strong> ${booking.participants[0].phone}</p>
          </div>

          <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #4a5568; margin-bottom: 15px;">Important Information</h2>
            <ul style="padding-left: 20px;">
              <li>Please arrive at the starting point 30 minutes before the scheduled time.</li>
              <li>Carry all necessary documents and equipment mentioned in the trek guide.</li>
              <li>In case of any queries, contact our support team.</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #718096; font-size: 14px;">
              Thank you for choosing Scoutripper for your adventure!
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
} 