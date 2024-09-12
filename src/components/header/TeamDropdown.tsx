import { useState } from 'react';
import { Group } from '@/types/usergroup';
import Check from '@/assets/check_team.svg';
import Kebab from '@/assets/kebab.svg';
import Plus from '@/assets/plus_icon.svg';
import Link from 'next/link';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';

interface TeamDropdownProps {
  options: Group[];
  onChange: (team: Group) => void;
}

const TeamDropdown = ({ options, onChange }: TeamDropdownProps) => {
  const initialTeam = options.length > 0 ? options[0] : null;
  const [selectedTeam, setSelectedTeam] = useState<Group | null>(initialTeam);
  const [isOpen, setIsOpen] = useState(false);

  const kebabOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  const kebabButton = (
    <div>
      <Kebab className="w-4 h-4 text-icon-primary" />
    </div>
  );

  const handleTeamSelect = (team: Group) => {
    setSelectedTeam(team);
    onChange(team);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-[10px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-text-primary text-lg font-medium">
          {selectedTeam && selectedTeam.name}
        </div>
        <Check />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col items-center top-[45px] right-5 lg:right-20 gap-2 w-[218px] bg-background-secondary rounded-[12px] p-4 z-50">
          {options.map((team) => (
            <div
              key={team.id}
              className="flex items-center px-2 py-[7px] gap-9 border border-none rounded-[8px] hover:bg-background-tertiary"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleTeamSelect(team)}
              >
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-8 h-8 border border-none rounded-[6px] mr-3"
                />
                <span className="text-text-primary text-lg font-medium">
                  {team.name}
                </span>
              </div>
              <div className="flex">
                <Dropdown
                  options={kebabOptions}
                  onChange={handleChange}
                  customButton={kebabButton}
                  size="sm"
                />
              </div>
            </div>
          ))}
          <Link href="/addteam">
            <button className="flex items-center gap-1 mt-2 border rounded-[12px] py-[15px] px-11 border-background-inverse">
              <Plus />
              <span className="text-lg text-text-primary font-medium">
                팀 추가하기
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TeamDropdown;
