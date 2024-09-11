import KebabIcon from '@/assets/kebab_large.svg';
import ProfileMemberIcon from '@/assets/profile_member_large.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Button from '@/components/common/Button';

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function Comment() {
  const handleWorkToDoOptionChange = (option: DropdownOption) => {
    console.log('dasd');
  };
  return (
    <div className="flex flex-col gap-4 pb-4 border-b-[1px] border-border-primary-10">
      <div className="flex justify-between items-start">
        <p className="text-md font-regular">
          법인 설립 서비스 관련 링크 첨부 드려요 https://www.codeit.kr
          아아아고고고라라라니니니 링크 첨부 부탇 아아아고고고라라라니니니 링크
          첨부 부탇 아아아고고고라라라니니니 링크 첨부
          부탇아아고고고라라라니니니 링크 첨부 부탇 아아아고고고라라라니니니
          링크 첨부 부탇아아고고고라라라니니니 링크 첨부 부탇
          아아아고고고라라라니니니 링크 첨부 부탇
        </p>
        <Dropdown
          options={WorkToDoOptions}
          customButton={<KebabIcon />}
          onChange={handleWorkToDoOptionChange}
          size="md"
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <ProfileMemberIcon />
          <span className="text-md font-medium">우지은</span>
        </div>
        <span className="text-md font-regular text-text-secondary">
          2025.05.30
        </span>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          type="button"
          className="w-12 h-8 text-md font-semibold text-text-default hover:text-[rgba(100, 116, 139, 0.5)] active:text-text-secondary"
        >
          취소
        </button>
        <Button option="outlined" size="xsmall" text="수정하기" blank={true} />
      </div>
    </div>
  );
}
