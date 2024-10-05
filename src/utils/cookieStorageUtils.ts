import Cookies from "js-cookie";

export const clearCookies = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};

// 서버가 꺼지거나, 페이지가 닫힐 때 로컬 스토리지를 삭제하는 함수
export const cleanupCookieOnUnload = () => {
  window.addEventListener('beforeunload', clearCookies);
};
