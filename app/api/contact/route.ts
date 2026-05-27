import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_Y4ZMRogd_Hi4DjqigeEg6pXGwNG9LTKnB");

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "parthsarthisaxena95@gmail.com",
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              body { font-family: 'Inter', -apple-system, sans-serif; background: #0a0a0a; color: #ffffff; margin: 0; padding: 0; }
              .container { max-width: 560px; margin: 40px auto; background: #111111; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden; }
              .header { background: #111111; border-bottom: 1px solid #1e1e1e; padding: 28px 32px; }
              .header-label { font-size: 11px; color: #6e8ead; letter-spacing: 0.1em; font-family: monospace; margin-bottom: 6px; }
              .header h1 { font-size: 20px; font-weight: 700; color: #ffffff; margin: 0; }
              .body { padding: 28px 32px; }
              .field { margin-bottom: 20px; }
              .field-label { font-size: 11px; color: #52525b; letter-spacing: 0.08em; font-family: monospace; margin-bottom: 6px; }
              .field-value { font-size: 15px; color: #ffffff; line-height: 1.6; }
              .field-value a { color: #6e8ead; text-decoration: none; }
              .message-box { background: #0a0a0a; border: 1px solid #1e1e1e; border-radius: 8px; padding: 16px; margin-top: 6px; }
              .message-box p { font-size: 14px; color: #a1a1aa; line-height: 1.7; margin: 0; white-space: pre-wrap; }
              .footer { border-top: 1px solid #1e1e1e; padding: 20px 32px; }
              .footer p { font-size: 12px; color: #52525b; margin: 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="header-label">PORTFOLIO CONTACT</div>
                <h1>New message from ${name}</h1>
              </div>
              <div class="body">
                <div class="field">
                  <div class="field-label">FROM</div>
                  <div class="field-value">${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</div>
                </div>
                ${subject ? `<div class="field"><div class="field-label">SUBJECT</div><div class="field-value">${subject}</div></div>` : ""}
                <div class="field">
                  <div class="field-label">MESSAGE</div>
                  <div class="message-box"><p>${message.replace(/\n/g, "<br/>")}</p></div>
                </div>
              </div>
              <div class="footer">
                <p>Reply directly to this email to respond to ${name}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
