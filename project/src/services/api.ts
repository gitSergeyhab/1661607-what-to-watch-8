import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './auth-info';

const BASE_URL = 'https://8.react.pages.academy/wtw';
const TIMEOUT = 5000;
const TOKEN_HEADER = 'X-Token';

const enum HttpCode {
  Unauthorized = 401,
}


export const createAPI = (onUnauthorized: () => void) : AxiosInstance => {
  const api = axios.create({baseURL: BASE_URL, timeout: TIMEOUT});

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers[TOKEN_HEADER] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const {response} = error;
      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return api;
};
