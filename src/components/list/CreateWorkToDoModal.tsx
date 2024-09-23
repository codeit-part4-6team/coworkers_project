import Modal from '@/components/common/Modal';
import XIcon from '@/assets/x_icon.svg';
import useModalStore from '@/store/modalStore';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { today } from '@/utils/today';

const options = [
  { label: '한 번', value: 'option1' },
  { label: '매일', value: 'option2' },
  { label: '주 반복', value: 'option3' },
  { label: '월 반복', value: 'option4' },
];

export default function CreateWorkToDoModal() {
  const { closeModal } = useModalStore();

  const handleChange = (selectedOption: DropdownOption) => {
    console.log('Selected option:', selectedOption);
  };
  return (
    <Modal
      id="createToDo"
      className="px-6 pt-6 pb-8 md:w-[384px] md:rounded-xl bg-background-secondary antialiased"
      positionBottom={true}
    >
      <div className="flex justify-end mb-4">
        <button type="button" onClick={() => closeModal('createToDo')}>
          <XIcon />
        </button>
      </div>
      <h2 className="mb-4 text-center text-lg font-medium text-text-primary">
        할 일 만들기
      </h2>
      <p className="mb-6 mx-auto w-[227px] text-center text-md font-medium text-text-default">
        할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다.
      </p>
      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <label
            htmlFor="title"
            className="w-16 text-lg font-medium text-text-primary"
          >
            할 일 제목
          </label>
          <input
            type="text"
            id="title"
            placeholder="할 일 제목을 입력해주세요"
            className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="date"
            className="w-28 text-lg font-medium text-text-primary"
          >
            시작 날짜 및 시간
          </label>
          <input
            type="text"
            id="date"
            placeholder={today()}
            className="px-4 w-full h-12 border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="repeat"
            className="w-16 text-lg font-medium text-text-primary"
          >
            반복 설정
          </label>
          <div>
            <Dropdown
              options={options}
              onChange={handleChange}
              placeholder="반복 안함"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label
            htmlFor="memo"
            className="w-16 text-lg font-medium text-text-primary"
          >
            할 일 메모
          </label>
          <textarea
            id="memo"
            placeholder="메모를 입력해주세요"
            className="mb-2 px-4 py-3 w-full h-[75px] border border-border-primary-10 rounded-xl text-lg font-regular text-text-primary bg-background-secondary outline-none resize-none"
          />
        </div>
        <Button
          option="solid"
          size="large"
          text="만들기"
          disabled={false}
          type="button"
        />
      </form>
    </Modal>
  );
}
