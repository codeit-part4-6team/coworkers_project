import Member from '@/assets/member.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { deleteGroupMember } from '@/lib/groupApi';

interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
}

interface MemberItemProps {
  member: GroupMember;
  groupId: number;
  userRole: string | null;
  onDelete: (memberId: number) => void;
  onClick: () => void; 
}

const MemberItem = ({
  member,
  groupId,
  userRole,
  onDelete,
}: MemberItemProps) => {
  const kebabOptions: DropdownOption[] = [
    { label: '삭제하기', value: 'delete' },
  ];

  const handleChange = async (selectedOption: DropdownOption) => {
    if (selectedOption.value === 'delete') {
      const confirmDelete = window.confirm(
        `${member.userName}님을 정말로 삭제하시겠습니까?`,
      );
      if (!confirmDelete) return;

      try {
        await deleteGroupMember(groupId, member.userId);
        onDelete(member.userId);
        alert('멤버가 삭제되었습니다.');
      } catch (error) {
        console.error('Failed to delete member:', error);
        alert('멤버 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="bg-background-secondary rounded-2xl sm:py-5 sm:px-6 py-3 px-4 flex justify-between items-start">
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
      {userRole === 'ADMIN' && (
        <div className="self-stretch flex items-center ml-2">
          <Dropdown
            options={kebabOptions}
            onChange={handleChange}
            customButton={<Kebab width="16" height="16" />}
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default MemberItem;
