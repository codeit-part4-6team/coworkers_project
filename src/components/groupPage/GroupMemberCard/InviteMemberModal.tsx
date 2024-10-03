import XIcon from '@/assets/x_icon.svg';
import Modal from '@/components/common/Modal';

interface InviteMemberModalProps {
  invitationLink: string;
  handleCloseInviteModal: () => void;
  handleCopyLink: () => void;
}

const InviteMemberModal = ({
  invitationLink,
  handleCloseInviteModal,
  handleCopyLink,
}: InviteMemberModalProps) => {
  return (
    <Modal
      id="inviteMember"
      className="sm:w-96 w-full p-6 rounded-2xl bg-background-secondary text-text-primary
                   fixed sm:top-1/2 sm:bottom-1/2 sm:left-1/2 sm:right-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2
                   top-auto bottom-0 left-0 right-0 transform-none rounded-t-xl sm:rounded-b-xl rounded-b-none"
      positionBottom
    >
      <div className="flex flex-col">
        <button
          onClick={handleCloseInviteModal}
          className="ml-auto text-gray-400 hover:text-white mb-2"
        >
          <XIcon />
        </button>
        <p className="text-center text-lg font-medium mb-4">멤버 초대</p>
        <p className="text-center text-md mb-6">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </p>
        <button
          onClick={handleCopyLink}
          className="w-[280px] mx-auto bg-color-brand-primary text-white py-3 rounded-xl font-medium hover:bg-[#0d9668] transition-colors"
        >
          링크 복사하기
        </button>
      </div>
    </Modal>
  );
};

export default InviteMemberModal;
