import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';
import { useQuery } from '@tanstack/react-query';
import basicApi from '@/lib/basicAxios';
import { useState, useEffect } from 'react';
import Dropdown, { DropdownOption } from '@/components/dropdown/Dropdown';
import { Group } from '@/type/usergroup';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import Cancel from '@/assets/x_icon.svg';

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
  const [selectedTeam, setSelectedTeam] = useState<DropdownOption | null>(null);

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

      <Modal id="sideMenu" className="fixed inset-0">
        <div className="fixed top-0 left-0 w-1/2 h-full bg-background-secondary p-[16px] z-50">
          <div className="flex justify-end">
            <Cancel onClick={() => closeModal('sideMenu')} />
          </div>
          <ul className="flex flex-col gap-[24px] mt-[35px]">
            {userGroups.map((group) => (
              <li
                key={group.id}
                className="text-text-primary text-md font-medium"
              >
                {group.name}
              </li>
            ))}
            <Link href="/boards">
              <li className="text-text-primary text-md font-medium">
                자유게시판
              </li>
            </Link>
          </ul>
        </div>
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={() => closeModal('sideMenu')}
        ></div>
      </Modal>
    </div>
  );
};

export default Header;
