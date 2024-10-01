import { create } from 'zustand';
import { Task } from '@/types/listTypes';

interface State {
  workToDo: Task | null;
  setWorkToDo: (data: Task) => void;
}

const useWorkToDoStore = create<State>((set) => ({
  workToDo: null,
  setWorkToDo: (data) => set({ workToDo: data }),
}));

export default useWorkToDoStore;
