import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const cookies = request.cookies.getAll();
    const hasAuth = cookies.some(c => 
      c.name.includes('auth') || 
      c.name.includes('sb-') ||
      c.name.includes('supabase')
    );
    if (!hasAuth) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};