import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';
import Profile from '@/assets/profile_member_large.svg';
import Heart from '@/assets/heart.svg';

interface CardProps {
  id: number;
  title: string;
  writerNickname: string;
  createdAt: string;
  likeCount: number;
}

const Card = ({
  id,
  title,
  writerNickname,
  createdAt,
  likeCount,
}: CardProps) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="border rounded-[12px] bg-background-secondary border-background-tertiary pt-6 px-4 pb-4">
      <div className="flex justify-between md:flex-row">
        <div>
          <p className="text-text-secondary text-md font-medium">{title}</p>
          <p className="text-xs font-medium text-text-default mt-3">
            {formatDate(createdAt)}
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
          <div className="flex items-center gap-1">
            <Heart />
            <p className="text-text-default text-xs font-regular">
              {likeCount}
            </p>
          </div>
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
