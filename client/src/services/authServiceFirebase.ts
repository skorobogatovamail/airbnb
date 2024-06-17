import type { AxiosInstance, AxiosResponse } from 'axios';
import httpClient from './httpClient';
import { authResponceSchema } from '../types/authTypes';
import type { AuthState, UserLoginFormType, UserSignupFormType } from '../types/authTypes';

class AuthServiceFirebase {
  constructor(private readonly client: AxiosInstance) {}

  async signup(formdata: UserSignupFormType): Promise<AuthState> {
    const res = await this.client.post('/authFirebase/signup', formdata);
    const data = authResponceSchema.parse(res.data);
    return {
      accessToken: data.accessToken,
      user: { status: 'logged', user: data.user },
    };
  }

  async login(formdata: UserLoginFormType): Promise<AuthState> {
    const res = await this.client.post('/authFirebase/login', formdata);
    const data = authResponceSchema.parse(res.data);
    return {
      accessToken: data.accessToken,
      user: { status: 'logged', user: data.user },
    };
  }

  async refreshToken(): Promise<AuthState> {
    const res = await this.client('/tokens/refresh');
    const data = authResponceSchema.parse(res.data);
    return {
      accessToken: data.accessToken,
      user: { status: 'logged', user: data.user },
    };
  }

  logout(): Promise<AxiosResponse> {
    return this.client('/authFirebase/logout');
  }
}

const authServiceFirebase = new AuthServiceFirebase(httpClient);

export default authServiceFirebase;
