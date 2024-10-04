import MyHistory from "@/components/mypage/myhistory";

export default function myHistory() {
  return (
    <div className={`mt-7 mx-4 lg:mt-10 lg:w-[1200px] lg:mx-auto`}>
      <p className={`text-text-primary text-2lg font-bold mb-[27px] md:text-xl`}>마이 히스토리</p>
      <div>
        <MyHistory />
      </div>
    </div>
  );
}
