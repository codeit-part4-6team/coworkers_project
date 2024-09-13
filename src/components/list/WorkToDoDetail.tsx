import XIcon from '@/assets/x_icon.svg';
import KebabIcon from '@/assets/kebab_large.svg';
import ProfileMemberIcon from '@/assets/profile_member_large.svg';
import CalendarNRepeat from './CalendarNRepeat';
import CommentWriting from './CommentWriting';
import Comment from './Comment';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import FloatingButton from '@/components/common/FloatingButton';

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function WorkToDoDetail() {
  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    console.log('dasd');
  };

  return (
    <div className="fixed top-[60px] right-0 z-10 p-4 md:p-6 lg:p-10 w-full md:w-[434px] lg:w-[780px] h-svh md:border-l md:border-solid md:border-border-primary-10 bg-background-secondary antialiased">
      <button type="button" className="mb-4">
        <XIcon />
      </button>
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <h4 className="text-2lg md:text-xl font-bold">
          법인 설립 비용 안내 드리기
        </h4>
        <Dropdown
          options={WorkToDoOptions}
          customButton={<KebabIcon />}
          onChange={handleWorkToDoOptionChange}
          size="md"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <ProfileMemberIcon />
          <span className="text-md font-medium">안해나</span>
        </div>
        <span className="text-md font-regular text-text-secondary">
          2025.05.30
        </span>
      </div>
      <div className="mb-6">
        <CalendarNRepeat />
      </div>
      <p className="mb-[100px] md:mb-[182px] text-md font-regular">
        필수 정보 10분 입력하면 3일 안에 법인 설립이 완료되는 법인 설립 서비스의
        장점에 대해 상세하게 설명드리기
      </p>
      <CommentWriting />
      <Comment />
      <div className="fixed right-4 bottom-6 md:right-6 md:bottom-5 lg:right-10 lg:bottom-10">
        <FloatingButton option="success" text="완료하기" disabled={false} />
        {/* <FloatingButton option="cancel" text="완료 취소하기" disabled={false} /> */}
      </div>
    </div>
  );
}
