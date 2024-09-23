import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import AlertIcon from '@/assets/alert.svg';
import useModalStore from '@/store/modalStore';

export default function DeleteWorkToDoModal() {
  const { closeModal } = useModalStore();
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
            ‘법인 설립 안내 드리기'
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
          />
        </div>
      </div>
    </Modal>
  );
}
