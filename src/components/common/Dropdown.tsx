import { useState, ReactNode, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Toggle from '@/assets/toggle.svg';

export interface DropdownOption {
  label: string;
  value: string;
  onClick?: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  onChange: (selectedOption: DropdownOption) => void;
  onClick?: (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => void;
  placeholder?: string;
  customButton?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
  direction?: 'down' | 'up';
}

const Dropdown = ({
  options,
  onChange,
  placeholder,
  customButton,
  size,
  className,
  direction = 'down',
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    null,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (
    option: DropdownOption,
    event: React.MouseEvent,
  ) => {
    event.stopPropagation();
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  const displayText = placeholder || selectedOption?.label || options[0]?.label;

  const buttonClasses = clsx(
    'inline-flex justify-between items-center font-regular focus:outline-none',
    !placeholder &&
      (isOpen ? 'bg-background-tertiary' : 'bg-background-secondary'),
    {
      'w-[94px] h-10 p-2 rounded-lg text-text-primary text-xs': size === 'sm',
      'w-[120px] h-11 p-[10px_14px] rounded-xl text-text-primary text-md':
        size === 'md',
      'w-[109px] h-11 p-[8px_10px] rounded-xl text-text-default text-md bg-[#18212F]':
        !size && placeholder,
    },
  );

  const optionClasses = clsx(
    'block w-full text-text-primary hover:bg-background-tertiary focus:outline-none',
    {
      'text-xs': !customButton && size === 'sm',
      'text-md': !customButton && size !== 'sm',
      'text-center text-lg': customButton && size === 'md',
      'text-center text-md': customButton && size === 'sm',
      'text-left': !customButton,
      'p-2': size === 'sm',
      'px-4 py-2': size !== 'sm',
    },
  );

  const dropdownClasses = clsx(
    'absolute right-0 rounded-lg shadow-sm bg-background-secondary overflow-hidden',
    'border border-border-primary-10 z-50',
    {
      'w-[135px]': customButton && size === 'md',
      'w-[120px]': customButton && size === 'sm',
      'w-full': !customButton,
      'mt-2': direction === 'down',
      'mb-2 bottom-full': direction === 'up',
    },
  );

  return (
    <div className={clsx('relative inline-block text-left', className)}>
      {customButton ? (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="text-center"
        >
          {customButton}
        </div>
      ) : (
        <button
          type="button"
          className={buttonClasses}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          <span>{displayText}</span>
          <Toggle className="w-6 h-6 text-icon-primary" />
        </button>
      )}

      {isOpen && (
        <div className={dropdownClasses}>
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className={optionClasses}
                onClick={(e) => handleOptionClick(option, e)}
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
