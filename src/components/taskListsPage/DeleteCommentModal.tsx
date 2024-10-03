import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import AlertIcon from '@/assets/alert.svg';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteTaskCommentMutation } from '@/lib/taskCommentApi';

export default function DeleteCommentModal() {
  const router = useRouter();
  const taskId = Number(router.query.taskId);
  const { closeModal } = useModalStore();
  const { commentId, setCommentId } = useApiResponseIdsStore();
  const queryClient = useQueryClient();
  const deleteTaskCommentMutation = useDeleteTaskCommentMutation();

  const handleDeleteClick = () => {
    deleteTaskCommentMutation.mutate(
      {
        commentId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks', taskId, 'comments'],
          });
          closeModal('deleteComment');
          setCommentId(0);
        },
      },
    );
  };

  return (
    <Modal
      id="deleteComment"
      className="px-4 pt-4 pb-8 md:w-[384px] md:rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="mt-6 mx-auto w-[280px]">
        <div className="flex flex-col items-center mb-6">
          <AlertIcon className="mb-4" />
          <p className="mb-2 text-center text-lg font-medium text-text-primary">
            정말 삭제하시겠어요?
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
            onClick={() => closeModal('deleteComment')}
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
