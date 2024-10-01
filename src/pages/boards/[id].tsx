import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Kebab from '@/assets/kebab.svg';
import Profile from '@/assets/member.svg';
import Comment from '@/assets/comment.svg';
import Heart from '@/assets/heart.svg';
import Button from '@/components/common/Button';
import Card from '@/components/boards/Card';
import { getComment, createComment, getDetailArticle } from '@/lib/articleApi';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Comment {
  id: number;
  writer: {
    nickname: string;
    id: number;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  isLiked: boolean;
}

const CardPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  const fetchArticle = async () => {
    if (!id) return;
    try {
      const response = await getDetailArticle(Number(id));
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const fetchComments = async () => {
    if (!id) return;
    try {
      const response = await getComment(Number(id));
      setComments(response.data.list);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchArticle();
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

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await createComment(Number(id), newComment);

      setComments((prevComments) => [
        ...prevComments,
        {
          id: response.data.id,
          writer: {
            nickname: response.data.writer.nickname,
            id: response.data.writer.id,
          },
          content: response.data.content,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        },
      ]);
      setNewComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div className="px-4 mt-10 md:px-6 md:mt-14 lg:px-[360px]">
      <div className="flex justify-between items-center">
        <h3 className="text-text-secondary font-medium text-lg md:text-2lg">
          {article?.title}
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
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Profile className="w-8 h-8" />
          <p className="text-text-primary font-medium text-xs">
            {article?.writer.nickname}
          </p>
          <div className="h-3 border-l border-border-primary-10"></div>
          <p className="text-text-secondary text-xs font-medium">
            {article
              ? new Date(article.createdAt).toLocaleDateString()
              : '작성 날짜'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Comment />
            <p className="text-text-secondary text-xs font-medium">
              {article?.commentCount}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Heart />
            <p className="text-text-secondary text-xs font-medium">
              {article?.likeCount}
            </p>
          </div>
        </div>
      </div>
      <p className="font-regular text-text-secondary text-md mt-12">
        {article?.content}
      </p>

      <h2 className="mt-20 text-text-primary font-medium text-lg md:text-xl">
        댓글달기
      </h2>
      <textarea
        placeholder="댓글을 입력해주세요."
        className="rounded-[12px] px-4 py-2 bg-background-secondary border border-border-primary-10 w-full h-[104px] mt-4 focus:outline-none"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div className="flex justify-end mt-2">
        <Button
          option="solid"
          size="xsmall"
          text="등록"
          onClick={handleCommentSubmit}
        />
      </div>

      <div className="w-full border-t border-border-primary-10 my-8"></div>
      <div className="grid gap-4 grid-rows-1 mb-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <Card
                id={comment.id}
                title={comment.content}
                writerNickname={comment.writer?.nickname}
                createdAt={comment.createdAt}
                likeCount={0}
                hideHeart={true}
                type="comment"
                onDelete={handleDeleteComment}
              />
            </div>
          ))
        ) : (
          <p className="text-text-default text-md font-medium text-center mt-[180px] md:mt-[158px]">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default CardPage;
