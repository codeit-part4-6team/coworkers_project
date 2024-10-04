import { useState } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import KebabIcon from '@/assets/kebab_large.svg';
import ProfileMemberIcon from '@/assets/profile_member_large.svg';
import Dropdown, { DropdownOption } from '@/components/common/Dropdown';
import Button from '@/components/common/Button';
import { useTaskCommentsQuery } from '@/lib/taskCommentApi';
import { CommentResponse } from '@/types/listTypes';
import { formatElapsedTime } from '@/utils/formatDate';
import { useEditTaskCommentMutation } from '@/lib/taskCommentApi';
import useModalStore from '@/store/modalStore';
import useApiResponseIdsStore from '@/store/apiResponseIdsStore';

const WorkToDoOptions: DropdownOption[] = [
  { label: '수정하기', value: 'edit' },
  { label: '삭제하기', value: 'delete' },
];

export default function Comment() {
  const router = useRouter();
  const taskId = Number(router.query.taskId);
  const queryClient = useQueryClient();
  const taskCommentsQuery = useTaskCommentsQuery(taskId);
  const editTaskCommentMutation = useEditTaskCommentMutation();
  const { openModal } = useModalStore();
  const { setCommentId } = useApiResponseIdsStore();

  const [editComment, setEditComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(0);

  const handleWorkToDoOptionChange = (
    option: DropdownOption,
    commentId: number,
    commentContent: string,
  ) => {
    const { value } = option;
    if (value === 'edit') {
      setEditCommentId(commentId);
      setEditComment(commentContent);
    }
    if (value === 'delete') {
      openModal('deleteComment');
      setCommentId(commentId);
    }
  };

  const handleEditClick = () => {
    editTaskCommentMutation.mutate(
      {
        taskId: taskId,
        commentId: editCommentId,
        content: editComment,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks', taskId, 'comments'],
          });
          setEditCommentId(0);
          setEditComment('');
        },
      },
    );
  };
  return (
    <>
      {taskCommentsQuery.data?.data.map(
        ({ content, user, updatedAt, id }: CommentResponse) => (
          <div
            key={id}
            className="flex flex-col gap-4 mb-4 pb-4 border-b border-border-primary-10"
          >
            <div className="flex justify-between items-start">
              {editCommentId !== id && (
                <p className="w-[90%] overflow-hidden text-md font-regular">
                  {content}
                </p>
              )}
              {editCommentId === id && (
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => {
                    if (e.target.value.length <= 255) {
                      setEditComment(e.target.value.trimStart());
                    }
                  }}
                  className="px-3 w-full h-9 rounded-md bg-background-tertiary"
                  autoFocus
                />
              )}
              <Dropdown
                options={WorkToDoOptions}
                customButton={<KebabIcon />}
                onChange={(option) =>
                  handleWorkToDoOptionChange(option, id, content)
                }
                size="md"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <img src={user.image} className="w-8 h-8 rounded-full" />
                ) : (
                  <ProfileMemberIcon />
                )}
                <span className="text-md font-medium">{user.nickname}</span>
              </div>
              <span className="text-md font-regular text-text-secondary">
                {formatElapsedTime(updatedAt)}
              </span>
            </div>
            {editCommentId === id && (
              <div className="flex justify-end items-center gap-2">
                <button
                  type="button"
                  className="w-12 h-8 text-md font-semibold text-text-default hover:text-opacity-70 active:text-opacity-40"
                  onClick={() => {
                    setEditCommentId(0);
                    setEditComment('');
                  }}
                >
                  취소
                </button>
                <Button
                  option="outlined"
                  size="xsmall"
                  text="수정하기"
                  blank={true}
                  onClick={handleEditClick}
                />
              </div>
            )}
          </div>
        ),
      )}
    </>
  );
}
