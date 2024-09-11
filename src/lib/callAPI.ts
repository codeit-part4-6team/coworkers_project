import axios, { AxiosHeaders } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface APIProps {
  method: 'get' | 'put' | 'post' | 'patch' | 'delete';
  url: string;
  body?: any;
  apiName: string;
  headers?: AxiosHeaders;
}

function errorCheck(method: string, apiName: string) {
  const errorMessage: { [key: string]: string } = {
    get: `${apiName}의 데이터를 받아오는데 실패하였습니다.`,
    put: `${apiName}의 데이터 수정에 실패하였습니다.`,
    post: `${apiName}에 데이터를 전송하는데 실패하였습니다.`,
    patch: `${apiName}의 데이터 수정에 실패하였습니다.`,
    delete: `${apiName}의 데이터 삭제에 실패하였습니다.`,
  };
  return errorMessage[method] || `알 수 없는 에러가 발생하였습니다.;`;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

async function callAPI({
  method,
  url,
  body = null,
  apiName,
  headers,
}: APIProps) {
  const accessToken = localStorage.getItem('accessToken');

  const defaultHeaders = new AxiosHeaders({
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    'Content-Type': 'application/json',
  });

  try {
    const response = await apiClient({
      method,
      url,
      data: body !== null ? body : undefined,
      headers: { ...defaultHeaders, ...headers },
    });
    return response.data;
  } catch (error) {
    console.log(errorCheck(method, apiName));
  }
}

export default callAPI;
