import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken'); // 쿠키에서 accessToken 가져옴

  // 공개적으로 접근 가능한 경로 목록
  const publicPaths = ['/', '/signin', '/signup', '/reset-password'];

  // 요청 경로 추출
  const { pathname } = req.nextUrl;

  // 공개 경로일 때 처리
  if (publicPaths.includes(pathname)) {
    if (token) {
      // 이미 로그인 상태인데, 공개 경로에 접근하려는 경우 -> 홈 페이지로 리디렉트
      return NextResponse.redirect(new URL('/group', req.url));
    }
    // 로그인하지 않은 경우 -> 요청 계속 진행
    return NextResponse.next();
  } else {
    // 보호된 경로일 때 처리
    if (!token) {
      // 로그인하지 않은 상태에서 보호된 경로 접근 -> 로그인 페이지로 리디렉트
      return NextResponse.redirect(new URL('/signin', req.url));
    }
    // 로그인한 상태이면 요청 계속 진행
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
