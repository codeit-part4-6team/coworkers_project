import { basicAuthAxios, basicAxios } from './basicAxios';

//게시글생성
export const createArticle = (articleData: {
  image: string | null;
  content: string;
  title: string;
}) => {
  return basicAuthAxios.post(`/articles`, articleData);
};

//게시글 목록 조회
export const getArticle = (params: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}) => {
  return basicAuthAxios.get(`/articles`, { params });
};

//게시글 상세 조회
export const getDetailArticle = (articleid: number) => {
  return basicAxios.get(`/articles/${articleid}`);
};

//게시글 삭제
export const deleteArticle = (articleid: number) => {
  return basicAuthAxios.delete(`/articles/${articleid}`);
};

//게시글 수정
export const editArticle = (
  articleid: number,
  articleData: {
    image: string | null;
    content: string;
    title: string;
  },
) => {
  return basicAuthAxios.patch(`/articles/${articleid}`, articleData);
};

//게시글 좋아요
export const isLike = (articleid: number) => {
  return basicAuthAxios.post(`/articles/${articleid}/like`);
};

//게시글 좋아요 취소
export const deleteLike = (articleid: number) => {
  return basicAuthAxios.delete(`/articles/${articleid}/like`);
};

//이미지 처리
export const imageFile = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);
  return basicAuthAxios.post(`/iamges/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/foram-data',
    },
  });
};

//댓글 생성
export const createComment = (articleid: number, content: string) => {
  return basicAuthAxios.post(`/articles/${articleid}/comments`, { content });
};

//댓글 목록 조회
export const getComment = (articleid: number, limit: number = 99) => {
  return basicAxios.get(`/articles/${articleid}/comments`, {
    params: { limit },
  });
};

//댓글 수정
export const editComment = (commentid: number, content: string) => {
  return basicAuthAxios.patch(`/comments/${commentid}`, { content });
};

//댓글 삭제
export const deleteComment = (commentid: number) => {
  return basicAuthAxios.delete(`/comments/${commentid}`);
};
