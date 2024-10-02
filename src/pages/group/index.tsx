import noTeam from '@/assets/noteam.png';
import Image from 'next/image';
import Link from 'next/link';

const NoteamPage = () => {
  return (
    <div className="py-[185px] md:py-[272px] lg:py-[212px]">
      <Image
        src={noTeam}
        alt="no team"
        className="w-[312px] md:w-[520px] lg:w-[810px] mx-auto"
      />
      <div className="text-lg font-medium text-center text-text-default mt-8 md:mt-12">
        <p>아직 소속됨 팀이 없습니다.</p>
        <p>팀을 생성하거나 팀에 참여해보세요.</p>
      </div>
      <div className="w-[186px] mx-auto mt-12 md:mt-20">
        <Link href="/addteam">
          <button className="w-full border border-color-brand-primary rounded-xl h-12 text-center bg-color-brand-primary mt-4">
            팀 생성하기
          </button>
        </Link>
        <Link href="/jointeam">
          <button className="w-full border border-color-brand-primary rounded-xl h-12 text-center text-color-brand-primary mt-4">
            팀 참여하기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NoteamPage;
