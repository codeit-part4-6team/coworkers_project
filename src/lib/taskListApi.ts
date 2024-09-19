import { basicAuthAxios } from './basicAxios';

// 할 일 리스트 생성
export const createTaskList = (groupId: number, name: string) => {
  return basicAuthAxios.post(`/groups/${groupId}/task-lists`, name);
};

// 특정 할 일 리스트 불러오기
export const getTaskListDetail = (groupId: number, taskListId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}/task-lists/${taskListId}`);
};

// 특정 할 일 리스트 수정
export const editTaskListDetail = (
  groupId: number,
  taskListId: number,
  name: string,
) => {
  return basicAuthAxios.patch(
    `/groups/${groupId}/task-lists/${taskListId}`,
    name,
  );
};

// 특정 할 일 리스트 삭제
export const deleteTaskListDetail = (groupId: number, taskListId: number) => {
  return basicAuthAxios.delete(`/groups/${groupId}/task-lists/${taskListId}`);
};

// 특정 할 일 리스트 순서 변경
export const orderTaskListDetail = (
  groupId: number,
  taskListId: number,
  displayIndex: number,
) => {
  return basicAuthAxios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/order`,
    displayIndex,
  );
};
