import { useRouter } from 'next/router';
import TodoListCard from '@/components/groupPage/TodoListCard';
import GroupMemberCard from '@/components/groupPage/GroupMemberCard';
import ReportCard from '@/components/groupPage/GroupReport';
import GroupHeader from '@/components/groupPage/GroupHeader';
import { useEffect, useState } from 'react';
import { getGroup } from '@/lib/groupApi';

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: any | null;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
  doneBy: {
    user: any | null;
  };
  commentCount: number;
  frequency: string;
}

interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}

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

  useEffect(() => {
    if (groupId) {
      getGroup(Number(groupId))
        .then((response) => {
          const groupDetails = response.data;
          setGroupData(groupDetails);
        })
        .catch((error) => {
          console.error('Error fetching group data:', error);
        });
    }
  }, [groupId]);

  if (!groupData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background-primary text-text-primary min-h-screen p-4">
      <main>
        <GroupHeader groupName={groupData.name} />
        <TodoListCard groupId={Number(groupId)} />
        <ReportCard taskLists={groupData.taskLists} />
        <GroupMemberCard members={groupData.members} groupId={Number(groupId)} />
      </main>
    </div>
  );
};

export default GroupPage;
