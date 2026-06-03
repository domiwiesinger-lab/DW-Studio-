/**
 * POST /api/contact
 * Handles contact form submissions.
 *
 * Environment variables (set via: wrangler secret put KEY):
 *   RESEND_API_KEY   — Resend.com API key for transactional email
 *   CONTACT_EMAIL    — recipient address (e.g. hello@aerial-estates.com)
 */
export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return json({ error: 'Name, email, and message are required.' }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ error: 'Invalid email address.' }, 400);
    }

    // Send via Resend (https://resend.com) — swap for any email provider
    if (context.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Aerial Estates <noreply@aerial-estates.com>',
          to:   [context.env.CONTACT_EMAIL ?? 'hello@aerial-estates.com'],
          reply_to: email,
          subject: `[Contact] ${subject ?? 'New enquiry'} — ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error('Resend error:', err);
        return json({ error: 'Failed to send message. Please try again.' }, 502);
      }
    } else {
      // Dev fallback — log to console when no API key is set
      console.log('[contact form]', { name, email, subject, message });
    }

    return json({ message: 'Message sent — thank you! I\'ll be in touch shortly.' });
  } catch (err) {
    console.error('contact handler error:', err);
    return json({ error: 'Internal server error.' }, 500);
  }
}

// Reject anything that isn't a POST
export async function onRequest() {
  return json({ error: 'Method not allowed.' }, 405);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
