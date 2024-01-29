import globalStore from "../stores/globalStore.ts";
import {Auth} from "../types/auth.ts";
import {userInfo, authenticateUser as authenticateUserRequest} from "../api/auth.ts";
import axios from "axios";

const {setAppState} = globalStore;

export const refreshAuth = async (): Promise<boolean> => {
  // get the auth from local storage
  try {
    const previousAuth = localStorage.getItem('auth');
    if(!previousAuth) {
      logOut();
      return false;
    }

    const auth: Auth = JSON.parse(previousAuth);
    const [uInfoSuccess, uInfo] = await userInfo(auth.token);
    if(!uInfoSuccess) {
      logOut();
      return false;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
    setAppState('data', 'auth', auth);
    setAppState('data', 'user', uInfo);
    return true;
  } catch (e) {
    return false;
  }
}

export const authenticateUser = async (username: string, password: string): Promise<boolean> => {
  const [authSuccess, authResponse] = await authenticateUserRequest(username, password);
  if(!authSuccess) {
    return false;
  }

  const [uInfoSuccess, uInfo] = await userInfo(authResponse.token);
  if(!uInfoSuccess) {
    return false;
  }

  setAppState('data', 'auth', authResponse);
  setAppState('data', 'user', uInfo);
  axios.defaults.headers.common['Authorization'] = `Bearer ${authResponse.token}`;
  localStorage.setItem('auth', JSON.stringify(authResponse));
  return true;
}

export const logOut = () => {
  setAppState('data', 'auth', undefined);
  setAppState('data', 'user', undefined);
  axios.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem('auth');
}