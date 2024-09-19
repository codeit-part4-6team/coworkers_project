import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ArrowLeftIcon from '@/assets/btn_arrow_left.svg';
import ArrowRightIcon from '@/assets/btn_arrow_right.svg';
import CalendarIcon from '@/assets/btn_calendar.svg';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export default function Date() {
  const [isClient, setIsClient] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
      <div className="relative w-6 h-6">
        <button type="button">
          <CalendarIcon />
        </button>
        {isClient && (
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            locale="en-US"
            className="absolute z-10 -left-[148px] md:left-0"
          />
        )}
      </div>
    </div>
  );
}
