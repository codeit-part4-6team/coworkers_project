import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { signInProvider } from '@/lib/auth';
import axios from 'axios';

export default function GoogleAuth() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleLogin = async (authCode: string) => {
    try {
      console.log("여기까지옴");
      // 구글 인증 코드로 서버 API 호출
      const response = await axios.get(`/api/googleToken?code=${authCode}`);
      const accessToken = response.data.access_token;

      console.log(accessToken);

      if (!response) {
        throw new Error('Failed to fetch tokens');
      }

      if (accessToken) {
        const providerResponse = await signInProvider(
          'GOOGLE',
          'test',
          'http://localhost:3000/socialauth/google',
          accessToken,
        );

        // 로그인 정보 저장
        localStorage.setItem('accessToken', providerResponse.data.accessToken);
        localStorage.setItem('refreshToken', providerResponse.data.refreshToken);
        localStorage.setItem('userData', JSON.stringify(providerResponse.data.user));

        // 실 서비스 페이지로 이동
        router.push('/');
      }
    } catch (error) {
      setErrorMessage('로그인 처리 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  useEffect(() => {
    // URL에서 구글 인증 코드 추출
    const authCode = new URLSearchParams(window.location.search).get('code');

    if (authCode) {
      handleGoogleLogin(authCode);
    } else {
      setErrorMessage('로그인에 필요한 토큰이 없습니다.');
    }
  }, []);

  return (
    <div>
      {errorMessage ? <p>{errorMessage}</p> : <p>로그인 중입니다...</p>}
    </div>
  );
}
