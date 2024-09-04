import { ButtonProps } from '@/type/buttonprop';

export default function Button({ option, size, text, disabled, onClick }: ButtonProps) {
  const buttonOption = {
    solid: `rounded-xl bg-color-brand-primary text-inverse 
            hover:bg-interaction-hover 
            active:bg-interaction-pressed`,
    outlined: `rounded-xl bg-background-inverse outline outline-1 outline-color-brand-primary text-color-brand-primary 
               hover:text-interaction-hover hover:outline-interaction-hover 
               active:text-interaction-pressed active:outline-interaction-pressed`,
    outlinedSecondary: `rounded-xl bg-background-inverse outline outline-3 outline-text-secondary text-default 
                        `,
    danger: 'rounded-xl',
  };

  const buttonSize = {
    large: 'w-full h-12',
    xsmall: 'w-[74px] h-8 px-[12.5px]',
  };

  const disabledClass = {
    solid: 'rounded-xl bg-interaction-inactive cursor-not-allowed',
    outlined: 'rounded-xl bg-background-inverse outline outline-1 outline-interaction-inactive text-interaction-inactive cursor-not-allowed',
    outlinedSecondary: 'rounded-xl bg-',
    danger: 'rounded-xl ',
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
