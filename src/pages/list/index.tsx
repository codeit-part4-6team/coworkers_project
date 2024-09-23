import { useState } from 'react';
import clsx from 'clsx';
import CalendarDate from '@/components/list/CalendarDate';
import WorkToDoContainer from '@/components/list/WorkToDoContainer';
import FloatingButton from '@/components/common/FloatingButton';
import WorkToDoDetail from '@/components/list/WorkToDoDetail';
import CreateWorkToDoModal from '@/components/list/CreateWorkToDoModal';
import DeleteWorkToDoModal from '@/components/list/DeleteWorkToDoModal';
import AddCategory from '@/components/list/AddCategoryModal';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import { useTaskListsQuery } from '@/lib/taskListApi';
import { useTasksQuery } from '@/lib/taskApi';
import { SelectedDate } from '@/types/listTypes';
import { formatThirdDate } from '@/utils/formatDate';

import { basicAuthAxios } from '@/lib/basicAxios';

export default function List() {
  const { openModal } = useModalStore();
  const { taskListId, setTaskListId } = useApiResponseIdsStore();

  const [isWorkToDoDetailVisible, setIsWorkToDoDetailVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const formattedDate = formatThirdDate(selectedDate);

  const taskListsQuery = useTaskListsQuery(869);
  const tasksQuery = useTasksQuery(869, taskListId, formattedDate);

  // 임시 로그인 기능
  const login = async () => {
    const response = await basicAuthAxios.post(`auth/signIn`, {
      email: 'kdc5847@naver.com',
      password: '12341234a!',
    });

    localStorage.setItem('accessToken', response.data.accessToken);

    return response;
  };

  const handleLoginClick = () => {
    login();
  };

  const handleAddCategoryClick = () => {
    openModal('AddCategory');
  };

  const handleListNameClick = (id: number) => {
    setTaskListId(id);
  };

  console.log('taskListsQuery 콘솔', taskListsQuery.data?.data);
  console.log('tasksQuery 콘솔', tasksQuery.data?.data);

  return (
    <>
      <CreateWorkToDoModal />
      <AddCategory />
      <DeleteWorkToDoModal />
      {isWorkToDoDetailVisible && (
        <WorkToDoDetail
          setIsWorkToDoDetailVisible={setIsWorkToDoDetailVisible}
        />
      )}
      <section className="h-screen overflow-auto antialiased">
        <div className="lg:mx-auto pt-6 lg:pt-10 pb-6 px-4 md:px-6 2lg:px-0 w-full 2lg:w-[1200px]">
          <button type="button" onClick={handleLoginClick}>
            임시 로그인 버튼
          </button>
          <h2 className="mb-7 md:mb-6 text-2lg md:text-xl font-bold">할 일</h2>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <CalendarDate
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <button
              type="button"
              className="text-md font-regular text-color-brand-primary"
              onClick={handleAddCategoryClick}
            >
              + 새로운 목록 추가하기
            </button>
          </div>
          <ul className="flex flex-wrap gap-3 mb-4">
            {taskListsQuery.data?.data.taskLists.map((taskLists: any) => (
              <li
                key={taskLists.id}
                className={clsx(
                  'h-6 text-lg font-medium text-text-default',
                  taskLists.id === taskListId &&
                    'border-b border-text-tertiary text-text-tertiary',
                )}
                onClick={() => handleListNameClick(taskLists.id)}
              >
                {taskLists.name}
              </li>
            ))}
          </ul>
          {tasksQuery.data?.data.length > 0 ? (
            <div className="flex flex-col gap-4">
              {tasksQuery.data?.data.map((data: any) => (
                <WorkToDoContainer
                  data={{ ...data }}
                  setIsWorkToDoDetailVisible={setIsWorkToDoDetailVisible}
                />
              ))}
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-md font-medium text-text-default">
              <p>아직 할 일 목록이 없습니다.</p>
              <p>새로운 목록을 추가해주세요.</p>
            </div>
          )}
          <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-12 2lg:custom-right">
            <FloatingButton
              option="add"
              text="할 일 추가"
              disabled={false}
              onClick={() => openModal('createToDo')}
            />
          </div>
        </div>
      </section>
    </>
  );
}
