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
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00Z`;
}

export function formatFourthDate(date: SelectedDate) {
  if (!(date instanceof Date)) {
    return '';
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());

  return `${year}년 ${month}월 ${day}일`;
}

export function formatFifthDate(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
}

export function formatElapsedTime(updatedAtString: string) {
  const updatedAt = new Date(updatedAtString);
  const currentTime = new Date();

  const timeDiff = currentTime.getTime() - updatedAt.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 1) {
    return '방금 전';
  } else if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else if (days < 30) {
    return `${days}일 전`;
  } else if (months < 12) {
    return `${months}개월 전`;
  } else {
    return `${years}년 전`;
  }
}
