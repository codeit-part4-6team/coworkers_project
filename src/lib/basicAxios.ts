import axios, { AxiosInstance } from 'axios';

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
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzA3LCJ0ZWFtSWQiOiI3LTYiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcyNzI0MjAwOCwiZXhwIjoxNzI3MjQ1NjA4LCJpc3MiOiJzcC1jb3dvcmtlcnMifQ.bVeKClv1lY6X1BiriC-DfsiUDMGFoMmujWsnD8Ejr-E'
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
