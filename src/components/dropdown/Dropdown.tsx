import { useState, ReactNode } from 'react';
import clsx from 'clsx';
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
  className?: string;
}

const Dropdown = ({
  options,
  onChange,
  placeholder,
  customButton,
  size = 'md',
  className,
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

  const buttonClasses = clsx(
    'inline-flex justify-between items-center font-regular text-text-primary focus:outline-none',
    isOpen && 'bg-background-tertiary',
    !isOpen && 'bg-background-secondary',
    size === 'sm' && 'w-[94px] h-10 p-2 rounded-lg text-xs',
    size === 'md' && 'w-[120px] h-11 p-[10px_14px] rounded-xl text-md',
    size === 'full' && 'w-full h-11 p-[10px_14px] rounded-xl text-md',
  );

  const optionClasses = clsx(
    'block w-full text-sm text-text-primary hover:bg-gray-100 focus:outline-none',
    customButton ? 'px-4 py-3 text-center' : 'px-4 py-2 text-left',
    size === 'sm' ? 'text-xs' : 'text-md',
  );

  return (
    <div
      className={clsx(
        'relative inline-block text-left',
        size === 'full' && 'w-full',
        className,
      )}
    >
      {customButton ? (
        <div onClick={() => setIsOpen(!isOpen)}>{customButton}</div>
      ) : (
        <button
          type="button"
          className={buttonClasses}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{displayText}</span>
          <Toggle className="w-6 h-6 text-icon-primary" />
        </button>
      )}

      {isOpen && (
        <div
          className={clsx(
            'absolute right-0 mt-2 rounded-lg shadow-sm bg-background-secondary overflow-hidden',
            customButton ? 'w-[120px]' : 'w-full',
          )}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className={optionClasses}
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
