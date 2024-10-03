import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';
import { useQuery } from '@tanstack/react-query';
import { basicAxios } from '@/lib/basicAxios';
import { useState, useEffect } from 'react';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import { Group } from '@/types/usergroup';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import Cancel from '@/assets/x_icon.svg';
import TeamDropdown from './TeamDropdown';

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

    const response = await basicAxios.get(endpoint, {
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
  const [selectedTeam, setSelectedTeam] = useState<Group | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const { openModal, closeModal } = useModalStore();

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

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = () => {
    openModal('sideMenu');
  };

  const handleTeamChange = (team: Group) => {
    setSelectedTeam(team);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const teamOptions = userGroups.map((group: Group) => ({
    ...group,
  }));

  const userOptions: DropdownOption[] = [
    { label: '마이 히스토리', value: 'myHistory' },
    { label: '계정 설정', value: 'accountSettings' },
    { label: '팀 참여', value: 'joinTeam' },
    { label: '로그아웃', value: 'logout' },
  ];

  return (
    <div className="bg-background-secondary h-[60px] px-6 border-b border-border-primary-10">
      <div className="flex justify-between items-center h-full 2lg:max-w-[1200px] 2lg:mx-auto">
        <div className="my-[14px] flex items-center gap-10">
          <div className="flex items-center gap-4">
            {isLogin && (
              <Menu className="md:hidden" onClick={handleMenuClick} />
            )}
            <Link href="/">
              <Logo className="lg:w-[158px] lg:h-8" />
            </Link>
          </div>
          {isLogin && (
            <ul className="flex items-center gap-10">
              {teamOptions.length > 0 && (
                <div className="hidden md:block">
                  <TeamDropdown
                    options={teamOptions}
                    onChange={handleTeamChange}
                  />
                </div>
              )}
              <li className="hidden md:block text-lg text-text-primary font-medium">
                <Link href="/boards">자유게시판</Link>
              </li>
            </ul>
          )}
        </div>
        {isLogin && (
          <div className="w-[135px] flex justify-end">
            <Dropdown
              options={userOptions}
              onChange={(option) => {
                if (option.value === 'logout') {
                  localStorage.removeItem('accessToken');
                  setIsLoggedIn(false);
                }
              }}
              customButton={
                <div className="flex justify-end gap-2 items-center cursor-pointer">
                  <User className="md:w-4 md:h-4" />
                  <p className="hidden lg:block text-text-primary text-md font-medium">
                    {userData?.nickname}
                  </p>
                </div>
              }
              size="sm"
            />
          </div>
        )}

        <Modal id="sideMenu" className="fixed inset-0">
          <div className="fixed top-0 left-0 w-1/2 h-full bg-background-secondary p-4 z-50">
            <div className="flex justify-end">
              <Cancel onClick={() => closeModal('sideMenu')} />
            </div>
            <ul className="flex flex-col gap-6 mt-[35px]">
              {userGroups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => handleItemClick(String(group.id))}
                  className={`text-md font-medium cursor-pointer ${
                    selectedItem === String(group.id)
                      ? 'text-color-brand-primary'
                      : 'text-text-primary'
                  }`}
                >
                  <Link
                    href={`/group/${group.id}`}
                    className="focus-visible:outline-none focus:outline-none"
                  >
                    {group.name}
                  </Link>
                </li>
              ))}
              <li
                onClick={() => handleItemClick('boards')}
                className={`text-md font-medium cursor-pointer focus-visible:outline-none ${
                  selectedItem === 'boards'
                    ? 'text-color-brand-primary'
                    : 'text-text-primary'
                }`}
              >
                <Link
                  href="/boards"
                  className="focus-visible:outline-none focus:outline-none"
                >
                  자유게시판
                </Link>
              </li>
              <li
                onClick={() => handleItemClick('addteam')}
                className={`text-md font-medium cursor-pointer ${
                  selectedItem === 'addteam'
                    ? 'text-color-brand-primary'
                    : 'text-text-primary'
                }`}
              >
                <Link href="/addteam">팀 추가하기</Link>
              </li>
            </ul>
          </div>
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => closeModal('sideMenu')}
          ></div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
