import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Kebab from '@/assets/kebab.svg';
import Profile from '@/assets/member.svg';
import Comment from '@/assets/comment.svg';
import Heart from '@/assets/heart.svg';
import Input from '@/components/input/Input';
import Button from '@/components/common/Button';
import Card from '@/components/boards/Card';
import { getComment } from '@/lib/articleApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Comment {
  id: number;
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    if (!id) return;
    try {
      const response = await getComment(Number(id));
      setComments(response.data.list);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const kebabOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const kebabButton = (
    <div>
      <Kebab className="w-4 h-4 text-icon-primary" />
    </div>
  );

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div className="px-4 mt-10 md:px-6 md:mt-14 lg:px-[360px]">
      <div className="flex justify-between items-center">
        <h3 className="text-text-secondary font-medium text-lg md:text-2lg">
          게시글 제목 영역입니다.
        </h3>
        <Dropdown
          options={kebabOptions}
          onChange={handleChange}
          customButton={kebabButton}
          size="sm"
          direction="down"
        />
      </div>
      <div className="w-full border-t border-border-primary-10 my-4"></div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Profile />
          <p className="text-text-primary font-medium text-xs">우지은</p>
          <div className="h-3 border-l border-border-primary-10"></div>
          <p className="text-text-secondary text-xs font-medium">2024.07.25</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Comment />
            <p className="text-text-secondary text-xs font-medium">3</p>
          </div>
          <div className="flex items-center gap-1">
            <Heart />
            <p className="text-text-secondary text-xs font-medium">9999+</p>
          </div>
        </div>
      </div>
      <p className="font-regular text-text-secondary text-md mt-12">본문</p>
      <h2 className="mt-20 text-text-primary font-medium text-lg md:text-xl">
        댓글달기
      </h2>
      <Input
        placeholder="댓글을 입력해주세요."
        option="text"
        inputSize="large"
        labeltext=""
      />
      <div className="flex justify-end">
        <Button option="solid" size="xsmall" text="등록" disabled={false} />
      </div>
      <div className="w-full border-t border-border-primary-10 my-8"></div>
      {comments.map((comment) => (
        <Card
          key={comment.id}
          id={comment.id}
          title={comment.content}
          writerNickname={comment.writer.nickname}
          createdAt={comment.createdAt}
          likeCount={0}
        />
      ))}
    </div>
  );
};

export default CardPage;
