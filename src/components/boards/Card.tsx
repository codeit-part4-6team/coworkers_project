import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';
import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';

const Card = () => {
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
    <div className="border rounded-[12px] bg-background-secondary border-background-tertiary pt-6 px-4 pb-4">
      <div>
        <p className="text-text-secondary text-md font-medium">
          자유게시판에 질문을 올릴 수 있어요
        </p>
        <p className="text-text-secondary text-md font-medium">
          질문을 올려볼까요?
        </p>
        <p className="text-xs font-medium text-text-default mt-3">2024.07.25</p>
      </div>
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
          <Dropdown
            options={kebabOptions}
            onChange={handleChange}
            customButton={kebabButton}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
