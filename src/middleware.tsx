import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken');

  const publicPaths = ['/', '/signin', '/signup', '/passreset'];

  // console.log(publicPaths.includes(req.nextUrl.pathname), Boolean(token));
  // 인증이 필요한 경로에 대해 처리
  if (token && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url)); // 랜딩 페이지로 리디렉션
  }

  // 로그인 페이지에서 토큰이 있는 경우 홈으로 리다이렉트
  if (req.nextUrl.pathname === '/signin' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname === '/signup' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// 이 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/((?!^$|^signin$|^signup$|^passreset$).*)'], // 미들웨어를 적용할 경로
};
