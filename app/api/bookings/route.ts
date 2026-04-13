import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'buffd.nz@gmail.com',
      subject: 'Buffd test booking',
      text: JSON.stringify(body, null, 2),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Mailer error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown mailer error',
      },
      { status: 500 }
    );
  }
}