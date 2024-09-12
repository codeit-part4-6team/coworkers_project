import TeamHeader from '@/components/teamPage/TeamHeader';
import TodoListCard from '@/components/teamPage/TodoListCard';
import TeamMemberCard from '@/components/teamPage/TeamMemberCard';
import ReportCard from '@/components/teamPage/TeamReport';

const CoworkersMobileUI: React.FC = () => {
  const teamMembers = [
    { name: '우지은', email: 'jieun@codeit.com' },
    { name: '강미희', email: 'jieunjieun@codeit.com' },
    { name: '이동규', email: 'jieunjieun@codeit.com' },
    { name: '김다혜', email: 'jieunjieun@codeit.com' },
  ];

  const todos = [
    { title: '법인 설립', progress: 3, total: 5 },
    {
      title: '변경 등기',
      progress: 5,
      total: 5,
      completed: true,
    },
    { title: '정기 주총', progress: 3, total: 5 },
    { title: '법인 설립', progress: 3, total: 5 },
  ];

  return (
    <div className="bg-background-primary text-text-primary min-h-screen p-4">
      <main>
        <TeamHeader teamName={'경영관리팀'} />
        <TodoListCard todos={todos} />
        <ReportCard totalTasks={20} completedTasks={5} />
        <TeamMemberCard members={teamMembers} />
      </main>
    </div>
  );
};

export default CoworkersMobileUI;
