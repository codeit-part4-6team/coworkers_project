import CheckboxIcon from '@/assets/checkbox.svg';
import CommentIcon from '@/assets/comment.svg';
import KebabIcon from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import CalendarNRepeat from './CalendarNRepeat';

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function WorkToDoContainer() {
  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    console.log('dasd');
  };
  return (
    <div className="flex flex-col gap-[10px] w-[100%] py-3 px-[14px] rounded-lg bg-background-secondary">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <CheckboxIcon />
            <h4 className="text-md font-regular">법인 설립 안내 드리기</h4>
          </div>
          <div className="hidden md:flex gap-[2px] items-center">
            <CommentIcon />
            <span className="text-xs font-regular text-text-default">24</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-[2px] items-center md:hidden text-md font-regular">
            <CommentIcon />
            <span className="text-xs font-regular text-text-default">24</span>
          </div>
          <Dropdown
            options={WorkToDoOptions}
            customButton={<KebabIcon />}
            onChange={handleWorkToDoOptionChange}
            size="md"
          />
        </div>
      </div>
      <CalendarNRepeat />
    </div>
  );
}
