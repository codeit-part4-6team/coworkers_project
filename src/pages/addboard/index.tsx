import Input from '@/components/input/Input';
import Button from '@/components/common/Button';

const AddBoard = () => {
  return (
    <div className="px-4 mt-10 md:px-6 md:mt-14 lg:px-[360px]">
      <div className="md:flex md:justify-between md:items-center">
        <h3 className="text-2lg font-medium text-text-primary md:text-xl md:font-bold">
          게시글 쓰기
        </h3>
        <div className="w-[184px] hidden md:block">
          <Button option="solid" size="large" text="등록" disabled={false} />
        </div>
      </div>
      <div className="w-full border-t border-border-primary-10 my-6"></div>
      <div className="flex gap-1.5 items-center">
        <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
          *
        </p>
        <p className="text-text-primary font-medium text-md md:text-lg">제목</p>
      </div>
      <Input
        placeholder="제목을 입력해주세요."
        option="text"
        inputSize="small"
        labeltext=""
      />
      <div className="flex gap-1.5 items-center mt-8">
        <p className="text-color-brand-tertiary font-medium text-md md:text-lg">
          *
        </p>
        <p className="text-text-primary font-medium text-md md:text-lg">내용</p>
      </div>
      <Input
        placeholder="내용을 입력해주세요."
        option="text"
        inputSize="large"
        labeltext=""
      />
      <p className="text-text-primary font-medium text-md mt-4 md:text-lg">
        이미지
      </p>
      <div className="mt-10 md:hidden">
        <Button option="solid" size="large" text="등록" disabled={false} />
      </div>
    </div>
  );
};

export default AddBoard;
