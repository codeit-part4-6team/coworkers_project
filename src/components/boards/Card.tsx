import { useState, useEffect } from 'react';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';
import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';
import RedHeart from '@/assets/heart_red.svg';
import {
  isLike,
  deleteLike,
  getDetailArticle,
  deleteArticle,
  deleteComment,
  editArticle,
  editComment,
} from '@/lib/articleApi';

interface CardProps {
  id: number;
  title: string;
  writerNickname: string;
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;
  hideHeart?: boolean;
  type: 'article' | 'comment';
  onDelete?: (id: number) => void;
}

const Card = ({
  id,
  title,
  writerNickname,
  createdAt,
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
  hideHeart = false,
  type,
  onDelete,
}: CardProps) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const kebabOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const kebabButton = (
    <div>
      <Kebab className="w-4 h-4 text-icon-primary" />
    </div>
  );

  const handleChange = async (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
    if (selectedOption.value === 'edit') {
      if (type === 'article') {
        // 게시글 수정
        console.log('게시글 수정 로직 실행');
      } else if (type === 'comment') {
        // 댓글 수정
        console.log('댓글 수정 로직 실행');
      }
    } else if (selectedOption.value === 'delete') {
      if (type === 'article') {
        try {
          await deleteArticle(id);
          console.log('게시글 삭제 성공');
          if (onDelete) onDelete(id);
        } catch (error) {
          console.error('게시글 삭제 실패:', error);
        }
      } else if (type === 'comment') {
        try {
          await deleteComment(id);
          console.log('댓글 삭제 성공');
          if (onDelete) onDelete(id);
        } catch (error) {
          console.error('댓글 삭제 실패:', error);
        }
      }
    }
  };

  const fetchArticleDetail = async () => {
    try {
      const response = await getDetailArticle(id);
      setLikeCount(response.data.likeCount);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.error('게시글 상세 정보 가져오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchArticleDetail();
  }, [id]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (!isLiked) {
        await isLike(id);
        setLikeCount(likeCount + 1);
      } else {
        await deleteLike(id);
        setLikeCount(likeCount - 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 요청 에러:', error);
    }
  };

  return (
    <div className="border rounded-[12px] bg-background-secondary border-background-tertiary pt-6 px-4 pb-4">
      <div className="flex justify-between md:flex-row">
        <div>
          <p className="text-text-secondary text-md font-medium">{title}</p>
          <p className="text-xs font-medium text-text-default mt-3">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="hidden md:block" onClick={(e) => e.stopPropagation()}>
          <Dropdown
            options={kebabOptions}
            onChange={handleChange}
            customButton={kebabButton}
            size="sm"
            direction="down"
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <Profile />
          <p className="text-xs font-medium text-text-primary">
            {writerNickname}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!hideHeart && (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLikeClick}
            >
              {isLiked ? <RedHeart /> : <Heart />}
              <p className="text-text-default text-xs font-regular">
                {likeCount}
              </p>
            </div>
          )}
          <div className="md:hidden flex" onClick={(e) => e.stopPropagation()}>
            <Dropdown
              options={kebabOptions}
              onChange={handleChange}
              customButton={kebabButton}
              size="sm"
              direction="up"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
