import { useState } from 'react';
import Calendar from 'react-calendar';
import ArrowLeftIcon from '@/assets/btn_arrow_left.svg';
import ArrowRightIcon from '@/assets/btn_arrow_right.svg';
import CalendarIcon from '@/assets/btn_calendar.svg';
import { formatSecondDate } from '@/utils/formatDate';
import useSelectedDateStore from '@/store/selectedDateStore';

export default function CalendarDate() {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const { selectedDate, setSelectedDate } = useSelectedDateStore();

  const handleCalendarIconClick = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const handlePreviousDayClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDayClick = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
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
        {isCalendarVisible && (
          <Calendar
            onChange={setSelectedDate}
            onClickDay={() => setIsCalendarVisible(false)}
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
