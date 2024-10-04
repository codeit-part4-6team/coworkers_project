import { useState } from 'react';
import MemberItem from './MemberItem';
import InviteMemberModal from './InviteMemberModal';
import MemberDetailsModal from './MemberDetailsModal';
import { getGroupInvitation } from '@/lib/groupApi';
import useModalStore from '@/store/modalStore';

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
  userRole: string | null;
}

const GroupMemberCard = ({
  members,
  groupId,
  userRole,
}: GroupMemberCardProps) => {
  const { openModal, closeModal } = useModalStore();
  const [invitationLink, setInvitationLink] = useState('');
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(
    null,
  );
  const [currentMembers, setCurrentMembers] = useState<GroupMember[]>(members); // Local state for members

  const handleOpenInviteModal = async () => {
    try {
      const response = await getGroupInvitation(groupId);
      const token = response.data;
      const link = `${window.location.origin}/invitation?token=${token}`;
      setInvitationLink(link);
      openModal('inviteMember');
    } catch (err) {
      console.error('Error fetching invitation token:', err);
    }
  };

  const handleCloseInviteModal = () => closeModal('inviteMember');

  const handleCopyLink = async () => {
    if (!invitationLink) return;

    try {
      await navigator.clipboard.writeText(invitationLink);
      alert('링크가 클립보드에 복사되었습니다.');
    } catch (error) {
      console.error('Error copying link to clipboard:', error);
    }
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

  const handleDeleteMember = (memberId: number) => {
    setCurrentMembers((prevMembers) =>
      prevMembers.filter((member) => member.userId !== memberId),
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-lg font-medium">
          멤버
          <span className="text-text-default font-regular ml-2">
            ({currentMembers.length}명)
          </span>
        </h2>
        {userRole === 'ADMIN' && (
          <button
            onClick={handleOpenInviteModal}
            className="text-color-brand-primary text-sm font-medium"
          >
            + 새로운 멤버 초대하기
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {currentMembers.map((member) => (
          <MemberItem
            key={member.userId}
            member={member}
            groupId={groupId}
            userRole={userRole}
            onDelete={handleDeleteMember} // Handle deletion locally
            onClick={() => handleOpenMemberModal(member)}
          />
        ))}
      </div>

      <InviteMemberModal
        invitationLink={invitationLink}
        handleCloseInviteModal={handleCloseInviteModal}
        handleCopyLink={handleCopyLink}
      />

      <MemberDetailsModal
        selectedMember={selectedMember}
        handleCloseMemberModal={handleCloseMemberModal}
        handleCopyEmail={handleCopyEmail}
      />
    </div>
  );
};

export default GroupMemberCard;
