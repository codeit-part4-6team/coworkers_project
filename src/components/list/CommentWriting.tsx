import { useRef } from 'react';
import EnterIcon from '@/assets/enter.svg';
import EnterActiveIcon from '@/assets/enter_active.svg';

export default function CommentWriting() {
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (commentRef.current) {
      commentRef.current.style.height = 'auto';
      commentRef.current.style.height = commentRef.current.scrollHeight + 'px';
    }
  };
  return (
    <div className="flex justify-between items-start mb-6 py-[13px] border-y border-border-primary-10">
      <label htmlFor="comment" className="hidden">
        comment
      </label>
      <textarea
        ref={commentRef}
        rows={1}
        placeholder="댓글을 달아주세요"
        onChange={handleResizeHeight}
        className="w-full h-6 pt-[3px] text-md font-regular bg-background-secondary overflow-y-hidden outline-none resize-none placeholder:text-md placeholder:font-regular placeholder:text-text-default"
      />
      <button type="button">
        <EnterIcon />
        {/* <EnterActiveIcon /> */}
      </button>
    </div>
  );
}
