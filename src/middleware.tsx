import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken');

  const publicPaths = ['/signin', '/signup', '/reset-password'];
  // console.log(req.nextUrl.pathname);
  // console.log(token);
  if (publicPaths.includes(req.nextUrl.pathname)) {
    if (token) {
      console.log('토큰이 있으면안되는 곳', req.nextUrl.pathname);
      return NextResponse.redirect(new URL('/', req.url));
    }
    console.log('토큰이 없으니 됨', req.nextUrl.pathname);
    return NextResponse.next();
  } else if(req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }
   else {
    if (token) {
      console.log('토큰이 있으니 됨', req.nextUrl.pathname);
      return NextResponse.next();
    } else {
      console.log('토큰이 없으면안되는 곳', req.nextUrl.pathname);
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};