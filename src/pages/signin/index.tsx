import Button from '@/components/common/Button';
import Input from '@/components/input/Input';
import SocialLogin from '@/components/sociallogin';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sendPasswordRestEmail, signIn } from '@/lib/auth';
import { useRouter } from 'next/router';
import Modal from '@/components/common/Modal';
import useModalStore from '@/store/modalStore';

const emailErrorText = [
  '이메일은 필수 입력입니다.',
  '이메일 형식으로 작성해 주세요.',
];
const passwordErrorText = ['비밀번호는 필수 입력입니다.'];

export default function SignIn() {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();

  const [values, setValues] = useState({
    email: '',
    password: '',
    modalEmail: ''
  });
  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
    modalEmail: ''
  });

  const [tocucheds, setTocucheds] = useState({
    email: false,
    password: false,
    modalEmail: false
  });

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return emailErrorText[0];
    if (!emailRegex.test(value)) return emailErrorText[1];
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) return passwordErrorText[0];
    return '';
  };

  const handleBlur = (field: string, value: string) => {
    let error = '';
    if (field === 'email') {
      error = validateEmail(value);
    } else if (field === 'password') {
      error = validatePassword(value);
    }

    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [`${field}Error`]: error,
    }));
    setTocucheds((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const isFormValid = () => {
    return (
      !errors.emailError &&
      !errors.passwordError &&
      tocucheds.email &&
      tocucheds.password
    );
  };

  const handleSignIp = async () => {
    const response = await signIn(values.email, values.password);
    if (response.status >= 200 && response.status < 300) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userData', JSON.stringify(response.data.user));
      router.push('/');
    } else {
      alert(response.data.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div
      className={`mt-6 mx-auto w-[343px] md:w-[460px] md:mt-[100px] lg:mt-[140px]`}
    >
      <div
        className={`flex justify-center mb-6 text-2xl font-medium lg:text-4xl`}
      >
        <p>로그인</p>
      </div>
      <div className="flex flex-col gap-6 mb-3">
        <Input
          labeltext="이메일"
          option="text"
          inValid={!!errors.emailError}
          errorText={errors.emailError}
          placeholder="이메일을 입력해주세요."
          onBlur={(e) => {
            handleBlur('email', e.target.value);
          }}
        />
        <Input
          labeltext="비밀번호"
          option="password"
          inValid={!!errors.passwordError}
          errorText={errors.passwordError}
          placeholder="비밀번호를 입력해주세요."
          onBlur={(e) => {
            handleBlur('password', e.target.value);
          }}
        />
      </div>
      <div
        className={`text-right mb-10`}
        onClick={() => openModal('passowrdreset')}
      >
        <p
          className={`text-color-brand-primary text-2md font-medium underline md:text-lg`}
        >
          비밀번호를 잊으셨나요?
        </p>
      </div>
      <Modal
        id="passowrdreset"
        positionBottom={true}
        className={`w-full h-fit bg-background-secondary md:rounded-[12px] md:w-[384px]`}
      >
        <div className="flex flex-col w-[280px] items-center mt-12 mx-auto">
          <div className="mb-4 text-center mx-5">
            <p className={`text-text-primary text-lg font-medium`}>
              비밀번호 재설정
            </p>
          </div>
          <div className={`flex flex-col gap-4 mb-6`}>
            <Input
              option="text"
              inValid={!!errors.modalEmail}
              errorText={errors.modalEmail}
              placeholder="이메일을 입력하세요."
              onBlur={(e) => handleBlur('modalEmail', e.target.value)}
            />
          </div>
          <div className={`flex w-[280px] gap-2 h-12 mb-8`}>
            <Button
              option="outlinedSecondary"
              text="닫기"
              size="large"
              onClick={() => {
                closeModal('changePassword');
              }}
            />
            <Button
              option="solid"
              text="링크 보내기"
              size="large"
              onClick={async () => {
                const response = await sendPasswordRestEmail(values.modalEmail);
                if (
                  response &&
                  response.status >= 200 &&
                  response.status < 300
                ) {
                  // 비밀번호 변경 성공 시 모달 닫기
                  closeModal('changePassword');
                } else {
                  alert('링크 보내는데 실패했습니다.');
                }
              }}
            />
          </div>
        </div>
      </Modal>
      <div className={`flex flex-col mb-6 md:mb-12`}>
        <Button
          text="로그인"
          option="solid"
          size="large"
          disabled={!isFormValid()}
          onClick={handleSignIp}
        />
        <div
          className={`flex gap-3 mb-6 justify-center text-md font-medium mt-6`}
        >
          <p className={`text-md text-text-primary`}>아직 계정이 없으신가요?</p>
          <Link
            href="/signup"
            className={`text-color-brand-primary text-md underline`}
          >
            가입하기
          </Link>
        </div>
      </div>
      <SocialLogin />
    </div>
  );
}
