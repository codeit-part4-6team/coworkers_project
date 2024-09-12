import { InputProp } from '@/types/InputProp';
import clsx from 'clsx';
import VisbilityIcon from '@/assets/password_visbility_on.svg';
import UnVisbilityIcon from '@/assets/password_visbility_off.svg';
import { useState } from 'react';

const validPatterns = {
  email: /^[\w\.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
};

export default function Input({
  labeltext,
  option,
  inputSize,
  errorText,
  placeholder,
  pattern,
  passwordCheck,
  ...rest
}: InputProp & { ref?: React.Ref<HTMLInputElement> }) {
  const [inputType, setInputType] = useState<string>(option);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const defaultClassName = `rounded-[12px] p-4 placeholder-text-default 
                            bg-background-secondary text-text-primary font-regular
                            border-solid border-[1px] outline-none`;

  const optionClassName = ` border-border-primary-10
                hover:border-interaction-hover
                focus:border-interaction-focus
                disabled:border-interacion-inactive disabled:cursor-not-allowed`;

  const sizeClassName = clsx(
    inputSize === 'large' && 'text-lg',
    inputSize === 'small' && 'text-md',
  );

  const inputErrorClassName = `border-status-danger`;

  const visibilityCheckEvent = () => {
    setIsVisible(!isVisible);
    setInputType(isVisible ? 'password' : 'text');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsEmpty(event.target.value.trim() === '');
    setIsTouched(true);
  };

  const validatePassword = (password: string) => {
    const isTooShort = password.length < 8;
    const hasMixedCharacters = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/.test(
      password,
    );

    return {
      isTooShort,
      ishasMixedCharacters: !hasMixedCharacters,
    };
  };

  const handleBlur = () => {
    if (isTouched) {
      if (option === 'password') {
        if (pattern === 'password') {
          const { isTooShort, ishasMixedCharacters } = validatePassword(value);

          // 우선순위에 따라 에러를 체크
          if (isEmpty || isTooShort || ishasMixedCharacters) {
            setIsInvalid(true);
          } else {
            setIsInvalid(false);
          }
        } else if (pattern === 'passwordCheck') {
          const samePasswrod = !(value === passwordCheck);
          setIsInvalid(samePasswrod);
        }
      } else if (option === 'text') {
        if (pattern === 'email') {
          const regex = validPatterns[pattern];
          const isPatternInvalid = regex ? !regex.test(value) : false;
          setIsInvalid(isPatternInvalid);
        } else if (pattern === 'nickName') {
          const isTooLong = value.length > 20;
          setIsInvalid(isTooLong);
        }
      }
    }
  };

  const iconClassName = `absolute right-4 top-1/2 transform -translate-y-1/2`;

  const inputErrorMessage = () => {
    {
      if (errorText != undefined) {
        if (isTouched && isEmpty) {
          return <p>{errorText[0]}</p>;
        }

        if (isTouched && isInvalid) {
          if (option === 'password' && pattern === 'passwordCheck') {
            return <p>{errorText[1]}</p>;
          } 
          else if (pattern === 'password') {
            const { isTooShort, ishasMixedCharacters } =
              validatePassword(value);

            if (isTooShort) return <p>{errorText[1]}</p>;
            if (ishasMixedCharacters) return <p>{errorText[2]}</p>;
          } 
          else if (option === 'text' && pattern === 'email') {
            return <p>{errorText[1]}</p>;
          } 
          else if (option === 'text' && pattern === 'nickName') {
            return <p>{errorText[1]}</p>;
          }
        }
        return null;
      }
    }
  };

  return (
    <div
      className={clsx(
        inputSize === 'large' && `w-[460px] h-[79px]`,
        inputSize === 'small' && `w-[343px] h-[44px]`,
      )}
    >
      <p className={`mb-4 text-text-primary text-lg font-medium`}>
        {labeltext}
      </p>
      <div className={`relative w-fit`}>
        <input
          ref={rest.ref}
          type={inputType}
          placeholder={placeholder}
          pattern={pattern}
          className={clsx(
            defaultClassName,
            optionClassName,
            sizeClassName,
            isInvalid && inputErrorClassName,
          )}
          onChange={handleChange}
          onBlur={pattern ? handleBlur : undefined}
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
      <div className="text-status-danger">{inputErrorMessage()}</div>
    </div>
  );
}
