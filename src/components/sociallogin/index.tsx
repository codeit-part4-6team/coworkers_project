import GoogleIcon from '@/assets/google.svg';
import KakaoIcon from '@/assets/kakaotalk.svg';
import { useEffect } from 'react';

const KAKAO_REST_API_KEY = '62392d117c841d16a81ab6b783a7b35a';
const KAKAO_REDIRECT_URI = `http://localhost:3000/signup/kakao`;

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export default function SocialLogin() {
  const KakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const GoogleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;

  const loginEvent = () => {
    window.location.href = KakaoLink;
  };

  const googleLoginEvent = () => {
    window.location.href = GoogleLink;
  };

  useEffect(() => {
    if (window.location.href) {
    }
  }, []);

  return (
    <div>
      <div className="flex items-center mb-4">
        <hr className="flex-grow border-t border-border-primary-10" />
        <span className="mx-6 text-lg font-medium text-text-inverse">OR</span>
        <hr className="flex-grow border-t border-border-primary-10" />
      </div>
      <div
        className={`text-text-primary text-lg font-medium flex justify-between items-center`}
      >
        <p>간편 로그인 하기</p>
        <button onClick={loginEvent}><KakaoIcon /></button>
        {/* <GoogleIcon onClick={googleLoginEvent} /> */}
      </div>
    </div>
  );
}
