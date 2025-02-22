import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { useNotification } from '../Contexts/notificationContext';
import axiosInterceptor from '../Interceptors/axiosInterceptor';
import { getTokens, setTokens } from '../Utils/tokenUtils';
import { AccessTokenDto } from '../Types/Auth/accessTokenDto.ts';

export interface UseHttpServiceProps {
  baseUrl: string;
}

export interface Result<T> {
  data: T | undefined;
  isOk: boolean;
  status: number | null;
  errorMessage: string | null;
}

export interface FileVm {
  content: Blob;
  fileName: string;
}

const useHttpService = ({ baseUrl }: UseHttpServiceProps) => {
  const { showErrorNotification } = useNotification();
  const url = `http://localhost:5000/${baseUrl}`;

  const client = useRef(axios.create({ baseURL: url }));

  const onSuccess = useCallback(<T, Data>(response: AxiosResponse<T, Data>): Result<T> => {
    let data;
    if (response.data instanceof Blob) {
      const contentDisposition = response.headers['content-disposition'];
      data = {
        content: response.data,
        fileName: contentDisposition ? getFileName(contentDisposition) : '',
      } as FileVm;
    } else {
      data = response.data;
    }

    if (response.status === HttpStatusCode.NoContent) {
      return { data, isOk: true, status: response.status, errorMessage: null } as Result<T>;
    }

    return {
      data,
      isOk: response.status === HttpStatusCode.Ok,
      status: response.status,
      errorMessage: null,
    } as Result<T>;
  }, [showErrorNotification]);

  const onError = useCallback(<T>(error: AxiosError<{ Message: string }>): Result<T> => {
    showErrorNotification(error.message);
    return { data: undefined, isOk: false, status: null, errorMessage: error.message };
  }, [showErrorNotification]);

  const get = async <T>(url: string, params?: object, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = { method: 'GET', params, signal };
    return client.current.get<T>(url, config).then(onSuccess).catch(onError<T>);
  };

  const post = useCallback(async <T, Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = { method: 'POST', signal };
    return client.current.post<T>(url, data, config).then(onSuccess).catch(onError<T>);
  }, [onError, onSuccess]);

  const put = async <T, Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = { method: 'PUT', signal };
    return client.current.put<T>(url, data, config).then(onSuccess).catch(onError<T>);
  };

  const del = useCallback(async <T>(url: string, params?: object, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = { params, signal };
    return client.current.delete<T>(url, config).then(onSuccess).catch(onError<T>);
  }, [onSuccess, onError]);

  const getFile = async (url: string, params?: object, signal?: AbortSignal): Promise<Result<FileVm>> => {
    const config: AxiosRequestConfig = { params, signal, responseType: 'blob' };
    return client.current.get<FileVm>(url, config).then(onSuccess).catch(onError<FileVm>);
  };

  const postFile = async <Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<FileVm>> => {
    const config: AxiosRequestConfig = { signal, responseType: 'blob' };
    return client.current.post<FileVm>(url, data, config).then(onSuccess).catch(onError<FileVm>);
  };

  const getFileName = (contentDisposition: string) => {
    return contentDisposition.split('filename=')[1];
  };

  const refreshToken = useCallback(async (request: AccessTokenDto): Promise<Result<AccessTokenDto>> => {
    return await post('/refresh', request);
  }, [post]);

  const removeRefreshToken = useCallback(async (refreshToken: string): Promise<Result<void>> => {
    return await del('/removeToken', {
      refreshToken,
    });
  }, [del]);

  useEffect(() => {
    const { accessToken, refreshToken: currentRefreshToken } = getTokens();

    axiosInterceptor({
      axiosClient: client,
      refreshToken,
      removeRefreshToken,
      showErrorNotification,
      accessToken,
      refreshTokenValue: currentRefreshToken,
      setAccessToken: (token) => setTokens(token, currentRefreshToken),
      setRefreshToken: (token) => setTokens(accessToken, token),
    });
  }, [refreshToken, removeRefreshToken, showErrorNotification, getTokens]);

  return { get, post, put, del, getFile, postFile, removeRefreshToken };
};

export default useHttpService;
