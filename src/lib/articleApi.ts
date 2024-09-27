import { basicAuthAxios, basicAxios } from './basicAxios';

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

//게시글 좋아요
export const isLike = (articleid: number) => {
  return basicAuthAxios.post(`/articles/${articleid}/like`);
};

//댓글 생성
export const createComment = (
  articleid: number,
  commentData: {
    writer: {
      image: string;
      nickname: string;
      id: number;
    };
    content: string;
  },
) => {
  return basicAuthAxios.post(`/articles/${articleid}/comments`, commentData);
};

//댓글 목록 조회
export const getComment = (articleid: number, limit: number = 99) => {
  return basicAxios.get(`/articles/${articleid}/comments`, {
    params: { limit },
  });
};
