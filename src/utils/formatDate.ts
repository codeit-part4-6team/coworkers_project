import { SelectedDate } from '@/types/listTypes';

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
}

export function formatSecondDate(dateString: any) {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[date.getDay()];

  return `${month}월 ${day}일 (${dayOfWeek})`;
}

export function formatThirdDate(date: SelectedDate) {
  if (!(date instanceof Date)) {
    return ''; // 유효한 Date 객체가 아닐 경우 빈 문자열 반환
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
