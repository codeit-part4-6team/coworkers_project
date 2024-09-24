import React from 'react';
import GroupHeader from "@/components/groupPage/GroupHeader";
import GroupMemberCard from "@/components/groupPage/GroupMemberCard";
import ReportCard from "@/components/groupPage/GroupReport";
import TodoListCard from "@/components/groupPage/TodoListCard";

interface GroupMember {
  userId: number;
  groupId: number;
  userName: string;
  userEmail: string;
  userImage: string | null;
  role: string;
}

interface Todo {
  id: number;
  name: string;
  progress?: number;
  tasks: any[];
}

const CoworkersMobileUI: React.FC = () => {
  const teamMembers: GroupMember[] = [
    {
      userId: 1,
      groupId: 101,
      userName: "멤버1",
      userEmail: "chulsoo.kim@example.com",
      userImage: "https://example.com/images/chulsoo.jpg",
      role: "관리자"
    },
    {
      userId: 2,
      groupId: 101,
      userName: "이영희",
      userEmail: "younghee.lee@example.com",
      userImage: null,
      role: "멤버"
    },
    {
      userId: 3,
      groupId: 101,
      userName: "박지민",
      userEmail: "jimin.park@example.com",
      userImage: "https://example.com/images/jimin.jpg",
      role: "멤버"
    },
    {
      userId: 4,
      groupId: 101,
      userName: "정수연",
      userEmail: "suyeon.jung@example.com",
      userImage: "https://example.com/images/suyeon.jpg",
      role: "멤버"
    },
    {
      userId: 5,
      groupId: 101,
      userName: "홍길동",
      userEmail: "gildong.hong@example.com",
      userImage: null,
      role: "멤버"
    },
    {
      userId: 6,
      groupId: 101,
      userName: "강민서",
      userEmail: "minseo.kang@example.com",
      userImage: "https://example.com/images/minseo.jpg",
      role: "멤버"
    }
  ];

  const todos: Todo[] = [
    { id: 1, name: '법인 설립', tasks: [] },
    {
      id: 2,
      name: '변경 등기',
      progress: 5,
      tasks: []
    },
    { id: 3, name: '정기 주총', tasks: [] },
    { id: 4, name: '법인 설립', tasks: [] },
  ];

  return (
    <div className="bg-background-primary text-text-primary min-h-screen p-4">
      <main>
        <GroupHeader groupName={'경영관리팀'} />
        <TodoListCard taskLists={todos} />
        <ReportCard taskLists={todos} />
        <GroupMemberCard members={teamMembers} />
      </main>
    </div>
  );
};

export default CoworkersMobileUI;