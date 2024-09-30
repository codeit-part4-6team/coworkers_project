import Modal from '../common/Modal';
import Member from '@/assets/member.svg';
import Kebab from '@/assets/kebab.svg';
import XIcon from '@/assets/x_icon.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';
import { getGroupInvitation } from '@/lib/groupApi';
import useModalStore from '@/store/modalStore';
import { useState } from 'react';

interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
}

interface GroupMemberCardProps {
  members: GroupMember[];
  groupId: number;
}

interface MemberItemProps {
  member: GroupMember;
  onClick: () => void;
}

const MemberItem = ({ member, onClick }: MemberItemProps) => {
  const kebabOptions = [{ label: '삭제하기', value: 'delete' }];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div
      className="bg-background-secondary rounded-2xl sm:py-5 sm:px-6 py-3 px-4 flex justify-between items-start"
      onClick={onClick}
    >
      <div className="flex items-start w-full">
        <div className="hidden sm:block sm:mr-3">
          <Member className="size-8" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center mb-1 sm:mb-0">
            <Member className="size-6 mr-2 sm:hidden" />
            <p className="font-medium text-md">{member.userName}</p>
          </div>
          <p className="text-xs text-text-secondary truncate">
            {member.userEmail}
          </p>
        </div>
      </div>
      <div className="self-stretch flex items-center ml-2">
        <Dropdown
          options={kebabOptions}
          onChange={handleChange}
          customButton={<Kebab width="16" height="16" />}
          size="sm"
        />
      </div>
    </div>
  );
};

const GroupMemberCard = ({ members, groupId }: GroupMemberCardProps) => {
  const { openModal, closeModal } = useModalStore();
  const [invitationLink, setInvitationLink] = useState('');
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(
    null,
  );

  const handleOpenInviteModal = () => {
    console.log('Open modal');
    getGroupInvitation(groupId)
      .then((response) => {
        const token = response.data;
        const link = `${window.location.origin}/invitation?token=${token}`;
        setInvitationLink(link);
        openModal('inviteMember');
      })
      .catch((err) => {
        console.error('Error fetching invitation token:', err);
      });
  };

  const handleCloseInviteModal = () => closeModal('inviteMember');

  const handleCopyLink = () => {
    if (!invitationLink) return;
    navigator.clipboard.writeText(invitationLink).then(() => {
      alert('링크가 클립보드에 복사되었습니다.');
    });
  };

  const handleOpenMemberModal = (member: GroupMember) => {
    setSelectedMember(member);
    openModal('memberDetails');
  };

  const handleCloseMemberModal = () => {
    closeModal('memberDetails');
    setSelectedMember(null);
  };

  const handleCopyEmail = () => {
    if (selectedMember) {
      navigator.clipboard.writeText(selectedMember.userEmail);
      alert('이메일이 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-lg font-medium">
          멤버
          <span className="text-text-default font-regular ml-2">
            ({members.length}명)
          </span>
        </h2>
        <button
          onClick={handleOpenInviteModal}
          className="text-color-brand-primary text-sm font-medium"
        >
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberItem
            key={member.userId}
            member={member}
            onClick={() => handleOpenMemberModal(member)}
          />
        ))}
      </div>

      {/* 멤버 초대 모달 */}
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

      {/* 멤버 상세 정보 모달 */}
      {selectedMember && (
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
      )}
    </div>
  );
};

export default GroupMemberCard;
