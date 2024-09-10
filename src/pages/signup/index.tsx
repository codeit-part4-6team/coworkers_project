import Button from '@/components/common/Button';
import FloatingButton from '@/components/common/FloatingButton';
import Input from '@/components/input/Input';

export default function Signup() {
  const testEvent = () => {
    console.log('이벤트실행 테스트');
  };

  const testerrer = ['에러0번테스트', '에러1번테스트'];
  //^[\w\.-]+@([\w-]+\.)+[a-zA-Z]{2,}$ 이메일 유효성 검사 패턴
  return (
    <div className="w-1/4 bg-color-point-cyan">
      <Button option="outlined" size="xsmall" text="테스트" disabled={false} />
      <FloatingButton option="cancel" text="할 일 추가" disabled={false} />
      {/* <FloatingButton option='add' text='할 일 추가' disabled={false} onClick={testEvent}/> */}
      {/* <FloatingButton option='success' text='할 일 추가' disabled={false} /> */}
      <Input
        labeltext="테스트"
        pattern=''
        option="password"
        inputsize="large"
        errortext={testerrer}
        placeholder="미리보기"
      ></Input>
    </div>
  );
}
