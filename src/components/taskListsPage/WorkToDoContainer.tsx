import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import CheckboxIcon from '@/assets/checkbox.svg';
import CheckboxActiveIcon from '@/assets/checkbox_active.svg';
import CommentIcon from '@/assets/comment.svg';
import KebabIcon from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import DateNRepeat from './DateNRepeat';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import useWorkToDoStore from '@/store/workToDoStore';
import { TaskResponse } from '@/types/listTypes';

interface Props {
  data: TaskResponse;
  setWorkToDoName: Dispatch<SetStateAction<string>>;
}

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function WorkToDoContainer({ data, setWorkToDoName }: Props) {
  const { commentCount, date, frequency, id, name, recurringId, doneAt } = data;

  const { openModal } = useModalStore();
  const { setTaskId, setRecurringId } = useApiResponseIdsStore();
  const setWorkToDo = useWorkToDoStore((state) => state.setWorkToDo);
  const router = useRouter();

  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);

  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    const { value } = option;
    if (value === 'edit') {
      setTaskId(id);
      openModal('editToDo');
      setWorkToDo(data);
    }
    if (value === 'delete') {
      setWorkToDoName(name);
      setRecurringId(recurringId);
      openModal('deleteToDo');
    }
  };

  return (
    <>
      <Link
        href={{
          pathname: `/group/${groupId}/task-lists/${taskListId}/task`,
          query: {
            taskId: id,
          },
        }}
      >
        <div className="flex flex-col gap-2.5 w-full py-3 px-3.5 rounded-lg bg-background-secondary">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="flex gap-2 items-center">
                {!doneAt ? <CheckboxIcon /> : <CheckboxActiveIcon />}
                <h4
                  className={clsx(
                    'text-md font-regular',
                    doneAt && 'line-through',
                  )}
                >
                  {name}
                </h4>
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
              <div
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
                className="flex justify-center items-center w-6 h-6 leading-none"
              >
                <Dropdown
                  options={WorkToDoOptions}
                  customButton={<KebabIcon />}
                  onChange={handleWorkToDoOptionChange}
                  size="md"
                />
              </div>
            </div>
          </div>
          <DateNRepeat date={date} frequency={frequency} />
        </div>
      </Link>
    </>
  );
}
