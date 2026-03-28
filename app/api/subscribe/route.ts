import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "invalid email address" },
        { status: 400 },
      );
    }

    // 1. Store the contact in Resend Audience
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email: email,
          unsubscribed: false,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
      } catch (e) {
        console.error("Error adding contact to audience:", e);
      }
    }

    // 2. Send the welcome email using the Resend REST API
    // Trying the 'variables' key which matches your template definition snippet
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Its Hover <hello@itshover.com>",
        to: email,
        subject: "welcome to the loop",
        template: {
          id: process.env.RESEND_TEMPLATE_ID,
          // Changing 'data' to 'variables' to match common template SDK patterns
          variables: {
            name: email.split("@")[0],
          },
        },
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", result);
      return NextResponse.json(
        { error: result.message || "failed to send email" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Subscription error:", err);
    return NextResponse.json({ error: "failed to subscribe" }, { status: 500 });
  }
}
