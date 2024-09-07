import { ButtonProps } from '@/types/buttonprop';
import clsx from 'clsx';

export default function Button({
  option,
  size,
  text,
  disabled,
  onClick,
}: ButtonProps) {

  const buttonDefaultStyle = `rounded-[12px]`;

  const buttonOption = {
    solid: `bg-color-brand-primary text-inverse 
            hover:bg-interaction-hover 
            active:bg-interaction-pressed`,
    outlined: `bg-background-inverse 
               outline outline-1 outline-color-brand-primary text-color-brand-primary
               hover:text-interaction-hover hover:outline-interaction-hover 
               active:text-interaction-pressed active:outline-interaction-pressed`,
    outlinedSecondary: `bg-background-inverse 
                        outline outline-1 outline-text-secondary text-text-default
                        `,
    danger: `bg-status-danger text-text-inverse`,
  };

  const buttonSize = {
    large: 'w-full h-12 text-lg font-semibold',
    xsmall: 'w-[74px] h-8 px-[12px] text-md font-semibold',
  };

  const disabledClass = {
    solid: 'bg-interaction-inactive cursor-not-allowed',
    outlined:
      'bg-background-inverse outline outline-1 outline-interaction-inactive text-interaction-inactive cursor-not-allowed',
    outlinedSecondary: 'rounded-[12px]',
    danger: '',
  };

  const className = `${buttonSize[size]} ${disabled ? disabledClass[option] : buttonOption[option]}`;
  return (
    <button
      className={clsx(buttonDefaultStyle, buttonSize[size], buttonOption[option])}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
