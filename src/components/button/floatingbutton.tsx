import { FloatingButtonProp } from '@/type/floatingbuttonprop';
import CheckIcon from '@/assets/check_icon.svg';
import CancelIcon from '@/assets/cancel_icon.svg';
import AddIcon from '@/assets/plus_icon.svg'

export default function FloatingButton( {option, text, disabled, onClick} : FloatingButtonProp) {
  const buttonOption = {
    add: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-color-brand-primary text-inverse w-[125px] h-[48px] shadow-2xl
          hover:bg-interaction-hover 
          active:bg-interaction-pressed`,
    success: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-color-brand-primary text-inverse w-[111px] h-[40px] shadow-2xl
              hover:bg-interaction-hover 
              active:bg-interaction-pressed`,
    cancel: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-background-inverse outline outline-1 outline-color-brand-primary text-color-brand-primary
              w-[138px] h-[40px] shadow-2xl
              hover:outline-interaction-hover hover:text-interaction-hover
              active:outline-interaction-pressed active:text-interaction-pressed `
  };

  const disabledClass = {
    add: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-interaction-inactive text-inverse w-[125px] h-[48px] shadow-2xl`,
    success: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-interaction-inactive text-inverse w-[111px] h-[40px] shadow-2xl`,
    cancel: `rounded-[40px] flex items-center justify-center gap-[1.5px] bg-text-inverse outline outline-1 outline-interaction-inactive text-interaction-inactive w-[138px] h-[40px] shadow-2xl`
  };

  const floatingIcon = () => {
    switch (option) {
      case 'add' :
        return <AddIcon width={16} height={16} />;
      case 'success' :
        return <CheckIcon width={16} height={16} />;
      case 'cancel' :
        return <CancelIcon width={16} height={16} />;
        // return <Image src={CancelIcon} alt='취소아이콘' width={16} height={16} />;
    }
  }

  const className = `${disabled ? disabledClass[option] : buttonOption[option]}`;

  return (
    <div>
      <button className={className} onClick={onClick}>
        {floatingIcon()}
        {text}
      </button>
    </div>
  );
}
