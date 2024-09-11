import CalendarIcon from '@/assets/calendar.svg';
import RepeatIcon from '@/assets/repeat.svg';

export default function CalendarNRepeat() {
  return (
    <div className="flex items-center gap-[10px]">
      <div className="flex items-center gap-[6px]">
        <CalendarIcon />
        <span className="text-xs font-regular text-text-default">
          2024년 7월 29일
        </span>
      </div>
      <div className="h-2 border-[1px] border-solid border-[#334155]"></div>
      <div className="flex items-center gap-[6px]">
        <RepeatIcon />
        <span className="text-xs font-regular text-text-default">
          매일 반복
        </span>
      </div>
    </div>
  );
}
