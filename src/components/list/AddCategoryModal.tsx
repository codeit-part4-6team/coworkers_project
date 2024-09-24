import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import XIcon from '@/assets/x_icon.svg';
import useModalStore from '@/store/modalStore';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateTaskListMutation } from '@/lib/taskListApi';

export default function AddCategoryModal() {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createTaskListMutation = useCreateTaskListMutation();

  const [categoryName, setCategoryName] = useState('');

  const handleSubmitClick = () => {
    createTaskListMutation.mutate(
      { groupId: 869, name: categoryName },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['groups', 869] });
        },
      },
    );
    setCategoryName('');
    closeModal('AddCategory');
  };

  const handleCloseClick = () => {
    setCategoryName('');
    closeModal('AddCategory');
  };

  return (
    <Modal
      id="AddCategory"
      className="px-4 pt-4 pb-8 md:w-[384px] rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="flex justify-end mb-2 pr-2">
        <button type="button" onClick={handleCloseClick}>
          <XIcon />
        </button>
      </div>
      <div className="flex flex-col items-center gap-2 mb-4 mx-auto w-[179px]">
        <h2 className="text-lg font-medium text-text-primary">
          새로운 목록 추가
        </h2>
        <p className="text-center text-md font-medium text-text-secondary ">
          할 일에 대한 목록을 추가하고
          <br />
          목록별 할 일을 만들 수 있습니다.
        </p>
      </div>
      <form className="flex justify-center">
        <div className="flex flex-col gap-6 w-[280px]">
          <div className="flex flex-col items-start gap-2">
            <label
              htmlFor="category"
              className="text-lg font-medium text-text-primary"
            >
              목록 이름
            </label>
            <input
              id="category"
              type="text"
              value={categoryName}
              placeholder="목록 이름을 입력해주세요."
              onChange={(e) => setCategoryName(e.target.value.trimStart())}
              className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary placeholder:text-text-default bg-background-secondary outline-none"
            />
          </div>
          <Button
            type="button"
            option="solid"
            size="large"
            text="만들기"
            disabled={createTaskListMutation.isPending || !categoryName}
            onClick={handleSubmitClick}
          />
        </div>
      </form>
    </Modal>
  );
}
