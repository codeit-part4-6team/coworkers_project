import Date from '@/components/list/Date';
import WorkToDoContainer from '@/components/list/WorkToDoContainer';
import FloatingButton from '@/components/common/FloatingButton';
import WorkToDoDetail from '@/components/list/WorkToDoDetail';
import CreateWorkToDoModal from '@/components/list/CreateWorkToDoModal';
import useModalStore from '@/store/modalStore';

import { basicAuthAxios } from '@/lib/basicAxios';

export default function List() {
  const { openModal } = useModalStore();

  // 임시 로그인 기능
  const login = async () => {
    const response = await basicAuthAxios.post(`auth/signIn`, {
      email: 'kdc5847@naver.com',
      password: '12341234a!',
    });

    localStorage.setItem('accessToken', response.data.accessToken);

    return response;
  };

  const handleLoginClick = () => {
    login();
  };

  return (
    <>
      <CreateWorkToDoModal />
      {/* <WorkToDoDetail /> */}
      <section className="w-full lg:w-[1200px] lg:mx-auto pt-6 lg:pt-10 px-4 md:px-6 antialiased">
        <button type="button" onClick={handleLoginClick}>
          임시 로그인 버튼
        </button>
        <h2 className="mb-7 md:mb-6 text-2lg md:text-xl font-bold">할 일</h2>
        <div className="flex justify-between items-center">
          <Date />
          <div className="text-md font-regular text-color-brand-primary">
            + 새로운 목록 추가하기
          </div>
        </div>
        <WorkToDoContainer />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-md font-medium text-text-default">
          <p>아직 할 일 목록이 없습니다.</p>
          <p>새로운 목록을 추가해주세요.</p>
        </div>
        <div className="fixed bottom-6 right-6 lg:bottom-12 lg:right-24">
          <FloatingButton
            option="add"
            text="할 일 추가"
            disabled={false}
            onClick={() => openModal('createToDo')}
          />
        </div>
      </section>
    </>
  );
}
