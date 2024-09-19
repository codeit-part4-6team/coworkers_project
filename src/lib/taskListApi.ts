import { basicAuthAxios } from './basicAxios';
import { useQuery, useMutation } from '@tanstack/react-query';

// 할 일 리스트 생성
const createTaskList = async ({ groupId, name }: any) => {
  return basicAuthAxios.post(`/groups/${groupId}/task-lists`, { name });
};

export const useCreateTaskListMutation = () => {
  return useMutation({
    mutationFn: createTaskList,
  });
};

// 할 일 리스트 불러오기
const getTaskLists = (groupId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}`);
};

export const useTaskListsQuery = (groupId: number) => {
  return useQuery({
    queryKey: ['groups', groupId],
    queryFn: () => getTaskLists(groupId),
  });
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
