import { useEffect, useState } from 'react';
import { Group } from '@/types/usergroup';
import Check from '@/assets/check_team.svg';
import Kebab from '@/assets/kebab.svg';
import Plus from '@/assets/plus_icon.svg';
import Link from 'next/link';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { useRouter } from 'next/router';
import { deleteGroup } from '@/lib/groupApi';
import useAuthStore from '@/store/authStore';

const TeamDropdown = () => {
  const { teams, fetchTeams, setTeams } = useAuthStore();
  const [selectedTeam, setSelectedTeam] = useState<Group | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedTeamId = localStorage.getItem('selectedTeam');
    if (savedTeamId && teams.length > 0) {
      const savedTeam = teams.find((team) => team.id === parseInt(savedTeamId));
      if (savedTeam) {
        setSelectedTeam(savedTeam);
      }
    }
  }, [teams]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const handleTeamSelect = (team: Group) => {
    setSelectedTeam(team);
    setIsOpen(false);
    localStorage.setItem('selectedTeam', team.id.toString());
    router.push(`/group/${team.id}`);
  };

  const handleEdit = (team: Group) => {
    router.push(`/group/${team.id}/edit`);
  };

  const handleDelete = async (team: Group) => {
    try {
      await deleteGroup(team.id);
      const remainingTeams = teams.filter((t) => t.id !== team.id);
      setTeams(remainingTeams);
      if (remainingTeams.length > 0) {
        setSelectedTeam(remainingTeams[0]);
        localStorage.setItem('selectedTeam', remainingTeams[0].id.toString());
        router.push(`/group/${remainingTeams[0].id}`);
      } else {
        setSelectedTeam(null);
        localStorage.removeItem('selectedTeam');
      }
    } catch (error) {
      console.error('팀 삭제 중 오류 발생:', error);
    }
  };

  const handleKebabChange = (selectedOption: DropdownOption, team: Group) => {
    if (selectedOption.value === 'edit') {
      handleEdit(team);
    } else if (selectedOption.value === 'delete') {
      handleDelete(team);
    }
  };

  const kebabOptions: DropdownOption[] = [
    { label: '수정하기', value: 'edit' },
    { label: '삭제하기', value: 'delete' },
  ];

  const kebabButton = (
    <div>
      <Kebab className="w-4 h-4 text-icon-primary" />
    </div>
  );

  if (!teams.length) {
    return <div>팀이 없습니다.</div>;
  }

  return (
    <div className="relative">
      <button
        className="flex items-center gap-[10px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-text-primary text-lg font-medium">
          {selectedTeam ? selectedTeam.name : '팀 선택'}
        </div>
        <Check />
      </button>

      {isOpen && (
        <div className="absolute flex flex-col items-center top-[45px] right-5 lg:right-20 gap-2 w-[218px] bg-background-secondary rounded-[12px] p-4 z-50">
          {teams.map((team) => (
            <div
              key={team.id}
              className="w-full flex justify-between items-center px-2 py-[7px] gap-9 border border-none rounded-[8px] hover:bg-background-tertiary"
            >
              <button
                onClick={() => handleTeamSelect(team)}
                className="flex items-center cursor-pointer"
              >
                <div className="flex items-center cursor-pointer">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-8 h-8 border border-none rounded-[6px] mr-3 object-cover"
                  />
                  <span className="text-text-primary text-lg font-medium">
                    {team.name}
                  </span>
                </div>
              </button>
              <div className="flex">
                <Dropdown
                  options={kebabOptions}
                  onChange={(option) => handleKebabChange(option, team)}
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
