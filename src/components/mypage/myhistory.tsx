import { useEffect, useState } from 'react';
import CheckboxActiveIcon from '@/assets/checkbox_active.svg';
import { myHistory as fetchMyHistory } from '@/lib/auth';

interface MyHistoryType {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string;
  recurringId: number;
  name: string;
  description: string;
  frequency: string;
  deletedAt: null;
  userId: number;
  writerId: number;
  displayIndex: number;
}

export default function MyHistory() {
  const [historyData, setHistoryData] = useState<MyHistoryType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMyHistory();
        console.log(response.data.tasksDone);
        if (response) {
          setHistoryData(response.data.tasksDone);
        } else {
          console.error('tasksDone 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('에러 발생', error);
      }
    };

    fetchData();
  }, []);

  if (!historyData || historyData.length === 0) {
    return (
      <div>
        <p>아직 히스토리가 없습니다.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
  };

  const groupedData = historyData.reduce(
    (acc: Record<string, MyHistoryType[]>, item) => {
      const formattedDate = formatDate(item.doneAt);
      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(item);
      return acc;
    },
    {},
  );

  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <div>
      {sortedDates.map((date) => (
        <div key={date} className={`mb-10`}>
          <p className={`text-text-primary text-lg font-medium mb-4`}>{date}</p>
          <div className={`flex flex-col gap-4`}>
            {groupedData[date].map((item) => (
              <div
                key={item.id}
                className={`flex items-center rounded-lg gap-[7px] bg-background-secondary px-[14px] py-[10px]`}
              >
                <CheckboxActiveIcon />
                <p
                  className={`text-text-primary text-md font-regular line-through`}
                >
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
