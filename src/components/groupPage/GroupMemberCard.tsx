import Member from '@/assets/member.svg';
import Kebab from '@/assets/kebab.svg';
import Dropdown, { DropdownOption } from '../common/Dropdown';

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
}

interface MemberItemProps {
  member: GroupMember;
}

const MemberItem = ({ member }: MemberItemProps) => {
  const kebabOptions = [{ label: '삭제하기', value: 'delete' }];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  return (
    <div className="bg-background-secondary rounded-2xl py-5 px-6 flex justify-between items-start">
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

const GroupMemberCard = ({ members }: GroupMemberCardProps) => {
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {members.map((member) => (
          <MemberItem key={member.userId} member={member} />
        ))}
      </div>
    </div>
  );
};

export default GroupMemberCard;
