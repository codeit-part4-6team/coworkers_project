import Button from '@/components/common/Button';
import Input from '@/components/input/Input';
import DeleteAccount from '@/components/mypage/deleteaccount';
import useModalStore from '@/store/modalStore';
import { useEffect, useState } from 'react';
import Modal from '@/components/common/Modal';
import { changePassword } from '@/lib/auth';
import MemberIcon from '@/assets/member.svg';
import EditIcon from '@/assets/btn_edit.svg';

interface userProps {
  id: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  email: string;
}

const passwordErrorText = [
  '비밀번호는 필수 입력입니다.',
  '비밀번호는 최소 8자 이상입니다.',
  '비밀번호는 숫자, 영문, 특수 문자로만 가능합니다.',
];

const passwordCheckErrorText = [
  '비밀번호 확인을 입력해 주세요.',
  '비밀번호가 일치하지 않습니다.',
];

export default function MyPage() {
  const [userData, setUserData] = useState<userProps>();
  const { openModal, closeModal } = useModalStore();

  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    passwordError: '',
    passwordCheckError: '',
  });

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

  const changePasswordEvent = async () => {
      const response = await changePassword(values.password, values.confirmPassword);
      return response;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('userData');
      if (user) {
        const parsedData = JSON.parse(user);
        setUserData(parsedData);
      }
    }
  }, []);

  return (
    <div className={`mt-6 mx-auto lg:w-[792px] p-4 md:p-7`}>
      <p className={`text-text-primary text-2lg font-bold mb-7 md:text-xl`}>계정 설정</p>
      <div className={`mb-7 w-fit relative`}>
        <MemberIcon className={`w-[64px] h-[64px]`}/>
        <EditIcon className={'absolute right-0 bottom-0'}/>
      </div>
      <div className={`flex flex-col gap-6`}>
        <div className={`h-[75px]`}>
          <Input
            labeltext="이름"
            disabled={false}
            defaultValue={userData?.nickname}
            option="text"
            inValid={false}
            placeholder={`닉네임을 입력해 주세요.`}
          />
        </div>
        <div className={`h-[75px]`}>
          <Input
            labeltext="이메일"
            disabled={true}
            defaultValue={userData?.email || ''}
            option="text"
            inValid={false}
            placeholder="무슨값"
          />
        </div>
        <div className="relative className={`h-[75px]`}">
          <Input
            labeltext="비밀번호"
            disabled={true}
            option="password"
            defaultValue="00000000"
            inValid={false}
            placeholder=""
          />
          <div
            className={`w-[74px] absolute mt-[19px] right-[16px] top-1/2 transform -translate-y-1/2`}
          >
            <Button
              text="변경하기"
              option="solid"
              size="xsmall"
              onClick={() => openModal('changePassword')}
            />
            <Modal
              id="changePassword"
              positionBottom={true}
              className={`w-full h-fit bg-background-secondary md:rounded-[12px] md:w-[384px]`}
            >
              <div className="flex flex-col w-[280px] items-center mt-12 mx-auto">
                <div className="mb-4 text-center mx-5">
                  <p className={`text-text-primary text-lg font-medium`}>
                    비밀번호 변경하기
                  </p>
                </div>
                <div className={`flex flex-col gap-4 mb-6`}>
                  <Input
                    labeltext="비밀번호"
                    option="password"
                    inValid={!!errors.passwordError}
                    errorText={errors.passwordError}
                    placeholder="새 비밀번호를 입력해주세요."
                    onBlur={(e) => handleBlur('password', e.target.value)}
                  />
                  <Input
                    labeltext="비밀번호 확인"
                    option="password"
                    inValid={!!errors.passwordCheckError}
                    errorText={errors.passwordCheckError}
                    placeholder="새 비밀번호를 다시 한 번 입력해주세요."
                    onBlur={(e) =>
                      handleBlur('confirmPassword', e.target.value)
                    }
                  />
                </div>
                <div className={`flex w-[280px] gap-2 h-12 mb-8`}>
                  <Button
                    option="outlinedSecondary"
                    text="닫기"
                    size="large"
                    onClick={() => {
                      closeModal('changePassword');
                      setValues({ password: '', confirmPassword: ''})
                      setErrors({ passwordError: '', passwordCheckError: '' });
                    }}
                  />
                  <Button
                    option="solid"
                    text="변경하기"
                    size="large"
                    onClick={async () => {
                      const response = await changePasswordEvent();
                      if (response && response.status >= 200 && response.status < 300) {
                        // 비밀번호 변경 성공 시 모달 닫기
                        closeModal('changePassword');
                      } else {
                        alert('비밀번호 변경에 실패했습니다.');
                      }
                    }}
                  />
                </div>
              </div>
            </Modal>
          </div>
        </div>
        <div>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
