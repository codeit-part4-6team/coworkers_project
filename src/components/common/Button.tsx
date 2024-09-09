import { ButtonProps } from '@/types/ButtonProp';
import clsx from 'clsx';

<<<<<<< HEAD
export default function Button({ option, size, text, ...rest }: ButtonProps) {
=======
export default function Button({
  option,
  size,
  text,
  blank,
  ...rest
}: ButtonProps) {

>>>>>>> 4c4c40d91b0081542d7cbd445d0ae33899e3a7c1
  const buttonDefaultStyle = `rounded-[12px]`;

  const optionClassName = clsx(
    option === 'solid' && `bg-color-brand-primary text-text-inverse 
            hover:bg-interaction-hover 
            active:bg-interaction-pressed
            disabled:bg-interaction-inactive disabled:cursor-not-allowed`,
    option === 'outlined' && `${blank ? 'bg-transparent' : 'bg-background-inverse'} outline outline-1 outline-color-brand-primary text-color-brand-primary
               hover:text-interaction-hover hover:outline-interaction-hover 
               active:text-interaction-pressed active:outline-interaction-pressed
               disabled:bg-background-inverse disabled:outline-interaction-inactive disabled:text-interaction-inactive disabled:cursor-not-allowed`,
    option === 'outlinedSecondary' && `bg-background-inverse outline-1 outline-text-secondary text-text-default`,
    option === 'danger' && `bg-status-danger text-text-inverse`
  )

  const sizeClassName = {
    large: 'w-full h-12 text-lg font-semibold',
    xsmall: 'w-[74px] h-8 px-[12px] text-md font-semibold',
  };

  return (
    <button
<<<<<<< HEAD
      className={clsx(
        buttonDefaultStyle,
        sizeClassName[size],
        optionClassName[option],
      )}
=======
      className={clsx(buttonDefaultStyle, sizeClassName[size], optionClassName)}
>>>>>>> 4c4c40d91b0081542d7cbd445d0ae33899e3a7c1
      {...rest}
    >
      {text}
    </button>
  );
}
