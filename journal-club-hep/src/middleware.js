import createMiddleware from 'next-intl/middleware'; // 1. Import the middleware creator
import {routing} from './i18n/routing';// 2. Import your routing configuration

// 3. Create (gatekeeper) and export the middleware with your routing configuration

export default createMiddleware(routing); // when someone visits / (no locale in URL), they will be redirected to /en (default locale)

export const config = {
  matcher: '/((?!api|_next|_vercel|.*\\..*).*)' // 4. It says run this middleware on all routes except for API routes, Next internal files (_next), Vercel files (_vercel), and static files (.*\\..*) like images, . js, .css, etc.
};