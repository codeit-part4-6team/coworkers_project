import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import AlertIcon from '@/assets/alert.svg';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import { useDeleteRecurringTaskMutation } from '@/lib/taskApi';

interface Props {
  workToDoName: string;
}

export default function DeleteWorkToDoModal({ workToDoName }: Props) {
  const router = useRouter();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const { closeModal } = useModalStore();
  const { recurringId } = useApiResponseIdsStore();

  const queryClient = useQueryClient();
  const deleteRecurringTaskMutation = useDeleteRecurringTaskMutation();

  const handleDeleteClick = () => {
    deleteRecurringTaskMutation.mutate(
      {
        recurringId,
      },
      {
        onSuccess: () => {
          closeModal('deleteToDo');
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          router.push({
            pathname: `/group/${groupId}/task-lists/${taskListId}`,
          });
        },
        onError: () => {
          alert('삭제에 실패했습니다.');
        },
      },
    );
  };
  return (
    <Modal
      id="deleteToDo"
      className="px-4 pt-4 pb-8 md:w-[384px] md:rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="mt-6 mx-auto w-[280px]">
        <div className="flex flex-col items-center mb-6">
          <AlertIcon className="mb-4" />
          <p className="mb-2 text-center text-lg font-medium text-text-primary">
            {`'${workToDoName}'`}
            <br /> 할 일을 정말 삭제하시겠어요?
          </p>
          <p className="text-center text-md font-medium text-text-secondary">
            삭제 후에는 되돌릴 수 없습니다.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            option="outlinedSecondary"
            size="large"
            text="닫기"
            disabled={false}
            onClick={() => closeModal('deleteToDo')}
          />
          <Button
            option="danger"
            size="large"
            text="삭제하기"
            disabled={false}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </Modal>
  );
}
