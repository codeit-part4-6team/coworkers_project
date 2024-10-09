import Image from 'next/image';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useUserGroupsQuery } from '@/lib/taskListApi';

import landingTop from '@/assets/landing1.png';
import landingBottom from '@/assets/landing2.png';
import landing3 from '@/assets/landing3.png';
import landing4 from '@/assets/landing4.png';
import landing5 from '@/assets/landing5.png';
import folder from '@/assets/folder.png';
import check from '@/assets/check.png';
import message from '@/assets/message.png';
import repair from '@/assets/repair.png';

export default function Home() {
  const router = useRouter();
  const { data: groupsData, isLoading, isError } = useUserGroupsQuery();

  const handleStartClick = () => {
    const token = Cookies.get('accessToken');

    if (!token) {
      router.push('/signin');
    } else if (
      !isLoading &&
      !isError &&
      groupsData?.data &&
      groupsData.data.length > 0
    ) {
      const firstGroupId = groupsData.data[0].id;
      router.push(`/group/${firstGroupId}`);
    } else {
      router.push('/group');
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center">
      <div className="relative flex h-[640px] w-full flex-col items-center overflow-hidden md:h-[940px] lg:h-[1080px]">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={landingTop}
            alt="랜딩 페이지 상단 이미지"
            objectFit="cover"
            fill
            quality={100}
          />
        </div>
        <div className="mt-[55px] flex flex-col items-center gap-3 md:mt-[100px] lg:mt-[84px]">
          <div className="flex gap-1">
            <span className="text-2xl font-semibold text-text-primary md:text-4xl md:font-medium lg:text-5xl">
              함께 만들어가는 투두 리스트
            </span>
            <Image
              src={repair}
              alt="망치"
              className="w-[24px] h-[24px] md:w-[48px] md:h-[48px]"
            />
          </div>
          <span className="text-3xl font-semibold bg-color-brand-gradient bg-clip-text text-transparent md:text-5xl lg:text-6xl">
            Coworkers
          </span>
          <button
            onClick={handleStartClick}
            className="absolute bottom-[48px] h-[45px] w-[343px] rounded-[32px] bg-color-brand-gradient text-lg font-bold text-text-inverse md:bottom-[119px] md:w-[373px] lg:bottom-[120px] lg:w-[373px]"
          >
            지금 시작하기
          </button>
        </div>
      </div>

      <div className="relative mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] bg-color-brand-gradient p-[1px] md:mx-6 md:h-[354px] md:w-[696px] lg:mb-20 lg:mt-[60px] lg:h-[419px] lg:w-[996px]">
        <div className="h-full w-full rounded-[40px] bg-background-primary">
          <div className="absolute flex flex-col gap-3 bottom-[312px] left-[54px] md:bottom-[120px] md:left-[450px] lg:bottom-[152px] lg:left-[600px]">
            <Image
              src={folder}
              alt="폴더 이미지"
              width={76}
              height={76}
              className="mb-[-12px] ml-[-12px]"
            />
            <span className="text-lg font-medium text-text-inverse md:text-2xl">
              그룹으로
              <br />할 일을 관리해요
            </span>
          </div>
        </div>
        <Image
          src={landing3}
          alt="랜딩3"
          width={235}
          height={273}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[200px] lg:left-[300px] lg:h-[338px] lg:w-[291px]"
        />
      </div>
      <div className="relative mx-4 mb-6 h-[467px] w-[343px] rounded-[40px] border border-border-primary-10 bg-background-secondary outline-[1px] md:mx-6 md:h-[354px] md:w-[696px] lg:mb-20 lg:h-[419px] lg:w-[996px]">
        <Image
          src={landing4}
          alt="랜딩4"
          width={235}
          height={273}
          className="absolute left-1/2 top-0 -translate-x-1/2 md:left-[480px] md:top-0 lg:left-[680px] lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute flex flex-col gap-3 bottom-[52px] left-[54px] md:bottom-[120px] md:left-[121px] lg:bottom-[152px] lg:left-[165px] md:items-end">
          <Image
            src={message}
            alt="메세지 이미지"
            width={76}
            height={76}
            className="mb-[-12px] ml-[-12px] md:mb-[-12px] md:ml-[-12px] lg:mb-[-12px] lg:mr-[-12px]"
          />

          <div className="md:text-right lg:text-right">
            <span className="text-lg font-medium text-text-inverse md:text-2xl">
              간단하게 멤버들을
              <br />
              초대해요
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-4 h-[467px] w-[343px] rounded-[40px] bg-[#020617] md:mx-6 md:h-[354px] md:w-[696px] lg:h-[419px] lg:w-[996px]">
        <Image
          src={landing5}
          alt="랜딩5"
          width={235}
          height={274}
          className="absolute left-1/2 top-0 -translate-x-1/2 md:left-[200px] lg:left-[300px] lg:top-0 lg:h-[338px] lg:w-[291px]"
        />
        <div className="absolute flex flex-col gap-3 bottom-[52px] left-[54px] md:bottom-[120px] md:left-[450px] lg:bottom-[152px] lg:left-[600px]">
          <Image
            src={check}
            alt="체크 이미지"
            width={76}
            height={76}
            className="mb-[-12px] ml-[-12px]"
          />
          <div>
            <span className="text-lg font-medium text-text-inverse lg:text-2xl">
              할 일도 간편하게
              <br />
              체크해요
            </span>
          </div>
        </div>
      </div>
      <div className="relative flex h-[431px] w-full flex-col items-center overflow-x-hidden md:h-[675px] md:w-full lg:h-[1080px]">
        <div className="absolute top-[100px] md:top-[176px] lg:top-[230px]">
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-6">
            <span className="text-2xl font-medium text-text-inverse md:text-4xl lg:text-4xl">
              지금 바로 시작해보세요
            </span>
            <span className="text-base font-medium text-center text-text-inverse md:text-2xl lg:text-2xl">
              팀원 모두와 같은 방향, <br className="md:hidden lg:hidden" />
              같은 속도로 나아가는 가장 쉬운 방법
            </span>
          </div>
        </div>
        <div className="relative flex h-full w-full overflow-hidden">
          <Image
            src={landingBottom}
            alt="랜딩 페이지 하단 이미지"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
