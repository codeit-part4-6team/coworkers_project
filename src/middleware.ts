import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('authToken'); // 인증 토큰을 쿠키에서 가져옵니다.
  const { pathname } = req.nextUrl; // 요청 URL 경로를 가져옵니다.

  // 토큰이 없는 경우 접근 허용 페이지를 설정합니다.
  const publicPaths = ['/', '/signin', '/signup', '/passreset'];

  // 현재 경로가 publicPaths에 없고 토큰이 없으면 랜딩 페이지로 리다이렉트합니다.
  if (!publicPaths.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/', req.url)); // 랜딩 페이지로 리다이렉트
  }

  // 조건에 맞지 않으면 요청을 계속 진행합니다.
  return NextResponse.next();
}

// 이 미들웨어가 적용될 경로 설정
export const config = {
  matcher: ['/((?!^$|^signin$|^signup$|^passreset$).*)'], // 미들웨어를 적용할 경로
};
