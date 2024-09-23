import CalendarIcon from '@/assets/calendar.svg';
import RepeatIcon from '@/assets/repeat.svg';
import { formatDate } from '@/utils/formatDate';

interface Props {
  date: string;
  frequency: string;
}

export default function CalendarNRepeat({ date, frequency }: Props) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1.5">
        <CalendarIcon />
        <span className="text-xs font-regular text-text-default">
          {formatDate(date)}
        </span>
      </div>
      <div className="h-2 border border-solid border-[#334155]"></div>
      <div className="flex items-center gap-1.5">
        <RepeatIcon />
        <span className="text-xs font-regular text-text-default">
          매일 반복
        </span>
      </div>
    </div>
  );
}
