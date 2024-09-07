import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';
import { useQuery } from '@tanstack/react-query';
import basicApi from '@/lib/basicAxios';
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import Dropdown, { DropdownOption } from '@/components/dropdown/Dropdown';
import { Group } from '@/type/usergroup';

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('토큰이 없습니다');
  }
  return token;
};

const fetchData = async (endpoint: string) => {
  try {
    const token = getAuthToken();

    const response = await basicApi.get(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`${endpoint} 데이터 불러오기 실패`, error);
    return null;
  }
};

const fetchUserGroups = async () => {
  const data = await fetchData('/user/groups');
  return data || [];
};

const fetchUserData = async () => {
  const data = await fetchData('/user');
  return data || null;
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSideMenu, setIsSideMenu] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<DropdownOption | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: fetchUserData,
    enabled: isLoggedIn,
    retry: false,
  });

  const { data: userGroups = [] } = useQuery<Group[]>({
    queryKey: ['userGroups'],
    queryFn: fetchUserGroups,
    enabled: isLoggedIn,
    retry: false,
  });

  const isLogin = !!userData || isLoggedIn;

  const handleMenuClick = () => {
    setIsSideMenu((prev) => !prev);
  };

  const handleTeamChange = (selectedOption: DropdownOption) => {
    setSelectedTeam(selectedOption);
  };

  const teamOptions: DropdownOption[] = userGroups.map((group: Group) => ({
    label: group.name,
    value: group.id.toString(),
  }));

  const placeholderText = selectedTeam
    ? selectedTeam.label
    : teamOptions[0]?.label;

  return (
    <div className="bg-background-secondary flex justify-between items-center px-[24px] lg:px-[350px] border-border-primary-10">
      <div className="my-[14px] flex items-center gap-[40px]">
        <div className="flex items-center gap-[16px]">
          {isLogin && <Menu className="md:hidden" onClick={handleMenuClick} />}
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {isLogin && (
          <ul className="flex items-center gap-[40px]">
            {teamOptions.length > 0 && (
              <Dropdown
                options={teamOptions}
                onChange={handleTeamChange}
                placeholder={placeholderText}
                size="md"
                className="hidden md:block"
              />
            )}
            <Link href="/boards">
              <li className="hidden md:block text-lg text-text-primary font-medium">
                자유게시판
              </li>
            </Link>
          </ul>
        )}
      </div>
      {isLogin && (
        <div className="flex items-center gap-[8px]">
          <User className="md:w-[16px] md:h-[16px]" />
          <p className="hidden lg:block text-text-primary text-md font-medium">
            {userData?.nickname}
          </p>
        </div>
      )}
      {isSideMenu && (
        <>
          <div
            className="fixed inset-0 bg-blend-darken bg-black bg-opacity-50"
            onClick={() => setIsSideMenu(false)}
          ></div>
          <SideMenu onClose={() => setIsSideMenu(false)} groups={userGroups} />
        </>
      )}
    </div>
  );
};

export default Header;
