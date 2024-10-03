import { basicAuthAxios } from './basicAxios';

export const getUserMemberships = () => {
  return basicAuthAxios.get(`/user/memberships`);
};
