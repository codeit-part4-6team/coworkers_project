import { Dispatch, SetStateAction, useState } from 'react';
import Calendar from 'react-calendar';
import ArrowLeftIcon from '@/assets/btn_arrow_left.svg';
import ArrowRightIcon from '@/assets/btn_arrow_right.svg';
import CalendarIcon from '@/assets/btn_calendar.svg';
import { formatSecondDate } from '@/utils/formatDate';
import { SelectedDate } from '@/types/listTypes';

interface Props {
  selectedDate: SelectedDate;
  setSelectedDate: Dispatch<SetStateAction<SelectedDate>>;
}

export default function CalendarDate({ selectedDate, setSelectedDate }: Props) {
  const [isClient, setIsClient] = useState(false);

  const handleCalendarIconClick = () => {
    setIsClient((prev) => !prev);
  };

  const handlePreviousDayClick = () => {
    setSelectedDate((prevDate) => {
      if (prevDate instanceof Date) {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      }
      return prevDate;
    });
  };

  const handleNextDayClick = () => {
    setSelectedDate((prevDate) => {
      if (prevDate instanceof Date) {
        const newDate = new Date(prevDate);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      }
      return prevDate;
    });
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-lg font-medium">
        {formatSecondDate(selectedDate)}
      </span>
      <div className="flex gap-1">
        <button
          type="button"
          title="arrow-left"
          onClick={handlePreviousDayClick}
        >
          <ArrowLeftIcon />
        </button>
        <button type="button" title="arrow-right" onClick={handleNextDayClick}>
          <ArrowRightIcon />
        </button>
      </div>
      <div className="relative w-6 h-6">
        <button type="button" onClick={handleCalendarIconClick}>
          <CalendarIcon />
        </button>
        {isClient && (
          <Calendar
            onChange={setSelectedDate}
            onClickDay={() => setIsClient(false)}
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
