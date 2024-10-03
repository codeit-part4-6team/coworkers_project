import Todo from '@/assets/img_todo.svg';
import Done from '@/assets/img_done.svg';

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: any | null;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
  doneBy: {
    user: any | null;
  };
  commentCount: number;
  frequency: string;
}

interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}

interface ReportCardProps {
  taskLists: TaskList[];
}

interface DonutChartProps {
  size: number;
  progress: number;
  strokeWidth: number;
}

const DonutChart = ({ size, progress, strokeWidth }: DonutChartProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative size-[140px]">
      <svg width={size} height={size} className="absolute inset-0 transform">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
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
          className="stroke-[url(#gradient)]"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#A3E635" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center md:hidden">
        <span className="text-sm font-medium">오늘</span>
        <span className="text-2xl font-bold bg-color-brand-gradient bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
    </div>
  );
};

const ReportCard = ({ taskLists }: ReportCardProps) => {
  const totalTasks = taskLists.reduce(
    (acc, taskList) => acc + taskList.tasks.length,
    0,
  );
  const completedTasks = taskLists.reduce(
    (acc, taskList) =>
      acc +
      taskList.tasks.filter(
        (task) => task.doneAt !== null && task.doneBy.user !== null,
      ).length,
    0,
  );
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <>
      <div className="text-lg font-medium mt-6 mb-4">리포트</div>
      <div className="bg-background-secondary rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <DonutChart
            size={140}
            progress={completionPercentage}
            strokeWidth={24}
          />
          <div className="hidden md:block mt-4 md:mt-0">
            <p className="text-md font-medium">오늘의</p>
            <p className="text-md font-medium pb-1">진행 상황</p>
            <p className="text-4xl font-bold">
            <span className="bg-color-brand-gradient bg-clip-text inline-block text-transparent">
            {completionPercentage}%
              </span>
            </p>
          </div>
          <div className="flex-1 w-full md:mt-0">
            <div className="flex flex-col space-y-4 items-end">
              <div className="bg-background-tertiary rounded-lg p-4 flex justify-between items-center w-full max-w-[400px]">
                <div>
                  <p className="text-xs text-text-secondary pb-1">
                    오늘의 할 일
                  </p>
                  <p className="text-2xl font-bold text-color-brand-tertiary">
                    {totalTasks}개
                  </p>
                </div>
                <Todo className="size-10 flex-shrink-0" />
              </div>
              <div className="bg-background-tertiary rounded-lg p-4 flex justify-between items-center w-full max-w-[400px]">
                <div>
                  <p className="text-xs text-text-secondary pb-1">한 일</p>
                  <p className="text-2xl font-bold text-color-brand-tertiary">
                    {completedTasks}개
                  </p>
                </div>
                <Done className="size-10 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCard;