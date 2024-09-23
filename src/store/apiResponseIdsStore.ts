import { create } from 'zustand';

interface State {
  groupId: number;
  setGroupId: (id: number) => void;
  taskListId: number;
  setTaskListId: (id: number) => void;
  taskId: number;
  setTaskId: (id: number) => void;
  recurringId: number;
  setRecurringId: (id: number) => void;
}

export const useApiResponseIdsStore = create<State>((set) => ({
  groupId: 0,
  setGroupId: (id) => set({ groupId: id }),
  taskListId: 0,
  setTaskListId: (id) => set({ taskListId: id }),
  taskId: 0,
  setTaskId: (id) => set({ taskId: id }),
  recurringId: 0,
  setRecurringId: (id) => set({ recurringId: id }),
}));
