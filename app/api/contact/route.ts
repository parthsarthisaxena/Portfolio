import { NextRequest } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_EMAIL_FROM = process.env.RESEND_EMAIL_FROM;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

function buildErrorResponse(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  if (!RESEND_API_KEY || !RESEND_EMAIL_FROM || !CONTACT_EMAIL) {
    return buildErrorResponse("Email sending is not configured on the server.", 500);
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return buildErrorResponse("Invalid request body.");
  }

  const { name, email, subject, message } = body;

  if (!name || !email || !message) {
    return buildErrorResponse("Name, email, and message are required.");
  }

  const emailSubject = subject?.trim() ? subject.trim() : `Portfolio contact form message from ${name.trim()}`;
  const emailText = `New message from the portfolio contact form:

Name: ${name.trim()}
Email: ${email.trim()}
Subject: ${emailSubject}

Message:
${message.trim()}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_EMAIL_FROM,
      to: CONTACT_EMAIL,
      subject: emailSubject,
      text: emailText,
    }),
  });

  if (!resendResponse.ok) {
    const resendBody = await resendResponse.text();
    return buildErrorResponse(`Resend API error: ${resendBody}`, 502);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
