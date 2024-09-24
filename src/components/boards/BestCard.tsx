import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';
import Medal from '@/assets/medal.svg';
import Image from 'next/image';
import test from '@/assets/testimg.png';

const BestCard = () => {
  return (
    <div className="border border-background-tertiary rounded-[12px] bg-background-secondary pt-[9px] px-4 pb-4">
      <div className="flex items-center gap-1 mb-[14px]">
        <Medal />
        <p className="text-md font-semibold text-text-primary">Best</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-text-secondary text-md font-medium">
            자유게시판에 질문을 올릴 수 있어요
          </p>
          <p className="text-text-secondary text-md font-medium">
            질문을 올려볼까요?
          </p>
        </div>
        <Image src={test} alt="image" width={64} height={64} />
      </div>
      <p className="text-xs font-medium text-text-default mt-3">2024.07.25</p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <Profile />
          <p className="text-xs font-medium text-text-primary">우지은</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Heart />
            <p className="text-text-default text-xs font-regular">9999+</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestCard;
