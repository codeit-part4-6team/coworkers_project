import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';

export default function KakaoAuth() {
  const router = useRouter();
  const { provider, isPending } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 성공 후 처리할 함수
  const handleKakaoLogin = async (authToken: string) => {
    // 로그인 요청
    const success = await provider(
      'KAKAO',
      'test',
      'https://coworkers-project.vercel.app/signup/kakao',
      authToken,
    );
    if (success) {
      router.push('/'); // 로그인 성공 시 홈으로 리다이렉트
    } else {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
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
      alert('로그인에 필요한 토큰이 없습니다.');
    }
  }, []);

  return (
    <div>
      {errorMessage ? <p>{errorMessage}</p> : <p>로그인 중입니다...</p>}
    </div>
  );
}
