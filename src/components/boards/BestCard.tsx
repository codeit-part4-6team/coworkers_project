import { useState, useEffect } from 'react';
import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';
import RedHeart from '@/assets/heart_red.svg';
import Medal from '@/assets/medal.svg';
import { useRouter } from 'next/router';
import { isLike, deleteLike, getDetailArticle } from '@/lib/articleApi';

interface Article {
  id: number;
  title: string;
  image?: string;
  writer: {
    nickname: string;
    id: number;
  };
  createdAt: string;
  likeCount: number;
}

interface BestCardProps {
  board: Article;
}

const BestCard = ({ board }: BestCardProps) => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(board.likeCount);
  const [isLiked, setIsLiked] = useState(false);

  const fetchArticleDetail = async () => {
    try {
      const response = await getDetailArticle(board.id);
      setLikeCount(response.data.likeCount);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error('게시글 상세 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
  }, [board.id]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (!isLiked) {
        await isLike(board.id);
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      } else {
        await deleteLike(board.id);
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    } catch (error) {
      console.error('좋아요 요청 에러:', error);
    }
  };

  const handleBestClick = () => {
    router.push(`/boards/${board.id}`);
  };

  return (
    <div
      className="border border-background-tertiary rounded-[12px] bg-background-secondary pt-[9px] px-4 pb-4 flex flex-col justify-between"
      onClick={handleBestClick}
    >
      <div>
        <div className="flex items-center gap-1 mb-[14px]">
          <Medal />
          <p className="text-md font-semibold text-text-primary">Best</p>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-text-secondary text-md font-medium">
              {board.title}
            </p>
          </div>
          {board.image && (
            <img
              src={board.image}
              alt="게시글 이미지"
              className="rounded-[12px] w-[72px] h-[72px] object-cover"
            />
          )}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-text-default mt-3">
          {new Date(board.createdAt).toLocaleDateString()}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <Profile />
            <p className="text-xs font-medium text-text-primary">
              {board.writer.nickname}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLikeClick}
            >
              {isLiked ? <RedHeart /> : <Heart />}
              <p className="text-text-default text-xs font-regular">
                {likeCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCard;
