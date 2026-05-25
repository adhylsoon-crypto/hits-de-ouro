import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookieStore = request.cookies;
    const hasSession = Array.from(cookieStore.getAll()).some(
      c => c.name.includes('auth-token') || c.name.includes('sb-')
    );
    if (!hasSession) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};