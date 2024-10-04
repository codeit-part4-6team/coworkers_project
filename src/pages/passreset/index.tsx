import Input from '@/components/input/Input';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import { resetPassword } from '@/lib/auth';
import { useRouter } from 'next/router';

const passwordErrorText = [
  '비밀번호는 필수 입력입니다.',
  '비밀번호는 최소 8자 이상입니다.',
  '비밀번호는 숫자, 영문, 특수 문자로만 가능합니다.',
];

const passwordCheckErrorText = [
  '비밀번호 확인을 입력해 주세요.',
  '비밀번호가 일치하지 않습니다.',
];

export default function PassReset() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordError: '',
    passwordCheckError: '',
  });

  useEffect(() => {
    // token이 없을 경우, 오류 처리
    if (router.isReady) {
      const { token } = router.query;
      if (!token) {
        alert('유효하지 않은 접근입니다. 토큰이 없습니다.');
        router.push('/error'); // 오류 페이지로 이동하거나
        return;
      }
      setToken(token as string);
    }
  }, [router.isReady, router.query]);

  const handleBlur = (field: string, value: string) => {
    let error = '';
    if (field === 'password') {
      error = validatePassword(value);
    } else if (field === 'confirmPassword') {
      error = validatePasswordCheck(values.password, value);
    }

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [`${field}Error`]: error,
    }));
  };

  const validatePassword = (value: string) => {
    if (!value) return passwordErrorText[0];
    if (value.length < 8) return passwordErrorText[1];
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(value)) return passwordErrorText[2];
    return '';
  };

  const validatePasswordCheck = (password: string, confirmPassword: string) => {
    if (!confirmPassword) return passwordCheckErrorText[0];
    if (password !== confirmPassword) return passwordCheckErrorText[1];
    return '';
  };

  const resetPasswordEvent = async () => {
    if (!token) {
      alert('토큰이 유효하지 않습니다.');
      return;
    }
    try {
      const response = await resetPassword(
        values.password,
        values.confirmPassword,
        token
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="mt-7 mx-4 md:mx-auto md:w-[460px]">
      <p
        className={`text-text-primary text-2xl font-medium mb-7 text-center md:mb-20 md:mt-[100px] lg:mt-[140px] lg:text-4xl`}
      >
        비밀번호 재설정
      </p>
      <div className={`flex flex-col items-center justify-center gap-7 mb-10`}>
        <Input
          labeltext="새 비밀번호"
          option="password"
          inValid={!!errors.passwordError}
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)를 입력해주세요."
          errorText={errors.passwordError}
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          onBlur={(e) => handleBlur('password', e.target.value)}
        />
        <Input
          labeltext="비밀번호 확인"
          option="password"
          inValid={!!errors.passwordCheckError}
          placeholder="비밀번호 (영문, 숫자, 특수문자 포함 8자 이상)를 입력해주세요."
          errorText={errors.passwordCheckError}
          value={values.confirmPassword}
          onChange={(e) =>
            setValues({ ...values, confirmPassword: e.target.value })
          }
          onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
        />
      </div>
      <Button
        option="solid"
        text="재설정"
        size="large"
        onClick={resetPasswordEvent}
      />
    </div>
  );
}
