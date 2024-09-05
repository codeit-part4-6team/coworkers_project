import { ButtonProps } from '@/type/buttonprop';

export default function Button({ option, size, text, disabled, onClick }: ButtonProps) {
  const buttonOption = {
    solid: `rounded-[12px] bg-color-brand-primary text-inverse 
            hover:bg-interaction-hover 
            active:bg-interaction-pressed`,
    outlined: `rounded-[12px] bg-background-inverse 
               outline outline-1 outline-color-brand-primary text-color-brand-primary
               hover:text-interaction-hover hover:outline-interaction-hover 
               active:text-interaction-pressed active:outline-interaction-pressed`,
    outlinedSecondary: `rounded-[12px] bg-background-inverse 
                        outline outline-1 outline-text-secondary text-text-default
                        `,
    danger: `rounded-[12px] bg-status-danger text-text-inverse`,
  };

  const buttonSize = {
    large: 'w-full h-12 text-lg font-semibold',
    xsmall: 'w-[74px] h-8 px-[12.5px] text-md font-semibold',
  };

  const disabledClass = {
    solid: 'rounded-[12px] bg-interaction-inactive cursor-not-allowed',
    outlined: 'rounded-[12px] bg-background-inverse outline outline-1 outline-interaction-inactive text-interaction-inactive cursor-not-allowed',
    outlinedSecondary: 'rounded-[12px]',
    danger: 'rounded-[12px] ',
  };

  const className = `${buttonSize[size]} ${disabled? disabledClass[option] : buttonOption[option]}`;
  return (
    <div>
      <button className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
