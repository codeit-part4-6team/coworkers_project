import Cancel from '@/assets/x_icon.svg';
import Link from 'next/link';
import { Group } from '@/type/usergroup';

interface SideMenuProps {
  onClose: () => void;
  groups: Group[];
}

const SideMenu = ({ onClose, groups }: SideMenuProps) => {
  return (
    <div className="fixed top-0 left-0 w-1/2 h-full bg-background-secondary p-[16px] border-border-primary-10 z-2">
      <div className="flex justify-end">
        <Cancel onClick={onClose} />
      </div>
      <ul className="flex flex-col gap-[24px] mt-[35px]">
        {groups.map((group) => (
          <li key={group.id} className="text-text-primary text-md font-medium">
            {group.name}
          </li>
        ))}
        <Link href="/boards">
          <li className="text-text-primary text-md font-medium">자유게시판</li>
        </Link>
      </ul>
    </div>
  );
};

export default SideMenu;
