import ArrowLeft from '@/assets/btn_arrow_left.svg';
import ArrowRight from '@/assets/btn_arrow_right.svg';
import Calendar from '@/assets/btn_calendar.svg';
import WorkToDoContainer from '@/components/list/WorkToDoContainer';
import FloatingButton from '@/components/button/floatingbutton';

export default function List() {
  return (
    <section className="w-[100%] lg:w-[1200px] lg:mx-auto pt-6 lg:pt-10 px-4 md:px-6 ">
      <h2 className="mb-7 md:mb-6 text-2lg md:text-xl font-bold">할 일</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium">5월 18일 (월)</span>
          <div className="flex gap-1">
            <button type="button" title="arrow-left">
              <ArrowLeft />
            </button>
            <button type="button" title="arrow-right">
              <ArrowRight />
            </button>
          </div>
          <button type="button">
            <Calendar />
          </button>
        </div>
        <div className="text-md font-regular text-color-brand-primary">
          + 새로운 목록 추가하기
        </div>
      </div>
      <WorkToDoContainer />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-md font-medium text-text-default">
        <p>아직 할 일 목록이 없습니다.</p>
        <p>새로운 목록을 추가해주세요.</p>
      </div>
      <FloatingButton
        option="add"
        text="할 일 추가"
        disabled={false}
        className="fixed bottom-6 rihgt-6"
      />
    </section>
  );
}
