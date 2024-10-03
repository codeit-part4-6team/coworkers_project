import { basicAuthAxios } from './basicAxios';
import { AxiosResponse } from 'axios';

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

export async function deleteAccount() {
  const response = await basicAuthAxios.delete(
    `/user`
  )
  return response;
}

export async function changePassword(password: string, passwordConfirmation: string): Promise<AxiosResponse> {
  const requestbody = {
    passwordConfirmation,
    password
  }
  const response = await basicAuthAxios.patch(
    `/user/password`,
    requestbody
  )
  return response;
}

export async function myHistory() {
  const response = await basicAuthAxios.get(
    '/user/history'
  )
  return response;
}

export async function sendPasswordRestEmail(email: string) {
  const requestbody = {
    email,
    "redirectUrl": "http://localhost:3000/passreset"
  }
  const response = await basicAuthAxios.post(
    '/user/send-reset-password-email',
    requestbody
  )
  return response;
}

export async function resetPassword(passwordConfirmation: string, passwrod: string, token: string) {
  const requestbody = {
    passwordConfirmation,
    passwrod,
    token
  }
  const response = await basicAuthAxios.patch(
    '/user/reset-password',
    requestbody
  )
  return response;
}
