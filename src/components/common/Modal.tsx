import { useEffect, useRef, ReactNode } from 'react';
import useModalStore from '@/store/modalStore';
import clsx from 'clsx';

interface Props extends React.DialogHTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  id: string;
  positionBottom?: boolean;
}

export default function Modal({
  children,
  id,
  positionBottom,
  className,
  ...rest
}: Props) {
  const { modals, openModal, closeModal } = useModalStore();
  const isOpen = modals[id] || false;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    const handleClose = () => {
      closeModal(id);
    };

    if (dialogElement) {
      dialogElement.addEventListener('close', handleClose);

      if (isOpen) {
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }

      return () => {
        dialogElement.removeEventListener('close', handleClose);
      };
    }
  }, [isOpen, id, closeModal]);

  useEffect(() => {
    if (isOpen) {
      openModal(id);
    }

    return () => {
      closeModal(id);
    };
  }, [id, openModal, closeModal]);

  return (
    <dialog
      {...rest}
      ref={dialogRef}
      className={clsx(
        positionBottom
          ? `mb-0 md:mb-auto w-full max-w-full rounded-t-3xl ${className}`
          : `${className}`,
      )}
    >
      {children}
    </dialog>
  );
}
// Modal 컴포넌트 사용법

// 0. 사용할 컴포넌트로 이동한다.
// 1. 모달컴포넌트와 모달상태저장store를 import로 불러온다. (60, 61번 라인)
// 2. openModal과 closeModal을 구조분해할당하여 가져온다. (64번 라인)
// 3. jsx에 Modal을 넣고 id의 값을 string 타입으로 원하는 이름을 넣어준다. (69번 라인)
// 4. 모달열기버튼과 닫는버튼에 onClick() 이벤트를 주고 이벤트에 openModal()과 closeModal()을 넣어주고 인자로 Modal id에 지정한 이름을 똑같이 넣어준다. (68, 70번 라인)

// import Modal from '@/components/common/Modal';
// import useModalStore from '@/store/modalStore';

// export default function Home() {
//   const { openModal, closeModal } = useModalStore();

//   return (
//     <div>
//       <button onClick={() => openModal('test')}>모달 열기 버튼</button>
//       <Modal id="test" className="w-[200px] h-[200px]">
//         <button onClick={() => closeModal('test')}>모달 닫기 버튼</button>
//       </Modal>
//     </div>
//   );
// }

// 모바일에서 모달이 화면 아래 붙게 하려면 positionBottom을 true로 추가
// <Modal positionBottom={true}>내용</Modal>;
