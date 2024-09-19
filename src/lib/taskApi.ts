import { basicAuthAxios } from './basicAxios';
import { TaskCreateRequestBody, TaskEditRequestBody } from '@/types/listTypes';
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';

// 할 일 생성
const createTask = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return basicAuthAxios.post(
    `/groups/${groupId}/task-lists/${taskListId}/tasks`,
    data,
  );
};

export const useCreateTaskMutation = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return useMutation({
    mutationFn: () => createTask(groupId, taskListId, data),
  });
};

// 특정 일자, 특정 할 일 리스트의 할 일들 불러오기
const getTasks = (groupId: number, taskListId: number, date: string) => {
  return basicAuthAxios.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks?date=${date}`,
  );
};

export const useTasksQuery = (
  groupId: number,
  taskListId: number,
  date: string,
) => {
  return useQuery({
    queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks'],
    queryFn: () => getTasks(groupId, taskListId, date),
  });
};

// 특정 할 일 불러오기
const getTaskDetail = (groupId: number, taskListId: number, taskId: number) => {
  return basicAuthAxios.get(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
};

export const useTaskDetailQuery = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return useQuery({
    queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks', taskId],
    queryFn: () => getTaskDetail(groupId, taskListId, taskId),
  });
};

// 특정 할 일 수정
const editTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: TaskEditRequestBody,
) => {
  return basicAuthAxios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );
};

export const useEditTaskDetailMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
  data: TaskEditRequestBody,
) => {
  return useMutation({
    mutationFn: () => editTaskDetail(groupId, taskListId, taskId, data),
  });
};

// 특정 할 일 삭제
const deleteTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return basicAuthAxios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
  );
};

export const useDeleteTaskDetailMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
) => {
  return useMutation({
    mutationFn: () => deleteTaskDetail(groupId, taskListId, taskId),
  });
};

// 특정 할 일 순서 변경
const orderTaskDetail = (
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
) => {
  return basicAuthAxios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/order`,
    displayIndex,
  );
};

export const useOrderTaskDetailMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
  displayIndex: number,
) => {
  return useMutation({
    mutationFn: () =>
      orderTaskDetail(groupId, taskListId, taskId, displayIndex),
  });
};

// 반복 할 일 생성
const createRecurringTask = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return basicAuthAxios.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    data,
  );
};

export const useCreateRecurringTaskMutation = (
  groupId: number,
  taskListId: number,
  data: TaskCreateRequestBody,
) => {
  return useMutation({
    mutationFn: () => createRecurringTask(groupId, taskListId, data),
  });
};

// 반복 할 일 삭제
const deleteRecurringTask = (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  return basicAuthAxios.delete(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`,
  );
};

export const useDeleteRecurringTaskMutation = (
  groupId: number,
  taskListId: number,
  taskId: number,
  recurringId: number,
) => {
  return useMutation({
    mutationFn: () =>
      deleteRecurringTask(groupId, taskListId, taskId, recurringId),
  });
};
