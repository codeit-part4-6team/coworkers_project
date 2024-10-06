export interface TaskCreateRequestBody {
  name: string;
  description: string;
  startDate: string;
  frequencyType: string;
  monthDay?: number;
  weekDays?: number[];
}

export interface TaskEditRequestBody {
  name?: string;
  description?: string;
  done?: boolean;
}

type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

export interface CreateTaskListParams {
  groupId: number;
  name: string;
}

export interface CreateRecurringTaskParams {
  groupId: number;
  taskListId: number;
  data: TaskCreateRequestBody;
}

export interface EditTaskDetailParams {
  groupId?: number;
  taskListId?: number;
  taskId: number;
  data: TaskEditRequestBody;
}

export interface DeleteRecurringTaskParams {
  recurringId: number;
}

export interface CreateTaskCommentParams {
  taskId: number;
  content: string;
}

export interface EditTaskCommentParams {
  taskId: number;
  commentId: number;
  content: string;
}

export interface DeleteTaskCommentParams {
  commentId: number;
}

export interface OrderTaskDetailParams {
  groupId: number;
  taskListId: number;
  taskId: number;
  displayIndex: number;
}

// 특정 할 일 리스트 불러오기 타입
interface User {
  image: string;
  nickname: string;
  id: number;
}

interface DoneBy {
  user: User;
}

interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export interface TaskResponse {
  doneBy: DoneBy;
  writer: Writer;
  displayIndex: number;
  commentCount: number;
  deletedAt: string;
  recurringId: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  updatedAt: string;
  doneAt: string;
  date: string;
  description: string;
  name: string;
  id: number;
}

type TaskList = TaskResponse[];

// 할 일의 코멘트 불러오기 타입
export interface CommentResponse {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
  userId: number;
  user: User;
}

// 카테고리 리스트 불러오기 타입
export interface TaskListResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  groupId: number;
  displayIndex: number;
  tasks: TaskList;
}
