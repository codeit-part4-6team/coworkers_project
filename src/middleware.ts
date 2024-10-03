import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken');

  // 인증 토큰이 있으면 홈으로 리다이렉트
  if (req.nextUrl.pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// 이 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/((?!^$|^signin$|^signup$).*)'], // 미들웨어를 적용할 경로
};
