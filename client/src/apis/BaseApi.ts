import axios, { AxiosInstance } from 'axios';
import qs from 'qs';

import { CustomAxiosRequestConfig } from './type';
import { BaseResponseData } from '@shared/dtos/base/response';
import { formatToDateFromResponse } from '@/utils/dateParse';

export default class BaseApi {
  private instance: AxiosInstance;

  constructor(path: string) {
    path = path.startsWith('/') ? path.slice(1) : path;

    const url = new URL(`api/${path}`, process.env.API_URL || 'http://localhost:4000');

    this.instance = axios.create({
      baseURL: url.href,
      validateStatus: (status) => 200 <= status && status < 300,
      paramsSerializer: qs.stringify,
      withCredentials: true,
    });

    this.instance.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      if (config.isRequiredLogin) {
        //로그인 체크
      }
      return config;
    });

    this.instance.interceptors.response.use((response) => {
      // response.data = formatToDateFromResponse(response.data);

      return response;
    });
  }

  protected async get<DTO = unknown>(url: string, config?: CustomAxiosRequestConfig) {
    const result = await this.instance.get<BaseResponseData<DTO>>(url, config);
    return result.data;
  }

  protected async post<DTO = unknown>(
    url: string,
    data?: unknown,
    config?: CustomAxiosRequestConfig
  ) {
    const result = await this.instance.post<BaseResponseData<DTO>>(url, data, config);
    return result.data;
  }

  protected async put<DTO = unknown>(
    url: string,
    data?: unknown,
    config?: CustomAxiosRequestConfig
  ) {
    const result = await this.instance.put<BaseResponseData<DTO>>(url, data, config);
    return result.data;
  }

  protected async delete<DTO = unknown>(url: string, config?: CustomAxiosRequestConfig) {
    const result = await this.instance.delete<BaseResponseData<DTO>>(url, config);
    return result.data;
  }
}
