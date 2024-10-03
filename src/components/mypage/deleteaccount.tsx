import DeleteIcon from '@/assets/secession.svg';
import Modal from '../common/Modal';
import useModalStore from '@/store/modalStore';
import Button from '../common/Button';
import Alert from '@/assets/alert.svg';
import { deleteAccount } from '@/lib/auth';
import { useRouter } from 'next/router';

export default function DeleteAccount() {
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();
  const DeleteAccountEvent = async () => {
    const response = await deleteAccount();
    router.replace('/');
  };

  return (
    <div>
      <div className={`flex`} onClick={() => openModal('deleteAccount')}>
        <DeleteIcon />
        <p>회원 탈퇴하기</p>
      </div>
      <Modal
        id="deleteAccount"
        positionBottom={true}
        className={`w-full h-fit bg-background-secondary md:rounded-[12px] md:w-[384px]`}
      >
        <div className="flex flex-col w-[280px] items-center mt-10 mx-auto">
          <Alert className={`mb-4`} />
          <div className="mb-7 text-center mx-5">
            <p className={`text-text-primary text-lg font-medium mb-2`}>
              회원 탈퇴를 진행하시겠어요?
            </p>
            <p className={`text-text-secondary text-md font-medium`}>
              그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서
              나가집니다.
            </p>
          </div>
          <div className={`flex w-[280px] gap-2 h-12 mb-8`}>
            <Button
              option="outlinedSecondary"
              text="닫기"
              size="large"
              onClick={() => closeModal('deleteAccount')}
            />
            <Button
              option="danger"
              text="회원 탈퇴"
              size="large"
              onClick={DeleteAccountEvent}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
