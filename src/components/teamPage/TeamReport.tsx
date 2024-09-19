import Todo from '@/assets/img_todo.svg';
import Done from '@/assets/img_done.svg';

interface ReportCardProps {
  totalTasks: number;
  completedTasks: number;
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-medium">오늘</span>
        <span className="text-2xl font-bold bg-color-brand-gradient bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
    </div>
  );
};

const ReportCard = ({ totalTasks, completedTasks }: ReportCardProps) => {
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

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
          <div className="flex-1 w-full">
            <div className="flex flex-col space-y-4 items-end">
              <div className="bg-background-tertiary rounded-lg p-4 flex justify-between items-center w-full max-w-[400px]">
                <div>
                  <p className="text-xs text-text-secondary pb-1">오늘의 할 일</p>
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
