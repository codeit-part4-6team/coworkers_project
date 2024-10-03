import { useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Calendar from 'react-calendar';
import { useQueryClient } from '@tanstack/react-query';
import XIcon from '@/assets/x_icon.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import { today } from '@/utils/today';
import { formatThirdDate, formatFourthDate } from '@/utils/formatDate';
import { SelectedDate, TaskCreateRequestBody } from '@/types/listTypes';
import { useCreateRecurringTaskMutation } from '@/lib/taskApi';

const repeatOptions = [
  { label: '한 번', value: 'ONCE' },
  { label: '매일', value: 'DAILY' },
  { label: '주 반복', value: 'WEEKLY' },
  { label: '월 반복', value: 'MONTHLY' },
];

const weekDays = [
  { name: '일', value: 0 },
  { name: '월', value: 1 },
  { name: '화', value: 2 },
  { name: '수', value: 3 },
  { name: '목', value: 4 },
  { name: '금', value: 5 },
  { name: '토', value: 6 },
];

const MonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function CreateWorkToDoModal() {
  const router = useRouter();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createRecurringTaskMutation = useCreateRecurringTaskMutation();

  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [isWeekDaysVisible, setIsWeekDaysVisible] = useState(false);
  const [isMonthDayVisible, setIsMonthDayVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [selectedRepeatLabel, setSelectedRepeatLabel] = useState('한 번');
  const [selectedRepeatValue, setSelectedRepeatValue] = useState('ONCE');
  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([]);
  const [selectedMonthDay, setSelectedMonthDay] = useState(1);
  const [description, setDescription] = useState('');

  const dateRequestBody = formatThirdDate(selectedDate);
  const dateModal = formatFourthDate(selectedDate);

  const handleRepeatOptionsChange = (selectedOption: DropdownOption) => {
    setSelectedRepeatValue(selectedOption.value);
    setSelectedRepeatLabel(selectedOption.label);

    selectedOption.value === 'WEEKLY'
      ? setIsWeekDaysVisible(true)
      : setIsWeekDaysVisible(false);

    selectedOption.value === 'MONTHLY'
      ? setIsMonthDayVisible(true)
      : setIsMonthDayVisible(false);
  };

  const handleWeekDaysClick = (value: number) => {
    setSelectedWeekDays((prev) => {
      if (prev.includes(value)) {
        return prev.filter((day) => day !== value);
      }
      return [...prev, value];
    });
  };

  const handleSubmitClick = () => {
    const taskData: TaskCreateRequestBody = {
      name: title,
      description: description,
      startDate: dateRequestBody,
      frequencyType: selectedRepeatValue,
    };

    if (selectedRepeatValue === 'WEEKLY') {
      taskData.weekDays = selectedWeekDays;
    }

    if (selectedRepeatValue === 'MONTHLY') {
      taskData.monthDay = selectedMonthDay;
    }

    createRecurringTaskMutation.mutate(
      {
        groupId: groupId,
        taskListId: taskListId,
        data: taskData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          setTitle('');
          setSelectedDate(new Date());
          setSelectedRepeatLabel('한 번');
          setSelectedRepeatValue('ONCE');
          setIsWeekDaysVisible(false);
          setIsMonthDayVisible(false);
          setSelectedWeekDays([]);
          setSelectedMonthDay(1);
          setDescription('');
          closeModal('createToDo');
        },
      },
    );
  };

  const handleCloseClick = () => {
    setTitle('');
    setSelectedDate(new Date());
    setSelectedRepeatLabel('한 번');
    setSelectedRepeatValue('ONCE');
    setIsWeekDaysVisible(false);
    setIsMonthDayVisible(false);
    setSelectedWeekDays([]);
    setSelectedMonthDay(1);
    setDescription('');
    closeModal('createToDo');
  };

  return (
    <Modal
      id="createToDo"
      className="px-6 pt-6 pb-8 md:w-[384px] md:rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="flex justify-end mb-4">
        <button type="button" onClick={handleCloseClick}>
          <XIcon />
        </button>
      </div>
      <h2 className="mb-4 text-center text-lg font-medium text-text-primary">
        할 일 만들기
      </h2>
      <p className="mb-6 mx-auto w-[227px] text-center text-md font-medium text-text-default">
        할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.
      </p>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="title"
            className="w-16 text-lg font-medium text-text-primary"
          >
            할 일 제목
          </label>
          <input
            type="text"
            id="title"
            placeholder="할 일 제목을 입력해주세요"
            value={title.trimStart()}
            className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="date"
            className="w-28 text-lg font-medium text-text-primary"
          >
            시작 날짜 및 시간
          </label>
          <input
            readOnly
            type="text"
            id="date"
            value={dateModal}
            placeholder={today()}
            onClick={() => setIsCalendarVisible((prev) => !prev)}
            className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none"
          />
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
              className="-mt-2"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="repeat"
            className="w-16 text-lg font-medium text-text-primary"
          >
            반복 설정
          </label>
          <div>
            <Dropdown
              options={repeatOptions}
              onChange={handleRepeatOptionsChange}
              placeholder={selectedRepeatLabel}
            />
          </div>
          {isWeekDaysVisible && (
            <div className="flex flex-col gap-3">
              <h3 className="w-16 text-lg font-medium text-text-primary">
                반복 요일
              </h3>
              <ul className="flex justify-around">
                {weekDays.map(({ name, value }) => (
                  <li
                    key={name}
                    className={clsx(
                      'flex justify-center items-center w-11 h-12 rounded-xl text-md font-medium cursor-pointer',
                      {
                        'bg-color-brand-primary text-text-primary':
                          selectedWeekDays.includes(value),
                        'bg-[#18212F] text-text-default':
                          !selectedWeekDays.includes(value),
                      },
                    )}
                    onClick={() => handleWeekDaysClick(value)}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isMonthDayVisible && (
            <div className="flex flex-col gap-3">
              <h3 className="w-16 text-lg font-medium text-text-primary">
                반복 일
              </h3>
              <div className="grid grid-cols-7 grid-rows-5 p-4 border rounded-xl border-interaction-hover">
                {MonthDays.map((date) => (
                  <button
                    key={date}
                    type="button"
                    className={clsx(
                      'h-8 rounded-lg text-md font-medium text-text-invers text-text-inverse hover:bg-color-brand-primary',
                      {
                        'bg-color-brand-primary text-background-secondary':
                          date === selectedMonthDay,
                      },
                    )}
                    onClick={() => setSelectedMonthDay(date)}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="memo"
            className="w-16 text-lg font-medium text-text-primary"
          >
            할 일 메모
          </label>
          <textarea
            id="memo"
            placeholder="메모를 입력해주세요"
            value={description.trimStart()}
            className="mb-2 px-4 py-3 w-full h-[75px] border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none resize-none"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          option="solid"
          size="large"
          text="만들기"
          disabled={!title}
          type="button"
          onClick={handleSubmitClick}
        />
      </form>
    </Modal>
  );
}
