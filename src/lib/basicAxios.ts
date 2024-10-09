import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const basicAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 엑세스 토큰 포함 Axios
export const basicAuthAxios: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

basicAuthAxios.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('accessToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 액세스 토큰 갱신 함수
const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refreshToken'); // 쿠키에서 리프레시 토큰 가져오기
  if (!refreshToken) {
    throw new Error('리프레시 토큰이 없습니다.');
  }

  const response = await axios.post(`${baseURL}/auth/refresh-token`, { token: refreshToken });
  const { accessToken } = response.data; // API 응답에서 새로운 액세스 토큰 가져오기

  Cookies.set('accessToken', accessToken); // 새로운 액세스 토큰을 쿠키에 저장
  return accessToken; // 새로운 액세스 토큰 반환
};

// 응답 인터셉터 추가: 토큰 만료 처리
basicAuthAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 에러가 토큰 만료로 인한 것인지 확인
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const newAccessToken = await refreshAccessToken(); // 새로운 액세스 토큰 요청
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // 원래 요청에 새로운 토큰 설정
        return basicAuthAxios(originalRequest); // 원래 요청 재시도
      } catch (refreshError) {
        // 리프레시 토큰 실패 처리 (예: 사용자 로그아웃, 로그인 페이지로 리디렉션)
        console.error('리프레시 토큰 실패:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
      }
    }

    return Promise.reject(error); // 다른 에러에 대한 거부
  }
);
