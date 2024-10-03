import { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import CalendarDate from '@/components/taskListsPage/CalendarDate';
import useModalStore from '@/store/modalStore';
import { useTaskListsQuery } from '@/lib/taskListApi';
import AddCategoryModal from '@/components/taskListsPage/AddCategoryModal';
import { TaskListResponse } from '@/types/listTypes';

interface Props {
  children: ReactNode;
}

export default function ListLayout({ children }: Props) {
  const router = useRouter();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const { openModal } = useModalStore();

  const taskListsQuery = useTaskListsQuery(groupId);

  const handleAddCategoryClick = () => {
    openModal('AddCategory');
  };

  return (
    <>
      <AddCategoryModal />
      <section className="h-screen overflow-auto antialiased">
        <div className="lg:mx-auto pt-6 lg:pt-10 pb-6 px-4 md:px-6 2lg:px-0 w-full 2lg:w-[1200px]">
          <h2 className="mb-7 md:mb-6 text-2lg md:text-xl font-bold">할 일</h2>
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <CalendarDate />
            <button
              type="button"
              className="text-md font-regular text-color-brand-primary"
              onClick={handleAddCategoryClick}
            >
              + 새로운 목록 추가하기
            </button>
          </div>
          <ul className="flex flex-wrap gap-3 mb-4">
            {taskListsQuery.data?.data.taskLists.map(
              (taskLists: TaskListResponse) => (
                <li
                  key={taskLists.id}
                  className={clsx(
                    'h-6 text-lg font-medium text-text-default',
                    taskLists.id === taskListId &&
                      'border-b border-text-tertiary text-text-tertiary',
                  )}
                >
                  <Link href={`/group/${groupId}/task-lists/${taskLists.id}`}>
                    {taskLists.name}
                  </Link>
                </li>
              ),
            )}
          </ul>
          <div>{children}</div>
        </div>
      </section>
    </>
  );
}
