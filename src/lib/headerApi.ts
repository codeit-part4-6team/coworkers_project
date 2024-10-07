import { basicAuthAxios } from './basicAxios';

export const getUser = () => {
  return basicAuthAxios.get(`/user`);
};

export const getUserGroups = () => {
  return basicAuthAxios.get(`/user/groups`);
};
