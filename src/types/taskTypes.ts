export interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  doneAt: string | null;
  updatedAt: string;
  user: any | null;
  recurringId: number;
  deletedAt: string | null;
  displayIndex: number;
  writer: {
    id: number;
    nickname: string;
    image: string | null;
  };
  doneBy: {
    user: any | null;
  };
  commentCount: number;
  frequency: string;
}

export interface TaskList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: Task[];
}