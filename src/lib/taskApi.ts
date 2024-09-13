import { basicAuthAxios } from './basicAxios';
import { TaskCreateRequestBody, TaskEditRequestBody } from '@/types/listTypes';

// 할 일 생성
export const createTask = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return basicAuthAxios.post(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );
};

// 특정 할 일 리스트의 할 일들 불러오기
export const getTasks = (groupId: number, taskListId: number) => {
  return basicAuthAxios.get(`groups/${groupId}/task-lists/${taskListId}/tasks`);
};

// 특정 할 일 불러오기
export const getTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return basicAuthAxios.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
};

// 특정 할 일 수정
export const editTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: TaskEditRequestBody,
) => {
  return basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );
};

// 특정 할 일 삭제
export const deleteTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return basicAuthAxios.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
};

// 특정 할 일 순서 변경
export const orderTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
) => {
  return basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
    displayIndex,
  );
};

// 반복 할 일 생성
export const createRecurringTask = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return basicAuthAxios.post(
    `groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );
};

// 반복 할 일 삭제
export const deleteRecurringTask = (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  return basicAuthAxios.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );
};
