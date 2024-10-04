import { create } from 'zustand';
import { TaskResponse } from '@/types/listTypes';

interface State {
  workToDo: TaskResponse | null;
  setWorkToDo: (data: TaskResponse) => void;
}

const useWorkToDoStore = create<State>((set) => ({
  workToDo: null,
  setWorkToDo: (data) => set({ workToDo: data }),
}));

export default useWorkToDoStore;
