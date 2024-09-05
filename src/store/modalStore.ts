import { create } from 'zustand';

interface State {
  modals: { [key: string]: boolean };
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const useModalStore = create<State>((set) => ({
  modals: {},
  openModal: (id: string) =>
    set((state) => ({
      modals: { ...state.modals, [id]: true },
    })),
  closeModal: (id: string) =>
    set((state) => ({
      modals: { ...state.modals, [id]: false },
    })),
}));

export default useModalStore;
