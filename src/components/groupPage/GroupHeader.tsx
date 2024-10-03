import Gear from '@/assets/gear.svg';
import thumbnail from '@/assets/thumbnail_team.png';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useRouter } from 'next/router';
import { deleteGroup } from '@/lib/groupApi';
import { useQueryClient } from '@tanstack/react-query';
import { useUserGroupsQuery } from '@/lib/taskListApi';

interface GroupHeaderProps {
  groupName: string;
  groupId: number;
  userRole: string | null;
}

const GroupHeader = ({ groupName, groupId, userRole }: GroupHeaderProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userGroups, isLoading, isError } = useUserGroupsQuery();

  const teamOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const handleOptionChange = async (option: DropdownOption) => {
    if (option.value === 'edit') {
      router.push(`/group/${groupId}/edit`);
    } else if (option.value === 'delete') {
      try {
        const confirmDelete =
          window.confirm('정말로 이 팀을 삭제하시겠습니까?');
        if (!confirmDelete) return;

        await deleteGroup(groupId);

        await queryClient.invalidateQueries({ queryKey: ['user', 'groups'] });
        const updatedUserGroups = queryClient.getQueryData<any[]>([
          'userGroups',
        ]);

        if (updatedUserGroups && updatedUserGroups.length > 0) {
          router.push(`/group/${updatedUserGroups[0].id}`);
        } else {
          router.push('/group');
        }
      } catch (error) {
        console.error('Failed to delete the group:', error);
        alert('팀 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user groups.</div>;
  }

  return (
    <div
      className="px-6 py-5 bg-background-secondary rounded-xl shadow-md border border-border-primary-10 mb-6 mt-2"
      style={{
        backgroundImage: `url(${thumbnail.src})`,
        backgroundPosition: 'center right 80px',
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">{groupName}</h1>
          {userRole === 'ADMIN' && (
            <Dropdown
              options={teamOptions}
              onChange={handleOptionChange}
              customButton={<Gear />}
              size="md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
