import { useState, ReactNode } from 'react';
import Toggle from '@/assets/toggle.svg';

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (selectedOption: DropdownOption) => void;
  placeholder?: string;
  customButton?: ReactNode;
  size?: 'sm' | 'md' | 'full';
}

const Dropdown = ({
  options,
  onChange,
  placeholder,
  customButton,
  size = 'md',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null,
  );

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const displayText = selectedOption?.label || placeholder || options[0]?.label;

  const buttonClasses = [
    'inline-flex justify-between items-center',
    'text-sm font-medium text-white focus:outline-none',
    isOpen ? 'bg-[#334155]' : 'bg-[#1E293B]',
    size === 'sm'
      ? 'w-[94px] h-[40px] p-2 rounded-lg'
      : size === 'md'
        ? 'w-[120px] h-[44px] p-[10px_14px] rounded-xl'
        : 'w-full h-[44px] p-[10px_14px] rounded-xl',
  ].join(' ');

  const optionClasses = [
    'block w-full px-4 py-2 text-sm text-white hover:bg-[#334155] focus:outline-none text-left',
    size === 'sm' ? 'rounded-lg' : 'rounded-xl',
    customButton ? 'text-center' : 'text-left',
  ].join(' ');

  return (
    <div
      className={`relative inline-block text-left ${size === 'full' ? 'w-full' : ''}`}
    >
      {customButton ? (
        <div onClick={() => setIsOpen(!isOpen)} className="text-center">
          {customButton}
        </div>
      ) : (
        <button
          type="button"
          className={buttonClasses}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{displayText}</span>
          <Toggle className="size-6" />
        </button>
      )}

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-full shadow-lg bg-[#1E293B] ${
            size === 'sm' ? 'rounded-lg' : 'rounded-xl'
          }`}
        >
          <div className="py-1" role="listbox">
            {options.map((option) => (
              <button
                key={option.value}
                className={optionClasses}
                role="option"
                aria-selected={option.value === selectedOption?.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
