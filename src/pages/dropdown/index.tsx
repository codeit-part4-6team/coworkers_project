import Dropdown, { DropdownOption } from '@/components/dropdown/Dropdown';

export default function Home() {
  const options = [
    { label: '옵션 1', value: 'option1' },
    { label: '옵션 2', value: 'option2' },
    { label: '옵션 3', value: 'option3' },
  ];

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };

  const profileOptions: DropdownOption[] = [
    { label: '마이 히스토리', value: 'my_history' },
    { label: '계정 설정', value: 'settings' },
    { label: '로그아웃', value: 'logout' },
  ];

  const handleProfileOptionChange = (option: DropdownOption) => {
    console.log('Selected option:', option);
  };

  return (
    <div className="flex gap-3 items-start">
      <div>
        <Dropdown options={options} onChange={handleChange} size="md" />
      </div>
      <div>
        <Dropdown
          options={options}
          onChange={handleChange}
          placeholder="반복 안함"
          size="sm"
        />
      </div>
      <div className="w-32">
        <Dropdown
          options={profileOptions}
          onChange={handleProfileOptionChange}
          customButton={<ProfileButton />}
          size="full"
        />
      </div>
    </div>
  );
}

const ProfileButton = () => (
  <div className="flex items-center space-x-2 cursor-pointer bg-gray-700 p-2">
    <div className="w-8 h-8 flex items-center justify-center text-white">
      <svg
        className="h-5 w-5"
        fill="white"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    </div>
    <span className="text-white text-sm">안해나</span>
  </div>
);
