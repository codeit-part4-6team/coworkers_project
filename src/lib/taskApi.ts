import { basicAuthAxios } from './basicAxios';
import { TaskCreateRequestBody, TaskEditRequestBody } from '@/types/listTypes';

// 할 일 생성
export async function createTask(
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) {
  const response = await basicAuthAxios.post(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );

  return response;
}

// 특정 할 일 리스트의 할 일들 불러오기
export async function getTasks(groupId: number, taskListId: number) {
  const response = await basicAuthAxios.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks`,
  );

  return response;
}

// 특정 할 일 불러오기
export async function getTask(
  groupId: number,
  taskListId: number,
  taskId: number,
) {
  const response = await basicAuthAxios.get(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );

  return response;
}

// 특정 할 일 수정
export async function editTask(
  groupId: number,
  taskListId: number,
  taskId: number,
  data: TaskEditRequestBody,
) {
  const response = await basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );

  return response;
}

// 특정 할 일 삭제
export async function deleteTask(
  groupId: number,
  taskListId: number,
  taskId: number,
) {
  const response = await basicAuthAxios.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );

  return response;
}

// 할 일 순서 변경
export async function orderTask(
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
) {
  const response = await basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
    displayIndex,
  );

  return response;
}

// 반복 할 일 생성
export async function createRecurringTask(
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) {
  const response = await basicAuthAxios.post(
    `groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );

  return response;
}

// 반복 할 일 삭제
export async function deleteRecurringTask(
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) {
  const response = await basicAuthAxios.delete(
    `groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );

  return response;
}
