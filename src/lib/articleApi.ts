import { basicAuthAxios } from './basicAxios';

//게시글생성
export const createArticle = (articleData: {
  image: string;
  content: string;
  title: string;
}) => {
  return basicAuthAxios.post(`/articles`, articleData);
};

//게시글 목록 조회
export const getArticle = () => {
  return basicAuthAxios.get(`/articles`);
};

//게시글 상세 조회
export const getDetailArticle = (articleid: number) => {
  return basicAuthAxios.get(`/articles/${articleid}`);
};
