import axios from "axios";
import {BASE_API_URL} from "./base.tsx";
import {Auth, BadGetAuthResponse, GetAuthResponse} from "../types/auth.ts";

import {User} from "../types/user.ts";

type AuthenticateUserRequest = [true, Auth] | [false, BadGetAuthResponse];
const authenticateUser = async (username: string, password: string): Promise<AuthenticateUserRequest> => {
  try {
    const response = await axios.postForm<GetAuthResponse>(`${BASE_API_URL}/login/access-token`, {username, password});
    return [true, {token: response.data.access_token, type: response.data.token_type}];

  } catch (error) {
    return [false, { detail: "Invalid credentials" }];
  }
}

type UserInfoRequest = [true, User] | [false, BadGetAuthResponse];
const userInfo = async (token: string, authType: string = 'Bearer'): Promise<UserInfoRequest> => {
  try {
    const response = await axios.post<User>(`${BASE_API_URL}/login/test-token`, {}, {headers: {'Authorization': `${authType} ${token}`}})
    return [true, response.data];
  }catch (error) {
    return [false, { detail: "Invalid credentials" }];
  }
}


export {authenticateUser, userInfo};