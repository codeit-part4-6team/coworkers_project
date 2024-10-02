import Button from '@/components/common/Button';
import Input from '@/components/input/Input';
import { useEffect, useState } from 'react';

interface userProps {
  id: string;
  nickname: string;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  email: string;
}

export default function MyPage() {
  const [userData, setUserData] = useState<userProps>();

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
    <div className={`mt-6 mx-auto lg:w-[792px]`}>
      <p>계정 설정</p>
      <div>
        <p>계정 이미지 변경 아이콘</p>
      </div>
      <div className={`flex flex-col gap-6`}>
        <div className={`h-[75px]`}>
          <Input
            labeltext="이름"
            disabled={false}
            defaultValue="이런값"
            option="text"
            inValid={false}
            placeholder="무언가"
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
            placeholder="무언가값"
          />
          <div
            className={`w-[74px] absolute mt-[19px] right-[16px] top-1/2 transform -translate-y-1/2`}
          >
            <Button
              text="변경하기"
              option="solid"
              size="xsmall"
              disabled={false}
            />
          </div>
          {/* 회원탈퇴넣기 */}
        </div>
      </div>
    </div>
  );
}
