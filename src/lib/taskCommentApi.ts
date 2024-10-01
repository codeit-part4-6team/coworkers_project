import { basicAuthAxios } from './basicAxios';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  CreateTaskCommentParams,
  EditTaskCommentParams,
  DeleteTaskCommentParams,
} from '@/types/listTypes';

// 할 일의 코멘트 불러오기
const getTaskComments = (taskId: number) => {
  return basicAuthAxios.get(`/tasks/${taskId}/comments`);
};

export const useTaskCommentsQuery = (taskId: number) => {
  return useQuery({
    queryKey: ['tasks', taskId, 'comment'], // ['tasks', taskId, 'comment'] << 로 할 때는 안되는 이유가 뭐지?
    queryFn: () => getTaskComments(taskId),
  });
};

// 할 일의 코멘트 생성하기
const createTaskComment = ({ taskId, content }: CreateTaskCommentParams) => {
  return basicAuthAxios.post(`/tasks/${taskId}/comments`, { content });
};

export const useCreateTaskCommentMutation = () => {
  return useMutation({
    mutationFn: createTaskComment,
  });
};

// 할 일의 코멘트 수정하기
const editTaskComment = ({
  taskId,
  commentId,
  content,
}: EditTaskCommentParams) => {
  return basicAuthAxios.patch(`/tasks/${taskId}/comments/${commentId}`, {
    content,
  });
};

export const useEditTaskCommentMutation = () => {
  return useMutation({
    mutationFn: editTaskComment,
  });
};

// 할 일의 코멘트 삭제하기
const deleteTaskComment = ({ commentId }: DeleteTaskCommentParams) => {
  return basicAuthAxios.delete(`/tasks/{taskId}/comments/${commentId}`);
};

export const useDeleteTaskCommentMutation = () => {
  return useMutation({
    mutationFn: deleteTaskComment,
  });
};
