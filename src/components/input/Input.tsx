import { InputProp } from '@/types/InputProp';
import clsx from 'clsx';
import VisbilityIcon from '@/assets/password_visbility_on.svg';
import UnVisbilityIcon from '@/assets/password_visbility_off.svg';
import { useState } from 'react';

export default function Input({
  labeltext,
  option,
  inputsize,
  errortext,
  placeholder,
  pattern = undefined,
  ...rest
}: InputProp) {
  const [inputType, setInputType] = useState<string>(option); 
  const [isVisible, setIsVisible] = useState<boolean>(false); 
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [value, setValue] = useState<string>('');

  const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
                            bg-background-secondary text-text-primary font-regular
                            border-solid border-[1px] outlien outline-none`;

  const optionClassName = ` border-border-primary-10
                hover:border-interaction-hover
                focus:border-interaction-focus
                disabled:border-interacion-inactive disabled:cursor-not-allowed`;

  const sizeClassName = clsx(
    inputsize === 'large' && 'text-lg',
    inputsize === 'small' && 'text-md',
  );

  const visibilityCheckEvent = () => {
    setIsVisible(!isVisible); // 가시성 상태를 토글
    setInputType(isVisible ? 'password' : 'text'); // 상태에 따라 input type을 변경
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue); 
    setIsEmpty(newValue.trim() === ''); // 빈 입력 체크
  };

  const handleBlur = () => {
    if (inputPattern) {
      if (isEmpty) {
        setIsInvalid(false); // 빈 입력일 경우 유효성 검사를 하지 않음
      } else {
        setIsInvalid(!inputPattern.test(value));
      }
    } else {
      setIsInvalid(false); // 패턴이 없을 경우 유효성 검사 필요 없음
    }
  };

  const iconClassName = `absolute right-4 top-1/2 transform -translate-y-1/2`;
  const inputPattern = pattern ? new RegExp(pattern) : undefined;

  //주석
  return (
    <div
      className={clsx(
        inputsize === 'large' && `w-[460px] h-[79px]`,
        inputsize === 'small' && `w-[343px] h-[44px]`,
      )}
    >
      <p className={`mb-4 text-text-primary text-lg font-mediumh`}>
        {labeltext}
      </p>
      <div className={`relative w-fit`}>
        <input
          type={inputType}
          placeholder={placeholder}
          pattern={inputPattern ? pattern : undefined}
          className={clsx(defaultClassName, optionClassName, sizeClassName, isEmpty && 'border-status-danger', isInvalid && 'border-status-danger')}
          onChange={handleChange}
          onBlur={handleBlur}
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
      {isEmpty && (
        <p className="text-red-500 mt-2">
          {errortext[0]} 
        </p>
      )}
      {isInvalid && !isEmpty && (
        <p className="text-red-500 mt-2">
          {errortext[1]} 
        </p>
      )}
    </div>
  );
}
