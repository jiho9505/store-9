import AuthRequest from '@shared/dtos/auth/request';
import AuthResponse from '@shared/dtos/auth/response';
import { AxiosRequestConfig } from 'axios';
import BaseApi from './BaseApi';

class AuthApi extends BaseApi {
  login(body: AuthRequest.Login) {
    return this.post<AuthResponse.Login>('/login', body);
  }

  signup(body: AuthRequest.Signup, config?: AxiosRequestConfig) {
    return this.post('/signup', body, config);
  }

  logout() {
    return this.get('/logout');
  }

  getTerms() {
    return this.get<AuthResponse.GetTerms>('/terms');
  }
}

export default new AuthApi('auth');
