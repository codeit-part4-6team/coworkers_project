import Date from '@/components/list/Date';
import WorkToDoContainer from '@/components/list/WorkToDoContainer';
import FloatingButton from '@/components/common/FloatingButton';
import WorkToDoDetail from '@/components/list/WorkToDoDetail';
import CreateWorkToDoModal from '@/components/list/CreateWorkToDoModal';
import useModalStore from '@/store/modalStore';
import { useQueryClient } from '@tanstack/react-query';
import {
  useTaskListsQuery,
  useCreateTaskListMutation,
} from '@/lib/taskListApi';
import { useTasksQuery } from '@/lib/taskApi';

import { basicAuthAxios } from '@/lib/basicAxios';

export default function List() {
  const { openModal } = useModalStore();

  const queryClient = useQueryClient();
  const taskListsQuery = useTaskListsQuery(869);
  const tasksQuery = useTasksQuery(869, 1327, '2024-09-18');
  const createTaskListMutation = useCreateTaskListMutation();

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

  // 목록 추가하기
  const handleAddListClick = () => {
    createTaskListMutation.mutate(
      { groupId: 869, name: '호랑이' },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['groups', 869] });
        },
      },
    );
  };

  const handleListNameClick = (id: number) => {};

  console.log(taskListsQuery);
  console.log(tasksQuery);

  return (
    <>
      <CreateWorkToDoModal />
      {/* <WorkToDoDetail /> */}
      <section className="w-full lg:w-[1200px] lg:mx-auto pt-6 lg:pt-10 px-4 md:px-6 antialiased">
        <button type="button" onClick={handleLoginClick}>
          임시 로그인 버튼
        </button>
        <h2 className="mb-7 md:mb-6 text-2lg md:text-xl font-bold">할 일</h2>
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <Date />
          <button
            type="button"
            className="text-md font-regular text-color-brand-primary"
            disabled={createTaskListMutation.isPending}
            onClick={handleAddListClick}
          >
            + 새로운 목록 추가하기
          </button>
        </div>
        <ul className="flex gap-3 mb-4">
          {taskListsQuery.data?.data.taskLists.map((taskLists: any) => (
            <li
              key={taskLists.id}
              className="h-6 text-lg font-medium text-text-default active:border-b active:border-text-tertiary active:text-text-tertiary"
              onClick={() => handleListNameClick(taskLists.id)}
            >
              {taskLists.name}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          {tasksQuery.data?.data.map((data: any) => (
            <WorkToDoContainer data={{ ...data }} />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-md font-medium text-text-default">
          <p>아직 할 일 목록이 없습니다.</p>
          <p>새로운 목록을 추가해주세요.</p>
        </div>
        <div className="fixed bottom-6 right-6 lg:bottom-12 lg:right-24">
          <FloatingButton
            option="add"
            text="할 일 추가"
            disabled={false}
            onClick={() => openModal('createToDo')}
          />
        </div>
      </section>
    </>
  );
}
