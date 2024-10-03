import { basicAuthAxios } from './basicAxios';
import {
  CreateRecurringTaskParams,
  EditTaskDetailParams,
  DeleteRecurringTaskParams,
} from '@/types/listTypes';
import { useQuery, useMutation } from '@tanstack/react-query';

// 특정 일자, 특정 할 일 리스트의 할 일들 불러오기 (사용중)
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
    queryKey: ['groups', groupId, 'taskLists', taskListId, 'tasks', date],
    queryFn: () => getTasks(groupId, taskListId, date),
  });
};

// 특정 할 일 불러오기 (사용중)
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

// 특정 할 일 수정 (사용중)
const editTaskDetail = ({
  groupId,
  taskListId,
  taskId,
  data,
}: EditTaskDetailParams) => {
  return basicAuthAxios.patch(
    `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`,
    data,
  );
};

export const useEditTaskDetailMutation = () => {
  return useMutation({
    mutationFn: editTaskDetail,
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

// 반복 할 일 생성 (사용중)
const createRecurringTask = ({
  groupId,
  taskListId,
  data,
}: CreateRecurringTaskParams) => {
  return basicAuthAxios.post(
    `/groups/${groupId}/task-lists/${taskListId}/recurring`,
    { ...data },
  );
};

export const useCreateRecurringTaskMutation = () => {
  return useMutation({
    mutationFn: createRecurringTask,
  });
};

// 반복 할 일 삭제 (사용중)
const deleteRecurringTask = ({ recurringId }: DeleteRecurringTaskParams) => {
  return basicAuthAxios.delete(
    `/groups/{groupId}/task-lists/{taskListId}/tasks/{taskId}/recurring/${recurringId}`,
  );
};

export const useDeleteRecurringTaskMutation = () => {
  return useMutation({
    mutationFn: deleteRecurringTask,
  });
};
