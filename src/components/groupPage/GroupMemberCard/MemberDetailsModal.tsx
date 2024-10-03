/* eslint-disable @next/next/no-img-element */
import XIcon from '@/assets/x_icon.svg';
import Member from '@/assets/member.svg';
import Modal from '@/components/common/Modal';

interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
}

interface MemberDetailsModalProps {
  selectedMember: GroupMember | null;
  handleCloseMemberModal: () => void;
  handleCopyEmail: () => void;
}

const MemberDetailsModal = ({
  selectedMember,
  handleCloseMemberModal,
  handleCopyEmail,
}: MemberDetailsModalProps) => {
  if (!selectedMember) return null;

  return (
    <Modal
      id="memberDetails"
      className="sm:w-96 w-full p-6 rounded-3xl bg-background-secondary text-text-primary
                   fixed sm:top-1/2 sm:bottom-1/2 sm:left-1/2 sm:right-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2
                   top-auto bottom-0 left-0 right-0 transform-none rounded-t-xl sm:rounded-b-xl rounded-b-none"
      positionBottom
    >
      <div className="flex flex-col items-center">
        <button
          onClick={handleCloseMemberModal}
          className="ml-auto text-gray-400 hover:text-white mb-2"
        >
          <XIcon />
        </button>
        <div className="mb-4">
          {selectedMember.userImage ? (
            <img
              src={selectedMember.userImage}
              alt={selectedMember.userName}
              className="rounded-full w-16 h-16 object-cover"
            />
          ) : (
            <Member className="w-16 h-16 text-text-secondary" />
          )}
        </div>
        <p className="text-lg font-medium mb-2">
          {selectedMember.userName}
        </p>
        <p className="text-md text-text-secondary mb-6">
          {selectedMember.userEmail}
        </p>
        <button
          onClick={handleCopyEmail}
          className="w-[280px] mx-auto bg-color-brand-primary text-white py-3 rounded-xl font-medium hover:bg-[#0d9668] transition-colors"
        >
          이메일 복사하기
        </button>
      </div>
    </Modal>
  );
};

export default MemberDetailsModal;