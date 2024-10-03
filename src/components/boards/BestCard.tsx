import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';
import Medal from '@/assets/medal.svg';
import Image from 'next/image';
import test from '@/assets/testimg.png';
import { useRouter } from 'next/router';

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
            <Image
              src={board.image}
              alt="게시글 이미지"
              width={72}
              height={72}
              className="rounded-[12px] object-cover"
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
            <div className="flex items-center gap-1">
              <Heart />
              <p className="text-text-default text-xs font-regular">
                {board.likeCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCard;
