import Cookies from "js-cookie";

export const clearCookies = () => {
  console.log('Clearing cookies');
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: '/' });
  });
};

// 창이 닫힐 때 쿠키를 삭제하는 함수
export const cleanupCookieOnUnload = () => {
  window.addEventListener('beforeunload', clearCookies);
};

// 이 함수를 app.tsx에 추가하여 사용
export const initCleanupOnUnload = () => {
  cleanupCookieOnUnload();
};
