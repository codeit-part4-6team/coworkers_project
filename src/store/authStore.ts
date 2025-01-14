import { create } from 'zustand';
import { basicAuthAxios, basicAxios } from '@/lib/basicAxios';
import Cookies from 'js-cookie';
import { User, Group } from '@/types/usergroup';
import { getUserGroups } from '@/lib/headerApi';

interface AuthState {
  user: User | null;
  teams: Group[];
  isPending: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, nickname:string, password: string, passwordConfirmation: string) => Promise<boolean>;
  provider: (platform: string, state: string, url: string, token: string) => Promise<boolean>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
  fetchTeams: () => Promise<void>;
  setTeams: (teams: Group[]) => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  teams: [],
  isPending: false,

  signIn: async (email, password) => {
    set({ isPending: true });
    try {
      const response = await basicAxios.post('/auth/signIn', { email, password });
      const { user, accessToken, refreshToken } = response.data;
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      set({ user });
      set({ isPending: false });
      return true;
    }
    catch (error) {
      return false;
    }
  },
  signUp: async (email, nickname, password, passwordConfirmation) => {
    set({isPending: true});
    try {
      const response = await basicAuthAxios.post(
        '/auth/signUp', {email, nickname, password, passwordConfirmation}
      );
      const { user, accessToken, refreshToken } = response.data;
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);
      set({ user });
      set({ isPending: false });
      return true;
    }
    catch (error) {
      return false;
    }
  },
  provider: async (platform, state, redirectUri, token) => {
    set({isPending: true});
    const response = await basicAuthAxios.post(
      `/auth/signIn/${platform}`, {state, redirectUri, token}
    );
    const { user, accessToken, refreshToken } = response.data;
    Cookies.set('accessToken', accessToken);
    Cookies.set('refreshToken', refreshToken);
    set({ user });
    set({ isPending: false });
    return true;
  },
  signOut: () => {
    Cookies.remove('accessToken', { path: '/' });
    Cookies.remove('refreshToken', { path: '/' });
    set({ user: null, teams: [] });
  },
  checkAuth: async () => {
    set({ isPending: true });
    const accessToken = Cookies.get('accessToken');
    if (!accessToken) {
      set({ user: null, isPending: false });
      return;
    }
    const response = await basicAuthAxios.get('/user');
    set({ user: response.data });
    set({ isPending: false });
  },
  fetchTeams: async () => {
    try {
      const response = await getUserGroups();
      set({ teams: response.data });
    } catch (error) {
      console.error('팀 정보를 불러오는 중 오류 발생:', error);
    }
  },
  setTeams: (teams) => set({ teams }),
  setUser: (user) => set({ user }),
}));

export default useAuthStore;
