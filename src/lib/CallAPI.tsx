import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_API_URL;

interface APIProps {
  method: 'get' | 'put' | 'post' | 'patch' | 'delete';
  query: string;
  body?: any;
  apiName: string;
}

function ErrorCheck(method: string, apiName: string) {
  const errorMessage: { [key: string]: string } = {
    get: `${apiName}의 데이터를 받아오는데 실패하였습니다.`,
    put: `${apiName}의 데이터 수정에 실패하였습니다.`,
    post: `${apiName}에 데이터를 전송하는데 실패하였습니다.`,
    patch: `${apiName}의 데이터 수정에 실패하였습니다.`,
    delete: `${apiName}의 데이터 삭제에 실패하였습니다.`,
  };
  return errorMessage[method] || `알 수 없는 에러가 발생하였습니다.;`;
}

async function callAPI({ method, query, body = null, apiName }: APIProps) {

  let order = query; // baseURL이 설정되어 있으므로 API_KEY를 제외합니다.
  try {
    const response = await axios({
      method,
      url: order,
      data: body !== null ? body : undefined,
    });
    return response.data;
  } catch (error) {
    console.log(ErrorCheck(method, apiName));
  }
}

export default callAPI;
