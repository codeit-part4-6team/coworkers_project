import ArrowLeftIcon from '@/assets/btn_arrow_left.svg';
import ArrowRightIcon from '@/assets/btn_arrow_right.svg';
import CalendarIcon from '@/assets/btn_calendar.svg';

export default function Date() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg font-medium">5월 18일 (월)</span>
      <div className="flex gap-1">
        <button type="button" title="arrow-left">
          <ArrowLeftIcon />
        </button>
        <button type="button" title="arrow-right">
          <ArrowRightIcon />
        </button>
      </div>
      <button type="button">
        <CalendarIcon />
      </button>
    </div>
  );
}
