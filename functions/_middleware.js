/**
 * Cloudflare Pages Middleware
 * Runs on every request — adds security headers and CORS.
 */
export async function onRequest(context) {
  const response = await context.next();

  const headers = new Headers(response.headers);

  // Security headers
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ')
  );

  // CORS — restrict to your own domain in production
  const origin = context.request.headers.get('Origin');
  const allowed = ['https://aerial-estates.com', 'https://www.aerial-estates.com'];
  if (origin && (allowed.includes(origin) || context.env.ENVIRONMENT === 'preview')) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return new Response(response.body, { status: response.status, headers });
}
