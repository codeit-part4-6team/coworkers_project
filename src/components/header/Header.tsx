import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.svg';
import user from '@/assets/user.svg';

const Header = () => {
  return (
    <div className="flex">
      <div>
        <Link href="/">
          <Image alt="로고" src={logo} width={158} height={32} />
        </Link>
      </div>
      <ul>
        <Link href="/boards">
          <li>자유게시판</li>
        </Link>
      </ul>
      <div>
        <Image src={user} alt="프로필아이콘" />
      </div>
    </div>
  );
};

export default Header;
