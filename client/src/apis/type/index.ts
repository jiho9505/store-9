import { AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  isRequiredLogin?: boolean;
  params?: { [key: string]: string };
}
