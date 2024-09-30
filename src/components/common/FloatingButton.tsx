import { FloatingButtonProp } from '@/types/FloatingButtonProp';
import CheckIcon from '@/assets/check_icon.svg';
import CancelIcon from '@/assets/cancel_icon.svg';
import AddIcon from '@/assets/plus_icon.svg'
import clsx from 'clsx';

export default function FloatingButton( {option, text, ...rest} : FloatingButtonProp) {

  const defaultClassName = `rounded-[40px] flex items-center justify-center gap-[1px]`;

  const optionClassName = {
    add: `bg-color-brand-primary text-inverse w-full h-full shadow-2xl 
          hover:bg-interaction-hover 
          active:bg-interaction-pressed 
          disabled:bg-interaction-inactive disabled:cursor-not-allowed`,
    success: `bg-color-brand-primary text-inverse w-full h-full shadow-2xl
              hover:bg-interaction-hover 
              active:bg-interaction-pressed
              disabled:bg-interaction-inactive disabled:cursor-not-allowed`,
    cancel: `bg-background-inverse outline outline-1 outline-color-brand-primary text-color-brand-primary
              w-full h-full shadow-2xl
              hover:outline-interaction-hover hover:text-interaction-hover
              active:outline-interaction-pressed active:text-interaction-pressed
              disabled:bg-text-inverse disabled:outline-interaction-inactive disabled:text-interaction-inactive disabled:cursor-not-allowed`
  };

  const floatingIcon = () => {
    switch (option) {
      case 'add' :
        return <AddIcon width={16} height={16} />;
      case 'success' :
        return <CheckIcon width={16} height={16} />;
      case 'cancel' :
        return <CancelIcon width={16} height={16} />;
    }
  }

  return (
    <div className='w-full h-full'>
      <button className={clsx(defaultClassName, optionClassName[option])}
      {...rest}
      >
        {floatingIcon()}
        {text}
      </button>
    </div>
  );
}
