import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import XIcon from '@/assets/x_icon.svg';
import KebabIcon from '@/assets/kebab_large.svg';
import ProfileMemberIcon from '@/assets/profile_member_large.svg';
import DateNRepeat from '@/components/taskListsPage/DateNRepeat';
import CommentWriting from '@/components/taskListsPage/CommentWriting';
import Comment from '@/components/taskListsPage/Comment';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import FloatingButton from '@/components/common/FloatingButton';
import { formatFifthDate } from '@/utils/formatDate';
import { useQueryClient } from '@tanstack/react-query';
import { useTaskDetailQuery, useEditTaskDetailMutation } from '@/lib/taskApi';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import useWorkToDoStore from '@/store/workToDoStore';

interface Props {
  setWorkToDoName: Dispatch<SetStateAction<string>>;
}

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function WorkToDoDetail({ setWorkToDoName }: Props) {
  const { openModal } = useModalStore();
  const router = useRouter();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const taskId = Number(router.query.taskId);
  const taskDetailQuery = useTaskDetailQuery(groupId, taskListId, taskId);
  const { setTaskId, setRecurringId } = useApiResponseIdsStore();
  const setWorkToDo = useWorkToDoStore((state) => state.setWorkToDo);
  const queryClient = useQueryClient();
  const editTaskDetailMutation = useEditTaskDetailMutation();

  const taskDetailData = taskDetailQuery.data?.data;

  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    const { value } = option;
    if (value === 'edit') {
      setTaskId(taskId);
      openModal('editToDo');
      setWorkToDo(taskDetailData);
    }
    if (value === 'delete') {
      setWorkToDoName(taskDetailData?.name);
      setRecurringId(taskDetailData?.recurringId);
      openModal('deleteToDo');
    }
  };

  const handleSuccessClick = () => {
    editTaskDetailMutation.mutate(
      {
        taskId: taskId,
        data: {
          done: true,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
        },
      },
    );
  };

  const handleCancelClick = () => {
    editTaskDetailMutation.mutate(
      {
        taskId: taskId,
        data: {
          done: false,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
        },
      },
    );
  };

  return (
    <>
      <div className="absolute top-[60px] bottom-0 right-0 z-10 p-4 md:p-6 lg:p-10 w-full md:w-[434px] lg:w-[780px] h-full overflow-auto md:border-l md:border-solid md:border-border-primary-10 bg-background-secondary antialiased animate-slide-in">
        <Link
          href={{
            pathname: `/group/${groupId}/task-lists/${taskListId}`,
          }}
        >
          <button type="button" className="mb-4">
            <XIcon />
          </button>
        </Link>
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <h4 className="text-2lg md:text-xl font-bold">
            {taskDetailData?.name}
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
            {taskDetailData?.writer.image ? (
              <img
                src={taskDetailData?.writer.image}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <ProfileMemberIcon />
            )}
            <span className="text-md font-medium">
              {taskDetailData?.writer.nickname}
            </span>
          </div>
          <span className="text-md font-regular text-text-secondary">
            {formatFifthDate(String(taskDetailData?.updatedAt))}
          </span>
        </div>
        <div className="mb-6">
          <DateNRepeat
            date={taskDetailData?.date}
            frequency={taskDetailData?.frequency}
          />
        </div>
        <p className="mb-[100px] md:mb-[182px] text-md font-regular">
          {taskDetailData?.description}
        </p>
        <CommentWriting />
        <Comment />
      </div>

      {!taskDetailData?.doneAt ? (
        <div className="fixed z-20 right-4 bottom-6 md:right-6 md:bottom-5 lg:right-10 lg:bottom-10 w-[111px] h-10 text-md font-semibold">
          <FloatingButton
            option="success"
            text="완료하기"
            disabled={false}
            onClick={handleSuccessClick}
          />
        </div>
      ) : (
        <div className="fixed z-20 right-4 bottom-6 md:right-6 md:bottom-5 lg:right-10 lg:bottom-10 w-[138px] h-10 text-md font-semibold">
          <FloatingButton
            option="cancel"
            text="완료 취소하기"
            disabled={false}
            onClick={handleCancelClick}
          />
        </div>
      )}
    </>
  );
}
