import Done from '@/assets/state_done.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTaskListDetailMutation } from '@/lib/taskListApi';
import ProgressChart from './ProgressChart';
import { TaskList } from '@/types/taskTypes';

const pointColors = [
  'bg-color-point-purple',
  'bg-color-point-blue',
  'bg-color-point-cyan',
  'bg-color-point-pink',
  'bg-color-point-rose',
  'bg-color-point-orange',
  'bg-color-point-yellow',
];

interface TaskItemProps {
  taskList: TaskList;
  index: number;
  groupId: number;
  onDelete: () => void;
  onEdit: (id: number, name: string) => void;
}

const TaskItem = ({ taskList, index, groupId, onDelete, onEdit }: TaskItemProps) => {
  const colorIndex = index % pointColors.length;
  const borderColor = `${pointColors[colorIndex]}`;
  const queryClient = useQueryClient();

  const deleteTaskListMutation = useDeleteTaskListDetailMutation(groupId, taskList.id);

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
      onEdit(taskList.id, taskList.name);
    }
  };

  const totalTasks = taskList.tasks.length;
  const completedTasks = taskList.tasks.filter(
    (task) => task.doneAt && task.doneBy.user !== null
  ).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative bg-transparent">
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-background-secondary" />
        <div className={`absolute left-0 top-0 bottom-0 w-3 ${borderColor}`} />
      </div>
      <div className="relative flex items-center">
        <div className="flex-1 flex justify-between items-center pl-4 pr-2 py-3 ml-2">
          <span className="font-medium text-md text-white">{taskList.name}</span>
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

export default TaskItem;