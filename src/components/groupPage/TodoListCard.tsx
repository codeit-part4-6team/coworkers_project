import Done from '@/assets/state_done.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';

interface Task {
  id: number;
  name: string;
}

interface TaskList {
  id: number;
  name: string;
  tasks: Task[];
}

interface TaskItemProps {
  taskList: TaskList;
  index: number;
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

const TaskItem = ({ taskList, index }: TaskItemProps) => {
  const colorIndex = index % pointColors.length;
  const borderColor = `${pointColors[colorIndex]}`;

  const kebabOptions = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };
  {/*수정필요*/}
  const totalTasks = taskList.tasks.length;
  const completedTasks = taskList.tasks.length - 1;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="relative bg-background-secondary rounded-xl flex items-center overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-3 ${borderColor}`} />
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
  );
};

interface TodoListCardProps {
  taskLists: TaskList[];
}

const TodoListCard = ({ taskLists }: TodoListCardProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">
          할 일 목록
          <span className="text-text-default font-regular ml-2">
            ({taskLists.length}개)
          </span>
        </h2>
        <button className="text-color-brand-primary text-sm font-medium">
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskLists.map((taskList, index) => (
        <TaskItem key={taskList.id} taskList={taskList} index={index} />
      ))}
    </div>
  );
};

export default TodoListCard;
