import Ongoing from '@/assets/state_ongoing.svg';
import Done from '@/assets/state_done.svg';
import Dropdown from '@/components/common/Dropdown';

interface TodoItem {
  title: string;
  progress: number;
  total: number;
  completed?: boolean;
}

interface TaskItemProps extends TodoItem {
  index: number;
}

const pointColors = [
  'purple',
  'blue',
  'cyan',
  'pink',
  'rose',
  'orange',
  'yellow',
];

const TaskItem = ({
  title,
  progress,
  total,
  completed = false,
  index,
}: TaskItemProps) => {
  const StatusIcon = completed ? Done : Ongoing;
  const colorIndex = index % pointColors.length;
  const borderColor = `bg-color-point-${pointColors[colorIndex]}`;

  return (
    <div className="relative bg-background-secondary rounded-xl flex items-center overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${borderColor}`} />
      <div className="flex-1 flex justify-between items-center px-4 py-3 ml-2">
        <span className="font-medium text-white">{title}</span>
        <div className="flex items-center bg-background-primary rounded-xl py-1 px-2">
          <StatusIcon className="size-4 mr-1" />
          <span className="text-sm text-color-brand-primary">
            {progress}/{total}
          </span>
        </div>
        {/** Dropdown component */}
      </div>
    </div>
  );
};

interface TodoListCardProps {
  todos: TodoItem[];
}

const TodoListCard = ({ todos }: TodoListCardProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">할 일 목록 ({todos.length}개)</h2>
        <button className="text-color-brand-primary text-sm font-medium">
          + 새로운 목록 추가하기
        </button>
      </div>
      {todos.map((todo, index) => (
        <TaskItem key={index} {...todo} index={index} />
      ))}
    </div>
  );
};

export default TodoListCard;
