import Member from '@/assets/member.svg';

interface TeamMemberCardProps {
  members: { name: string; email: string }[];
}

interface MemberItemProps {
  name: string;
  email: string;
}

const MemberItem = ({ name, email }: MemberItemProps) => {
  return (
    <div className="bg-background-secondary rounded-2xl py-3 px-4">
      <div className="flex items-center mb-1">
        <Member className="mr-2" />
        <p className="font-medium text-md">{name}</p>
      </div>
      <p className="text-xs text-text-secondary truncate">{email}</p>
    </div>
  );
};

const TeamMemberCard = ({ members }: TeamMemberCardProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-lg font-semibold">멤버 ({members.length}명)</h2>
        <button className="text-color-brand-primary text-sm font-medium">
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {members.map((member, index) => (
          <MemberItem key={index} name={member.name} email={member.email} />
        ))}
      </div>
      {/*드롭다운*/}
    </div>
  );
};

export default TeamMemberCard;
