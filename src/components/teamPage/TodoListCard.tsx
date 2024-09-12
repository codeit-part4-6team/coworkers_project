import Ongoing from '@/assets/state_ongoing.svg';
import Done from '@/assets/state_done.svg';
import Dropdown from '@/components/common/Dropdown';

interface TodoItem {
  title: string;
  progress: number;
  total: number;
  completed?: boolean;
  color: string;
}

interface TaskItemProps extends TodoItem {}

const TaskItem = ({
  title,
  progress,
  total,
  completed = false,
  color,
}: TaskItemProps) => {
  const StatusIcon = completed ? Done : Ongoing;

  return (
    <div className="bg-background-secondary rounded-xl flex items-center overflow-hidden">
      <div className="w-2 h-full" style={{ backgroundColor: color }} />
      <div className="flex-1 flex justify-between items-center px-4 py-3">
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
        <TaskItem key={index} {...todo} />
      ))}
    </div>
  );
};

export default TodoListCard;
