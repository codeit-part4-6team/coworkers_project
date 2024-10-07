import Input from '@/components/input/Input';
import Button from '@/components/common/Button';
import { useEffect, useState } from 'react';
import SocialLogin from '@/components/sociallogin';
import { signUp } from '@/lib/auth';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const nickNameErrorText = [
  '이름은 필수 입력입니다.',
  '이름은 최대 20자까지 가능합니다.',
];
const emailErrorText = [
  '이메일은 필수 입력입니다.',
  '이메일 형식으로 작성해 주세요.',
];
const passwordErrorText = [
  '비밀번호는 필수 입력입니다.',
  '비밀번호는 최소 8자 이상입니다.',
  '비밀번호는 숫자, 영문, 특수 문자로만 가능합니다.',
];
const passwordCheckErrorText = [
  '비밀번호 확인을 입력해 주세요.',
  '비밀번호가 일치하지 않습니다.',
];

export default function SignUp() {
  const router = useRouter();
  const [values, setValues] = useState({
    nickName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nickNameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const validateNickName = (value: string) => {
    if (!value) return nickNameErrorText[0];
    if (value.length > 20) return nickNameErrorText[1];
    return '';
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return emailErrorText[0];
    if (!emailRegex.test(value)) return emailErrorText[1];
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return passwordErrorText[0];
    if (value.length < 8) return passwordErrorText[1];
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(value)) return passwordErrorText[2];
    return '';
  };

  const validatePasswordCheck = (confirmPassword: string, password?: string) => {
    if (!confirmPassword) return passwordCheckErrorText[0];
    if (password !== confirmPassword) return passwordCheckErrorText[1];
    return '';
  };

  const handleBlur = (field: string, value: string) => {
    let error = '';

    if (field === 'nickName') {
      error = validateNickName(value);
    } else if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
      error = validatePassword(value);
    } else if (field === 'confirmPassword') {
      if (!values.confirmPassword) {
        error = passwordCheckErrorText[0];
      } else {
        error = validatePasswordCheck(values.password, value);
      }
    }

    setErrors((prev) => ({
      ...prev,
      [`${field}Error`]: error,
    }));
  };

  const isFormValid = () => {
    return (
      !errors.nickNameError &&
      !errors.emailError &&
      !errors.passwordError &&
      !errors.confirmPasswordError &&
      values.nickName &&
      values.email &&
      values.password &&
      values.confirmPassword
    );
  };

  const handleSignUp = async (event: React.FormEvent) => {
      event.preventDefault(); // 폼 제출 기본 동작 방지
      console.log("회원가입 시작");
      if(errors.nickNameError &&
        errors.emailError &&
        errors.passwordError &&
        errors.confirmPasswordError &&
        values.nickName &&
        values.email &&
        values.password &&
        values.confirmPassword) {
        return;
      }
      const response = await signUp(
        values.email,
        values.nickName,
        values.password,
        values.confirmPassword,
      );
      console.log(response);
      if(response.status >= 200 && response.status < 300) {
        Cookies.set('accessToken', response.data.accessToken, {path: '/'});
        Cookies.set('refreshToken', response.data.refreshToken, {path: '/'});
        Cookies.set('userData', JSON.stringify(response.data.user), {path: '/'});
        router.push('/');
      }
      else {
        alert(response.data.message);
      }
  };

  useEffect(() => {
    if(Cookies.get('accessToken')) {
      router.push('/');
    }
  }, [router]);

  return (
    <div
      className={`mt-6 mx-auto w-[343px] md:w-[460px] md:mt-[100px]`}
    >
      <p
        className={`text-center text-2xl font-medium text-text-primary mb-6 md:mb-20 lg:text-4xl`}
      >
        회원가입
      </p>
      <form onSubmit={handleSignUp}>
      <div className={`flex flex-col gap-6 mb-10`}>
        <Input
          labeltext="이름"
          option="text"
          inValid={!!errors.nickNameError} // !!해당 값이 있으면 true 없으면 false
          errorText={errors.nickNameError}
          placeholder="이름을 입력해주세요."
          onBlur={(e) => handleBlur('nickName', e.target.value)}
          onChange={(e) => setValues({ ...values, nickName: e.target.value })}
        />
        <Input
          labeltext="이메일"
          option="text"
          inValid={!!errors.emailError}
          errorText={errors.emailError}
          placeholder="이메일을 입력해주세요."
          onBlur={(e) => handleBlur('email', e.target.value)}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <Input
          labeltext="비밀번호"
          option="password"
          inValid={!!errors.passwordError}
          errorText={errors.passwordError}
          placeholder="비밀번호를 입력해주세요."
          onBlur={(e) => handleBlur('password', e.target.value)}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <Input
          labeltext="비밀번호 확인"
          option="password"
          inValid={!!errors.confirmPasswordError}
          errorText={errors.confirmPasswordError}
          placeholder="비밀번호를 다시 입력해주세요."
          onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
          onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
        />
      </div>
      <div className={`mb-6 md:mb-12`}>
        <Button
          text="회원가입"
          option="solid"
          size="large"
          disabled={!isFormValid()}
          onClick={handleSignUp}
        />
      </div>
      </form>
      <SocialLogin />
    </div>
  );
}
