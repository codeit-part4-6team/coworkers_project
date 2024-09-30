import Search from '@/assets/search.svg';
import { useState } from 'react';

interface SearchInputProps {
  onSearchChange: (keyword: string) => void;
}

const SearchInput = ({ onSearchChange }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="relative w-full border rounded-[12px] border-border-primary-10">
      <div className="absolute inset-y-0 left-0 pl-4 py-3 flex items-center">
        <Search className="w-6 h-6 text-icon-primary" />
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="w-full pl-12 py-4 rounded-[12px] bg-background-secondary placeholder-text-default text-md font-regular focus:outline-none"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
