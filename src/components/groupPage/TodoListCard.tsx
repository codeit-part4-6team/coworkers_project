import Done from '@/assets/state_done.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  useCreateTaskListMutation,
  useDeleteTaskListDetailMutation,
  useTaskListsQuery,
} from '@/lib/taskListApi';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import { useState } from 'react';
import XIcon from '@/assets/x_icon.svg';
import { TaskList } from '@/types/taskTypes';

interface TaskItemProps {
  taskList: TaskList;
  index: number;
  groupId: number;
  onDelete: () => void;
}

const pointColors = [
  'bg-color-point-purple',
  'bg-color-point-blue',
  'bg-color-point-cyan',
  'bg-color-point-pink',
  'bg-color-point-rose',
  'bg-color-point-orange',
  'bg-color-point-yellow',
];

const ProgressChart = ({
  progress,
  size = 12,
  strokeWidth = 2,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="white"
        className="text-background-tertiary"
        stroke="currentColor"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-color-brand-primary"
      />
    </svg>
  );
};

const TaskItem = ({ taskList, index, groupId, onDelete }: TaskItemProps) => {
  const colorIndex = index % pointColors.length;
  const borderColor = `${pointColors[colorIndex]}`;
  const queryClient = useQueryClient();

  const deleteTaskListMutation = useDeleteTaskListDetailMutation(
    groupId,
    taskList.id,
  );

  const kebabOptions = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const handleChange = async (selectedOption: DropdownOption) => {
    if (selectedOption.value === 'delete') {
      try {
        await deleteTaskListMutation.mutateAsync();
        queryClient.invalidateQueries({ queryKey: ['taskLists', groupId] });
        onDelete();
      } catch (error) {
        console.error('Failed to delete task list:', error);
      }
    } else if (selectedOption.value === 'edit') {
      console.log('Edit option selected');
    }
  };

  const totalTasks = taskList.tasks.length;
  const completedTasks = taskList.tasks.filter(
    (task) => task.doneAt && task.doneBy.user !== null,
  ).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-background-secondary" />
        <div className={`absolute left-0 top-0 bottom-0 w-3 ${borderColor}`} />
      </div>
      <div className="relative flex items-center">
        <div className="flex-1 flex justify-between items-center pl-4 pr-2 py-3 ml-2">
          <span className="font-medium text-md text-white">
            {taskList.name}
          </span>
          <div className="flex items-center">
            <div className="flex items-center bg-background-primary rounded-xl py-1 px-2 mr-1">
              {progressPercentage === 100 ? (
                <Done className="size-4" />
              ) : (
                <div className="size-4 flex items-center">
                  <ProgressChart progress={progressPercentage} />
                </div>
              )}
              <span className="text-sm w-5 text-color-brand-primary ml-2">
                {completedTasks}/{totalTasks}
              </span>
            </div>
            <Dropdown
              options={kebabOptions}
              onChange={handleChange}
              customButton={<Kebab width="16" height="16" />}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const TodoListCard = ({ groupId }: { groupId: number }) => {
  const [newListName, setNewListName] = useState('');
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModalStore();
  const {
    data: groupData,
    isLoading,
    isError,
    refetch,
  } = useTaskListsQuery(groupId);

  const createTaskListMutation = useCreateTaskListMutation();

  const handleOpenModal = () => {
    openModal('newTaskList');
  };

  const handleCloseModal = () => {
    closeModal('newTaskList');
    setNewListName('');
  };

  const handleCreateList = async () => {
    if (newListName.trim()) {
      try {
        await createTaskListMutation.mutateAsync({
          groupId,
          name: newListName,
        });
        queryClient.invalidateQueries({ queryKey: ['taskLists', groupId] });
        refetch(); // 명시적으로 refetch를 호출하여 데이터를 다시 불러옴
        setNewListName('');
        handleCloseModal();
      } catch (error) {
        console.error('Failed to create new task list:', error);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading task lists</div>;

  const taskLists = (groupData?.data?.taskLists || []) as TaskList[];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          할 일 목록
          <span className="text-text-default font-regular ml-2">
            ({taskLists.length}개)
          </span>
        </h2>
        <button
          className="text-color-brand-primary text-sm font-medium"
          onClick={handleOpenModal}
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskLists.length > 0 ? (
        taskLists.map((taskList, index) => (
          <TaskItem
            key={taskList.id}
            taskList={taskList}
            index={index}
            groupId={groupId}
            onDelete={() => refetch()}
          />
        ))
      ) : (
        <div className="flex justify-center items-center py-16">
          <p className="text-text-default font-medium text-sm py-16">
            아직 할 일 목록이 없습니다.
          </p>
        </div>
      )}
      <Modal
        id="newTaskList"
        className="sm:w-96 w-full p-6 rounded-2xl bg-background-secondary text-text-primary
                   fixed sm:top-1/2 sm:left-1/2 sm:right-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2
                   top-auto bottom-0 left-0 right-0 transform-none rounded-t-xl sm:rounded-b-xl rounded-b-none"
        positionBottom
      >
        <div className="flex flex-col">
          <button
            onClick={handleCloseModal}
            className="ml-auto text-gray-400 hover:text-white mb-2"
          >
            <XIcon />
          </button>
          <p className="text-center text-lg font-medium mb-4">할 일 목록</p>

          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="목록 명을 입력해주세요."
            className="w-[280px] mx-auto p-3 bg-background-secondary text-text-primary rounded-xl mb-6 
                       border border-text-default focus:outline-none
                       placeholder-text-default"
          />
          <button
            onClick={handleCreateList}
            className="w-[280px] mx-auto bg-color-brand-primary text-white py-3 rounded-xl font-medium hover:bg-[#0d9668] transition-colors"
          >
            만들기
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoListCard;
