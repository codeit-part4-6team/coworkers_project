import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';
import { useQuery } from '@tanstack/react-query';
import basicApi from '@/lib/basicAxios';
import { useState, useEffect } from 'react';

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('토큰이 없습니다');
    }

    const response = await basicApi.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('유저 데이터 불러오기 실패', error);
    return null;
  }
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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

  const isLogin = !!userData || isLoggedIn;

  return (
    <div className="bg-background-secondary flex justify-between items-center px-[24px] lg:px-[350px]">
      <div className="my-[14px] flex items-center gap-[40px]">
        <div className="flex items-center gap-[16px]">
          {isLogin && <Menu className="md:hidden" />}
          <Link href="/">
            <Logo />
          </Link>
        </div>
        {isLogin && (
          <ul>
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
    </div>
  );
};

export default Header;
