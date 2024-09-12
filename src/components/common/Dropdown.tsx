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
  size?: 'sm' | 'md';
  className?: string;
}

const Dropdown = ({
  options,
  onChange,
  placeholder,
  customButton,
  size,
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
    'inline-flex justify-between items-center font-regular focus:outline-none',
    isOpen ? 'bg-background-tertiary' : 'bg-background-secondary',
    {
      'w-[94px] h-10 p-2 rounded-lg text-text-primary text-xs': size === 'sm',
      'w-[120px] h-11 p-[10px_14px] rounded-xl text-text-primary text-md':
        size === 'md',
      'w-[109px] h-11 p-[8px_10px] rounded-xl text-text-default text-md bg-[#18212F]':
        !size && placeholder,
    },
  );

  const optionClasses = clsx(
    'block w-full px-4 py-2 text-text-primary hover:bg-background-tertiary focus:outline-none',
    {
      'text-xs': !customButton && size === 'sm',
      'text-md': !customButton && size !== 'sm',
      'text-center text-lg': customButton && size === 'md',
      'text-center text-md': customButton && size === 'sm',
      'text-left': !customButton,
    },
  );

  return (
    <div className={clsx('relative inline-block text-left', className)}>
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
          <Toggle className="w-6 h-6 text-icon-primary" />
        </button>
      )}

      {isOpen && (
        <div
          className={clsx(
            'absolute right-0 mt-2 rounded-lg shadow-sm bg-background-secondary overflow-hidden',
            'border border-border-primary-50',
            {
              'w-[135px]': customButton && size === 'md',
              'w-[120px]': customButton && size === 'sm',
              'w-full': !customButton,
            },
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
