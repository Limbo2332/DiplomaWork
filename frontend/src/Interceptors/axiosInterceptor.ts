import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { AccessTokenDto } from '../Types/Auth/accessTokenDto.ts';
import { Result } from '../Hooks/useHttpService.ts';
import { MutableRefObject } from 'react';

interface ErrorResponse {
  code?: string;
  message?: string;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: AxiosError | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

interface AxiosInterceptorProps {
  axiosClient: MutableRefObject<AxiosInstance>;
  refreshToken: (request: AccessTokenDto) => Promise<Result<AccessTokenDto>>;
  removeRefreshToken: (refreshToken: string) => Promise<Result<void>>;
  showErrorNotification: (message: string) => void;
  accessToken: string | null;
  refreshTokenValue: string | null;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

const axiosInterceptor = ({
  axiosClient,
  refreshToken,
  removeRefreshToken,
  showErrorNotification,
  accessToken,
  refreshTokenValue,
  setAccessToken,
  setRefreshToken,
}: AxiosInterceptorProps) => {
  axiosClient.current.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      console.log(config);
      console.log(accessToken);

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  axiosClient.current.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponse>) => {
      const originalRequest = error.config as InternalAxiosRequestConfig;

      if (error.response?.status === 401) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(() => axiosClient.current(originalRequest));
        }

        isRefreshing = true;

        return new Promise((resolve, reject) => {
          if (!accessToken && refreshTokenValue) {
            removeRefreshToken(refreshTokenValue);
            showErrorNotification('Ваша сесія закінчилась. Будь ласка, зайдіть знову.');
            reject(error);
          }

          if (!refreshTokenValue) {
            showErrorNotification('Ваша сесія закінчилась. Будь ласка, зайдіть знову.');
            reject(error);
          }

          const request: AccessTokenDto = {
            accessToken: accessToken!,
            refreshToken: refreshTokenValue!,
          };

          refreshToken(request)
            .then((result) => {
              if (result.isOk && result.data) {
                axiosClient.current.defaults.headers.common['Authorization'] = `Bearer ${result.data.accessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${result.data.refreshToken}`;

                setAccessToken(result.data.accessToken);
                setRefreshToken(result.data.refreshToken);

                processQueue();
                resolve(axiosClient.current(originalRequest));
              } else {
                removeRefreshToken(refreshTokenValue!);
                showErrorNotification('Ваша сесія закінчилась. Будь ласка, зайдіть знову.');
                reject(error);
              }
            })
            .catch((err) => {
              processQueue(err);
              removeRefreshToken(refreshTokenValue!);
              showErrorNotification('Ваша сесія закінчилась. Будь ласка, зайдіть знову.');
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      if (error.response?.data?.code === 'InvalidToken' || error.response?.data?.code === 'ExpiredRefreshToken') {
        await removeRefreshToken(refreshTokenValue!);
        showErrorNotification('Ваша сесія закінчилась. Будь ласка, зайдіть знову.');
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInterceptor;
