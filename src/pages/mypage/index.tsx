import Button from '@/components/common/Button';
import Input from '@/components/input/Input';
import DeleteAccount from '@/components/mypage/deleteaccount';
import useModalStore from '@/store/modalStore';
import { useEffect, useState, useRef } from 'react';
import Modal from '@/components/common/Modal';
import { changePassword, userPatch } from '@/lib/auth';
import MemberIcon from '@/assets/member.svg';
import EditIcon from '@/assets/btn_edit.svg';
import { imageFile } from '@/lib/articleApi';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface userProps {
  id: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  email: string;
}

const nickNameErrorText = [
  '이름은 필수 입력입니다.',
  '이름은 최대 20자까지 가능합니다.',
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

export default function MyPage() {
  const [userData, setUserData] = useState<userProps>();
  const { openModal, closeModal } = useModalStore();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter(); // useRouter 선언
  const [newImage, setNewImage] = useState<string | null>(null);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // const imageUrl = URL.createObjectURL(file);
      try {
        const imageUrl = await imageFile(file);
        setNewImage(imageUrl.data.url);
      }
      catch(error) {
        alert('이미지 업로드 중 오류 발생하였습니다.');
      }
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const [values, setValues] = useState({
    nickName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    nickNameError: '',
    passwordError: '',
    passwordCheckError: '',
  });


  const userEditEvent= async () => {
    if(values.nickName && newImage) {
      console.log(values.nickName, newImage);
      try {
        const response = await userPatch(values.nickName, newImage);
        alert('회원정보 수정 완료했습니다.');
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  const handleBlur = (field: string, value: string) => {
    let error = '';
    if (field === 'nickName') {
      error = validateNickName(value);
    } else if (field === 'password') {
      error = validatePassword(value);
    } else if (field === 'confirmPassword') {
      error = validatePasswordCheck(values.password, value);
    }
  
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => {
      const updatedErrors = {
        ...prev,
        [`${field}Error`]: error,
      };
      return updatedErrors;
    });
  };
  

  const validateNickName = (value: string) => {
    if (!value) return nickNameErrorText[0];
    if (value.length > 20) return nickNameErrorText[1];
    return '';
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
      const user = Cookies.get('userData');
      if (user) {
        const parsedData = JSON.parse(user);
        setUserData(parsedData);
      }
      else {
        router.push('/signin');
      }
    }
  }, [router]);

  useEffect(() => {
    if(userData) {
      setValues((prevValues) => ({
        ...prevValues,
        nickName: userData.nickname,
      }));
    }
  }, [])

  if (!userData) {
    return null;
  }

  return (
    <div className={`mt-6 mx-auto lg:w-[792px] p-4 md:p-7`}>
      <p className={`text-text-primary text-2lg font-bold mb-7 md:text-xl`}>계정 설정</p>
      <div className={`mb-7 w-fit relative`} onClick={handleIconClick}>
        {/* 새 이미지가 있으면 표시, 없으면 기본 MemberIcon 표시 */}
        {newImage ? (
          <img src={newImage} alt="User" className={`w-[64px] h-[64px] rounded-full`} />
        ) : (
          <MemberIcon className={`w-[64px] h-[64px]`} />
        )}
        <EditIcon className={'absolute right-0 bottom-0'} />
      </div>

      <input
        type="file"
        ref={fileInputRef} // ref를 통해 파일 입력 요소에 접근
        accept="image/*"
        style={{ display: 'none' }} // 파일 선택창을 숨김
        onChange={handleImageChange}
      />

      <div className={`flex flex-col gap-6`}>
        <div className={`h-[75px]`}>
          <Input
            labeltext="이름"
            disabled={false}
            defaultValue={userData.nickname}
            option="text"
            inValid={false}
            placeholder={`닉네임을 입력해 주세요.`}
            onBlur={(e) => handleBlur('nickName', e.target.value)}
          />
        </div>
        <div className={`h-[75px]`}>
          <Input
            labeltext="이메일"
            disabled={true}
            defaultValue={userData.email}
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
                      setValues((prevValues) => ({
                        ...prevValues, // 기존의 nickName 값을 유지
                        password: '',  // password 초기화
                        confirmPassword: '',  // confirmPassword 초기화
                      }));
                      setErrors((prevErrors) => ({
                        ...prevErrors, // 다른 에러 메시지는 유지
                        passwordError: '',  // password 에러 초기화
                        passwordCheckError: '',  // confirmPassword 에러 초기화
                      }));
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
        <div className={`flex items-center justify-between`}>
          <DeleteAccount />
          <div className='w-[74px]'>
            <Button option='solid' text='저장' size='large' onClick={userEditEvent}/>
          </div>
        </div>
      </div>
    </div>
  );
}
