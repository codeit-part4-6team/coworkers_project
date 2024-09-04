import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';
import Menu from '@/assets/menu.svg';

const Header = () => {
  return (
    <div className="bg-background-secondary flex justify-between items-center px-[24px] lg:px-[350px]">
      <div className="my-[14px] flex items-center gap-[40px]">
        <div className="flex items-center gap-[16px]">
          <Menu className="md:hidden" />
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <ul>
          <Link href="/boards">
            <li className="hidden md:block text-lg text-text-primary font-medium">
              자유게시판
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex items-center gap-[8px]">
        <User className="md:w-[16px] md:h-[16px]" />
        <p className="hidden lg:block text-text-primary text-md font-medium">
          안해나
        </p>
      </div>
    </div>
  );
};

export default Header;
