import { useState, useEffect } from 'react';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';
import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';
import RedHeart from '@/assets/heart_red.svg';
import Button from '../common/Button';
import {
  isLike,
  deleteLike,
  getDetailArticle,
  deleteArticle,
  deleteComment,
  editComment,
} from '@/lib/articleApi';
import { useRouter } from 'next/router';

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
  imageUrl?: string;
}

const Card = ({
  id,
  title: initialTitle,
  writerNickname,
  createdAt,
  likeCount: initialLikeCount,
  isLiked: initialIsLiked,
  hideHeart = false,
  type,
  onDelete,
  imageUrl,
}: CardProps) => {
  const router = useRouter();
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(initialTitle);
  const [title, setTitle] = useState(initialTitle);

  const kebabOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const kebabButton = (
    <div>
      <Kebab className="w-4 h-4 text-icon-primary" />
    </div>
  );

  const handleEditClick = () => {
    router.push(`/boards/${id}/edit`);
  };

  const handleChange = async (selectedOption: DropdownOption) => {
    if (selectedOption.value === 'edit') {
      if (type === 'article') {
        handleEditClick();
      } else if (type === 'comment') {
        setIsEditing(true);
      }
    } else if (selectedOption.value === 'delete') {
      if (type === 'article') {
        try {
          await deleteArticle(id);
          if (onDelete) onDelete(id);
        } catch (error) {
          console.error('게시글 삭제 실패:', error);
        }
      } else if (type === 'comment') {
        try {
          await deleteComment(id);
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
        setIsLiked(true);
      } else {
        await deleteLike(id);
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('좋아요 요청 에러:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(title);
  };

  const handleSaveEdit = async () => {
    try {
      await editComment(id, editedContent);
      setTitle(editedContent);
      setIsEditing(false);
    } catch (error) {
      console.error('댓글 수정 실패:', error);
    }
  };

  return (
    <div
      className={`border rounded-[12px] bg-background-secondary border-background-tertiary pt-6 px-4 pb-4 flex flex-col justify-between
        ${type === 'comment' ? 'h-full' : 'h-[176px]'}`}
    >
      <div>
        {isEditing ? (
          <div>
            <textarea
              className="border p-4 border-background-tertiary w-full rounded-[12px] bg-background-secondary focus:outline-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                option="solid"
                size="xsmall"
                text="저장"
                onClick={handleSaveEdit}
              />
              <button
                onClick={handleCancelEdit}
                className="w-[74px] h-8 px-[12px] text-md font-semibold bg-status-danger text-text-inverse rounded-[12px]"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between md:flex-row md:items-start">
            <p className="text-text-secondary text-md font-medium">{title}</p>
            <div className="flex items-start gap-2">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="게시글 이미지"
                  className="rounded-[12px] w-[72px] h-[72px] object-fit"
                />
              )}
              <div
                className="hidden md:block"
                onClick={(e) => e.stopPropagation()}
              >
                <Dropdown
                  options={kebabOptions}
                  onChange={handleChange}
                  customButton={kebabButton}
                  size="sm"
                  direction="down"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <Profile />
          <p className="text-xs font-medium text-text-primary">
            {writerNickname}
          </p>
          <div className="h-3 border-l border-border-primary-10"></div>
          <p className="text-xs font-medium text-text-default">
            {new Date(createdAt).toLocaleDateString()}
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
