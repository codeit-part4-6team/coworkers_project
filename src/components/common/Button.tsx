import { ButtonProps } from '@/types/ButtonProp';
import clsx from 'clsx';

export default function Button({
  option,
  size,
  text,
  ...rest
}: ButtonProps) {

  const buttonDefaultStyle = `rounded-[12px]`;

  const optionClassName = {
    solid: `bg-color-brand-primary text-text-inverse 
            hover:bg-interaction-hover 
            active:bg-interaction-pressed
            disabled:bg-interaction-inactive disabled:cursor-not-allowed`,
    outlined: `bg-background-inverse outline outline-1 outline-color-brand-primary text-color-brand-primary
               hover:text-interaction-hover hover:outline-interaction-hover 
               active:text-interaction-pressed active:outline-interaction-pressed
               disabled:bg-background-inverse disabled:outline-interaction-inactive disabled:text-interaction-inactive disabled:cursor-not-allowed`,
    outlinedSecondary: `bg-background-inverse outline-1 outline-text-secondary text-text-default
                        `,
    danger: `bg-status-danger text-text-inverse`,
  };

  const sizeClassName = {
    large: 'w-full h-12 text-lg font-semibold',
    xsmall: 'w-[74px] h-8 px-[12px] text-md font-semibold',
  };

  return (
    <button
      className={clsx(buttonDefaultStyle, sizeClassName[size], optionClassName[option])}
      {...rest}
    >
      {text}
    </button>
  );
}
