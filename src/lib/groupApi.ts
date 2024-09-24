import { basicAuthAxios } from './basicAxios';

// 그룹 생성
export const createGroup = (groupData: { image: string; name: string }) => {
  return basicAuthAxios.post(`/groups`, groupData);
};

// 특정 그룹 정보 불러오기
export const getGroup = (groupId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}`);
};

// 특정 그룹 정보 수정
export const editGroup = (
  groupId: number,
  groupData: { image: string; name: string },
) => {
  return basicAuthAxios.patch(`/groups/${groupId}`, groupData);
};

// 특정 그룹 삭제
export const deleteGroup = (groupId: number) => {
  return basicAuthAxios.delete(`/groups/${groupId}`);
};

// 그룹 멤버 정보 불러오기
export const getGroupMember = (groupId: number, memberUserId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}/member/${memberUserId}`);
};

// 그룹 멤버 삭제
export const deleteGroupMember = (groupId: number, memberUserId: number) => {
  return basicAuthAxios.delete(`/groups/${groupId}/member/${memberUserId}`);
};

// 그룹 초대 정보 불러오기
export const getGroupInvitation = (groupId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}/invitation`);
};

// 그룹 초대 수락
export const acceptGroupInvitation = (userData: {
  userEmail: string;
  token: string;
}) => {
  return basicAuthAxios.post(`/groups/accept-invitation`, userData);
};

// 그룹 멤버 추가
export const addGroupMember = (groupId: number, userEmail: string) => {
  return basicAuthAxios.post(`/groups/${groupId}/member`, { userEmail });
};

// 특정 그룹의 할 일들 불러오기
export const getGroupTasks = (groupId: number) => {
  return basicAuthAxios.get(`/groups/${groupId}/tasks`);
};
