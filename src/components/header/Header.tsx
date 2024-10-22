import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';
import Cancel from '@/assets/x_icon.svg';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/authStore';
import TeamDropdown from './TeamDropdown';

const Header = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();
  const { user, checkAuth, signOut } = useAuthStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  const handleLogout = () => {
    signOut();
    router.push('/signin');
  };

  const handleMenuClick = () => {
    openModal('sideMenu');
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const userOptions: DropdownOption[] = [
    { label: '마이 히스토리', value: 'myHistory' },
    { label: '계정 설정', value: 'accountSettings' },
    { label: '팀 참여', value: 'joinTeam' },
    { label: '로그아웃', value: 'logout' },
  ];

  const handleChange = (selectedOption: DropdownOption) => {
    if (selectedOption.value === 'myHistory') {
      router.push(`/myhistory`);
    } else if (selectedOption.value === 'logout') {
      handleLogout();
    } else if (selectedOption.value === 'accountSettings') {
      router.push(`/mypage`);
    } else {
      router.push(`/jointeam`);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  return (
    <div className="bg-background-secondary h-[60px] px-6 border-b border-border-primary-10">
      <div className="flex justify-between items-center h-full 2lg:max-w-[1200px] 2lg:mx-auto">
        <div className="my-[14px] flex items-center gap-10">
          <div className="flex items-center gap-4">
            {user && <Menu className="md:hidden" onClick={handleMenuClick} />}
            <Link href="/">
              <Logo className="lg:w-[158px] lg:h-8" />
            </Link>
          </div>
          {user && (
            <ul className="flex items-center gap-10">
              <TeamDropdown />
              <li className="hidden md:block text-lg text-text-primary font-medium">
                <Link href="/boards">자유게시판</Link>
              </li>
            </ul>
          )}
        </div>
        {user && (
          <div className="w-[135px] flex justify-end">
            <Dropdown
              options={userOptions}
              onChange={handleChange}
              customButton={
                <div className="flex justify-end gap-2 items-center cursor-pointer">
                  <User className="md:w-4 md:h-4" />
                  <p className="hidden lg:block text-text-primary text-md font-medium">
                    {user.nickname}
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
