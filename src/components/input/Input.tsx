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
  ...rest
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(option);

  const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
                            bg-background-secondary text-text-primary font-regular
                            border-solid border-[1px] outline-none
                            w-full h-full`;

  const optionClassName = `
  border-border-primary-10
  ${rest.disabled ? 'bg-background-tertiary border-primary-10 cursor-not-allowed' : 
    'hover:border-interaction-hover focus:border-interaction-focus'}
  disabled:bg-background-tertiary disabled:cursor-not-allowed
`;

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
          onChange={rest.onChange}
          onBlur={rest.onBlur}
          defaultValue={rest.defaultValue}
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
