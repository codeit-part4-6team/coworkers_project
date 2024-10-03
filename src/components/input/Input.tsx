import { InputProps } from '@/types/InputProp';
import clsx from 'clsx';
import VisbilityIcon from '@/assets/password_visbility_on.svg';
import UnVisbilityIcon from '@/assets/password_visbility_off.svg';
import { useState } from 'react';

export default function Input({
  labeltext,
  option,
  placeholder,
  inValid,
  errorText,
  onBlur = undefined,
  ...rest
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(option);

  const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
                            bg-background-secondary text-text-primary font-regular
                            border-solid border-[1px] outline-none
                            w-full h-full`;

  const optionClassName = clsx('border-border-primary-10',
                rest.disabled && 'disabled:cursor-not-allowed disabled:bg-background-tertiary',
                !rest.disabled && 'hover:border-interaction-hover focus:border-interaction-focus'
  )

  const isInvalidClassName = `border-status-danger`;

  const sizeClassName = `text-md md:text-lg`;

  const iconClassName = `absolute right-4 top-1/2 transform -translate-y-1/2`;

  const visibilityCheckEvent = () => {
    setIsVisible(!isVisible);
    setInputType(isVisible ? 'password' : 'text');
  };

  return (
    <div className={`w-full h-full`}>
      {labeltext ? (
        <p className={`mb-4 text-text-primary text-lg font-medium`}>
          {labeltext}
        </p>
      ) : undefined}
      <div className={`relative`}>
        <input
          ref={rest.ref}
          type={inputType}
          placeholder={placeholder}
          className={clsx(
            defaultClassName,
            optionClassName,
            sizeClassName,
            inValid && isInvalidClassName,
          )}
          defaultValue={rest.defaultValue}
          onBlur={onBlur}
          onClick={rest.onClick}
          disabled={rest.disabled}
        />
        {option === 'password' &&
          (isVisible ? (
            <VisbilityIcon
              className={iconClassName}
              onClick={visibilityCheckEvent}
            />
          ) : (
            <UnVisbilityIcon
              className={iconClassName}
              onClick={visibilityCheckEvent}
            />
          ))}
      </div>
      <div className="text-status-danger">
        {inValid ? errorText : undefined}
      </div>
    </div>
  );
}
