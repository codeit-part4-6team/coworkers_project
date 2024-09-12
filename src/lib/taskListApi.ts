import { basicAuthAxios } from './basicAxios';

// 할 일 리스트 생성
export async function createTaskList(groupId: number, name: string) {
  const response = await basicAuthAxios.post(
    `groups/${groupId}/task-lists`,
    name,
  );

  return response;
}

// 할 일 특정 리스트 불러오기
export async function getTaskList(groupId: number, taskListId: number) {
  const response = await basicAuthAxios.get(
    `groups/${groupId}/task-lists/${taskListId}`,
  );

  return response;
}

// 할 일 특정 리스트 수정
export async function editTaskList(
  groupId: number,
  taskListId: number,
  name: string,
) {
  const response = await basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}`,
    name,
  );

  return response;
}

// 할 일 특정 리스트 삭제
export async function deleteTaskList(groupId: number, taskListId: number) {
  const response = await basicAuthAxios.delete(
    `groups/${groupId}/task-lists/${taskListId}`,
  );

  return response;
}

// 할 일 리스트 순서 변경
export async function orderTaskList(
  groupId: number,
  taskListId: number,
  displayIndex: number,
) {
  const response = await basicAuthAxios.patch(
    `groups/${groupId}/task-lists/${taskListId}/order`,
    displayIndex,
  );

  return response;
}
