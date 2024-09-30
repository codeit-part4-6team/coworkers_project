import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signInProvider } from '@/lib/auth'; // 여기서 signInProvider를 사용

export default function KakaoAuth() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 성공 후 처리할 함수
  const handleKakaoLogin = async (authToken: string) => {
    try {
      // signInProvider로 인증 요청
      const response = await signInProvider('KAKAO', 'test', 'http://localhost:3000/signup/kakao', authToken);
      //로그인 정보 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      
      //실 이용 페이지로 이동
      router.push('/');
    } catch (error) {
      setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    // 리다이렉트된 URL에서 authToken을 추출
    const authToken = new URLSearchParams(window.location.search).get('code');

    if (authToken) {
      // 토큰이 있으면 로그인 처리 함수 호출
      handleKakaoLogin(authToken);
    } else {
      setErrorMessage('로그인에 필요한 토큰이 없습니다.');
    }
  }, []);

  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <p>로그인 중입니다...</p>
      )}
    </div>
  );
}
