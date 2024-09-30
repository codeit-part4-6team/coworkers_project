import { basicAuthAxios } from './basicAxios';

export async function signUp(email: string, nickname: string, password: string, passwordConfirmation: string) {
  const requestbody = {
    email,
    nickname,
    password,
    passwordConfirmation
  };

  try {
    const response = await basicAuthAxios.post(
      `/auth/signUp`,
      requestbody
    );
    return response;
  }
  catch(error: any) {
    return error.response;
  }
}

export async function signIn(email: string, password: string) {
  const requestbody = {
    email,
    password
  }
 try {
  const response = await basicAuthAxios.post(
    `/auth/signIn`,
    requestbody
  )
  return response;
 }
 catch(error: any) {
  return error.response;
 }
}

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
  return response;
}
