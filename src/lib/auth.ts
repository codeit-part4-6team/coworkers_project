import { basicAuthAxios } from './basicAxios';

export async function signInProvider(oauth: string, state:string, redirectUri: string, token: string) {
  
  const requestbody = {
    state,
    redirectUri,
    token,
  }
  
  const response = await basicAuthAxios.post(
      `/auth/signIn/${oauth}`,
      requestbody
    );

  console.log(response);
  return response;
}