import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import XIcon from '@/assets/x_icon.svg';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import { useEditTaskDetailMutation } from '@/lib/taskApi';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';
import useWorkToDoStore from '@/store/workToDoStore';

export default function EditWorkToDoModal() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const groupId = Number(router.query.groupId);
  const taskListId = Number(router.query.taskListId);
  const { closeModal } = useModalStore();
  const { taskId } = useApiResponseIdsStore();
  const { workToDo } = useWorkToDoStore();

  const editTaskDetailMutation = useEditTaskDetailMutation();

  const [title, setTitle] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    if (workToDo) {
      setTitle(workToDo?.name);
      setMemo(workToDo?.description);
    }
  }, [workToDo]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTaskDetailMutation.mutate(
      {
        groupId: groupId,
        taskListId: taskListId,
        taskId: taskId,
        data: {
          name: title,
          description: memo,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
          });
          setTitle('');
          setMemo('');
          closeModal('editToDo');
        },
      },
    );
  };

  const handleCloseClick = () => {
    setTitle('');
    setMemo('');
    closeModal('editToDo');
  };

  return (
    <Modal
      id="editToDo"
      className="px-6 pt-6 pb-8 md:w-[384px] md:rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="flex justify-end mb-4">
        <button type="button" onClick={handleCloseClick}>
          <XIcon />
        </button>
      </div>
      <h2 className="mb-4 text-center text-lg font-medium text-text-primary">
        할 일 수정하기
      </h2>
      <p className="mb-6 mx-auto w-[227px] text-center text-md font-medium text-text-default">
        할 일의 제목과 메모를 수정합니다.
      </p>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
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
            placeholder="할 일 제목을 입력해주세요.(30자 이내)"
            value={title}
            className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none"
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setTitle(e.target.value.trimStart());
              }
            }}
          />
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
            placeholder="메모를 입력해주세요.(255자 이내)"
            value={memo}
            className="mb-2 px-4 py-3 w-full h-[75px] border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none resize-none"
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setMemo(e.target.value.trimStart());
              }
            }}
          />
        </div>
        <Button
          option="solid"
          size="large"
          text="수정하기"
          disabled={!title}
          type="submit"
        />
      </form>
    </Modal>
  );
}
