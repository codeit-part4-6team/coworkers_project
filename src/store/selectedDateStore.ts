import { create } from 'zustand';

interface State {
  selectedDate: Date;
  setSelectedDate: (date: any) => void;
}

const useSelectedDateStore = create<State>((set) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

export default useSelectedDateStore;
