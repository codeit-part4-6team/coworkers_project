import callAPI from './callAPI';

// 할 일 리스트 생성
export async function addTaskList(groupId: number, name: string) {
  const method = 'post';
  const url = `groups/${groupId}/task-lists'`;
  const apiName = 'addTaskList';
  const body = name;
  await callAPI({ method, url, body, apiName });
}

// 할 일 특정 리스트 불러오기
export async function getTaskList(groupId: number, taskListId: number) {
  const method = 'get';
  const url = `groups/${groupId}/task-lists/${taskListId}'`;
  const apiName = 'getTaskList';
  await callAPI({ method, url, apiName });
}

// 할 일 특정 리스트 수정
export async function editTaskList(
  groupId: number,
  taskListId: number,
  name: string,
) {
  const method = 'patch';
  const url = `groups/${groupId}/task-lists/${taskListId}'`;
  const apiName = 'editTaskList';
  const body = name;
  await callAPI({ method, url, body, apiName });
}

// 할 일 특정 리스트 삭제
export async function deleteTaskList(groupId: number, taskListId: number) {
  const method = 'delete';
  const url = `groups/${groupId}/task-lists/${taskListId}'`;
  const apiName = 'deleteTaskList';

  await callAPI({ method, url, apiName });
}

// 할 일 리스트 순서 변경
export async function orderTaskList(
  groupId: number,
  taskListId: number,
  displayIndex: number,
) {
  const method = 'patch';
  const url = `groups/${groupId}/task-lists/${taskListId}/order'`;
  const apiName = 'orderTaskList';
  const body = displayIndex;
  await callAPI({ method, url, body, apiName });
}
