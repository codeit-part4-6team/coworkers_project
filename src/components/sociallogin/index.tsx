import GoogleIcon from '@/assets/google.svg';
import KakaoIcon from '@/assets/kakaotalk.svg';
import { useEffect } from 'react';

const KAKAO_REST_API_KEY = '62392d117c841d16a81ab6b783a7b35a';
const KAKAO_REDIRECT_URI = `http://localhost:3000/socialauth/kakao`;

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

export default function SocialLogin() {
  const KakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const GoogleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;

console.log(GoogleLink);

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
      <p>fasdfsdaf</p>
      <KakaoIcon onClick={loginEvent} />
      <GoogleIcon onClick={googleLoginEvent} />
    </div>
  );
}
