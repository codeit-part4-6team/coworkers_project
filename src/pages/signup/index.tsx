import Button from '@/components/common/Button';
import FloatingButton from '@/components/common/FloatingButton';
import Input from '@/components/input/Input';

export default function Signup() {
  const testEvent = () => {
    console.log('이벤트실행 테스트');
  };

  const testerror = ['입력안함', '패턴틀린', '이상한거', '나오면안됨'];
  const testerror2 = ['입력안함', '8자이하', '패턴틀림'];
  const testerror3 = ['입력안함', '20자이상'];
  const testerror4 = ['입력안함', '패스워드값 다름'];

  //테스트용
  // <div className="w-1/4 bg-color-point-cyan">
  //     <Button option="outlined" size="xsmall" text="테스트" disabled={false} />
  //     <FloatingButton option="cancel" text="할 일 추가" disabled={false} />
  //     {/* <FloatingButton option='add' text='할 일 추가' disabled={false} onClick={testEvent}/> */}
  //     {/* <FloatingButton option='success' text='할 일 추가' disabled={false} /> */}
  //     <Input
  //       labeltext="테스트"
  //       option="text"
  //       // pattern='email'
  //       inputSize="large"
  //       // errorText={testerror}
  //       placeholder="미리보기"
  //       // passwordCheck='123456'
  //     />
  //   </div>

  return (
    <div>
      <Input
        labeltext="인풋 라벨"
        option="text" // text or password 입력된 글자의 암호화 처리
        inputSize="large" //large or small width사이즈에 맞춰서 변경해서 넣어줘야합니다.
        placeholder="미리보기용 텍스트"
        // ref={사용하려면 넣으시오}
      />
    </div>
  );
}
