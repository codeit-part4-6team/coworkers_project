import CheckboxIcon from '@/assets/checkbox.svg';
import CommentIcon from '@/assets/comment.svg';
import KebabIcon from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import CalendarNRepeat from './CalendarNRepeat';

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function WorkToDoContainer({ data }: any) {
  const { commentCount, date, frequency, id, name, recurringId, writer } = data;

  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    console.log('dasd');
  };

  console.log('data', data);
  return (
    <div
      key={id}
      className="flex flex-col gap-2.5 w-full py-3 px-3.5 rounded-lg bg-background-secondary"
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex gap-2 items-center">
            <CheckboxIcon />
            <h4 className="text-md font-regular">{name}</h4>
          </div>
          <div className="hidden md:flex gap-0.5 items-center">
            <CommentIcon />
            <span className="text-xs font-regular text-text-default">
              {commentCount}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-0.5 items-center md:hidden text-md font-regular">
            <CommentIcon />
            <span className="text-xs font-regular text-text-default">
              {commentCount}
            </span>
          </div>
          <Dropdown
            options={WorkToDoOptions}
            customButton={<KebabIcon />}
            onChange={handleWorkToDoOptionChange}
            size="md"
          />
        </div>
      </div>
      <CalendarNRepeat date={date} frequency={frequency} />
    </div>
  );
}
