import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('admin_token');
  const isLoginPage = request.nextUrl.pathname === '/admin/login';
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');

  // Eğer admin sayfasına girmeye çalışıyorsa ve şifre çerezi yoksa login'e at
  if (isAdminPage && !isLoginPage && !authCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Eğer zaten giriş yapmışsa ve tekrar login sayfasına gitmeye çalışıyorsa panele at
  if (isLoginPage && authCookie) {
    return NextResponse.redirect(new URL('/admin/team', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};