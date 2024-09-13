import Member from '@/assets/member.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';

interface TeamMemberCardProps {
  members: { name: string; email: string }[];
}

interface MemberItemProps {
  name: string;
  email: string;
}

const MemberItem = ({ name, email }: MemberItemProps) => {
  const kebabOptions = [
    { label: '삭제하기', value: 'delete' },
  ];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div className="bg-background-secondary rounded-2xl py-3 px-4 flex justify-between items-start">
      <div>
        <div className="flex items-center mb-1">
          <Member className="mr-2" />
          <p className="font-medium text-md">{name}</p>
        </div>
        <p className="text-xs text-text-secondary truncate">{email}</p>
      </div>
      <div className="self-stretch flex items-center">
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

const TeamMemberCard = ({ members }: TeamMemberCardProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-lg font-medium">
          멤버
          <span className="text-text-default font-regular ml-2">
            ({members.length}명)
          </span>
        </h2>
        <button className="text-color-brand-primary text-sm font-medium">
          + 새로운 멤버 초대하기
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {members.map((member, index) => (
          <MemberItem key={index} name={member.name} email={member.email} />
        ))}
      </div>
    </div>
  );
};

export default TeamMemberCard;
