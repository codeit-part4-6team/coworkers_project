import { useRouter } from 'next/router';
import GroupMemberCard from '@/components/groupPage/GroupMemberCard';
import ReportCard from '@/components/groupPage/GroupReport';
import GroupHeader from '@/components/groupPage/GroupHeader';
import { useEffect, useState } from 'react';
import { getGroup } from '@/lib/groupApi';
import { TaskList } from '@/types/taskTypes';
import { getUserMemberships } from '@/lib/userApi';
import TaskListCard from '@/components/groupPage/TaskListCard';

interface Member {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
}

interface GroupData {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
  members: Member[];
  taskLists: TaskList[];
}

const GroupPage = () => {
  const router = useRouter();
  const { groupId } = router.query;

  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroupDataAndRole = async () => {
      if (groupId) {
        try {
          // Fetch group details
          const groupResponse = await getGroup(Number(groupId));
          setGroupData(groupResponse.data);

          // Fetch user memberships
          const membershipsResponse = await getUserMemberships();
          const memberships = membershipsResponse.data;
          const userMembership = memberships.find(
            (membership: any) => membership.groupId === Number(groupId),
          );

          if (userMembership) {
            setUserRole(userMembership.role);
          }
        } catch (error) {
          console.error('Error fetching group data or memberships:', error);
        }
      }
    };

    fetchGroupDataAndRole();
  }, [groupId]);
  if (!groupData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background-primary text-text-primary min-h-screen p-4">
      <main>
        <GroupHeader groupName={groupData.name} groupId={Number(groupId)} userRole={userRole} />
        <TaskListCard groupId={Number(groupId)} />
        {userRole === 'ADMIN' && <ReportCard taskLists={groupData.taskLists} />}
        <GroupMemberCard
          members={groupData.members}
          groupId={Number(groupId)}
          userRole={userRole}
        />
      </main>
    </div>
  );
};

export default GroupPage;
