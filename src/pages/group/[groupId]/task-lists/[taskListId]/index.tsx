import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import ListLayout from '@/components/taskListsPage/ListLayout';
import WorkToDoContainer from '@/components/taskListsPage/WorkToDoContainer';
import FloatingButton from '@/components/common/FloatingButton';
import CreateWorkToDoModal from '@/components/taskListsPage/CreateWorkToDoModal';
import EditWorkToDoModal from '@/components/taskListsPage/EditWorkToDoModal';
import DeleteWorkToDoModal from '@/components/taskListsPage/DeleteWorkToDoModal';
import useModalStore from '@/store/modalStore';
import { useTasksQuery, useOrderTaskDetailMutation } from '@/lib/taskApi';
import { formatThirdDate } from '@/utils/formatDate';
import useSelectedDateStore from '@/store/selectedDateStore';
import { TaskResponse } from '@/types/listTypes';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable as Droppable } from '@/components/taskListsPage/StrictModeDroppable';

export default function List() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const { openModal } = useModalStore();
  const { selectedDate } = useSelectedDateStore();

  const [workToDoName, setWorkToDoName] = useState('');

  const formattedDate = formatThirdDate(selectedDate);

  const tasksQuery = useTasksQuery(groupId, taskListId, formattedDate);

  const orderTaskDetailMutation = useOrderTaskDetailMutation();

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    if (sourceIndex !== destinationIndex) {
      // const updatedTasks = Array.from(tasksQuery.data?.data);
      // updatedTasks.splice(sourceIndex, 1);
      // updatedTasks.splice(destinationIndex, 0, draggableId);

      orderTaskDetailMutation.mutate(
        {
          groupId,
          taskListId,
          taskId: draggableId,
          displayIndex: destinationIndex,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ['groups', groupId, 'taskLists', taskListId],
            });
          },
        },
      );
    }
  };

  return (
    <>
      <CreateWorkToDoModal />
      <EditWorkToDoModal />
      <DeleteWorkToDoModal workToDoName={workToDoName} />
      <ListLayout>
        {tasksQuery.data?.data.length > 0 ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks" direction="vertical">
              {(provided) => (
                <div
                  className="flex flex-col gap-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasksQuery.data?.data.map((data: TaskResponse) => (
                    <Draggable
                      key={data.id}
                      draggableId={String(data.id)}
                      index={data.displayIndex}
                    >
                      {(provided) => (
                        <div
                          key={data.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <WorkToDoContainer
                            data={{ ...data }}
                            setWorkToDoName={setWorkToDoName}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-md font-medium text-text-default">
            <p>아직 할 일 목록이 없습니다.</p>
            <p>새로운 목록을 추가해주세요.</p>
          </div>
        )}
      </ListLayout>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-12 2lg:custom-right w-[125px] h-12 font-semibold">
        <FloatingButton
          option="add"
          text="할 일 추가"
          disabled={false}
          onClick={() => openModal('createToDo')}
        />
      </div>
    </>
  );
}
