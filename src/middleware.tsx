import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');

  const publicPaths = ['/signin', '/signup', '/reset-password', '/signup/kakao'];
  if (publicPaths.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  } else if (req.nextUrl.pathname === '/') {
    return NextResponse.next();
  } else {
    if (token) {
      return NextResponse.next();
    } else {
      console.log(req.nextUrl.pathname, '왜 여기인거지?');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
