import Link from 'next/link';
import Logo from '@/assets/logo.svg';
import User from '@/assets/user.svg';

const Header = () => {
  return (
    <div className="flex">
      <div>
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <ul>
        <Link href="/boards">
          <li>자유게시판</li>
        </Link>
      </ul>
      <div>
        <User />
      </div>
    </div>
  );
};

export default Header;
