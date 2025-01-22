import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router';

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

const useHttpService = ({
  baseUrl,
}: UseHttpServiceProps) => {
  const navigate = useNavigate();
  const url = `https://localhost:8000/${baseUrl}`;

  const client = useRef(axios.create({ baseURL: url }));

  const get = async <T>(url: string, params?: object, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      params,
      signal,
    };

    return client.current.get<T>(url, config)
      .then(onSuccess)
      .catch(onError<T>);
  };

  const post = async <T, Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      signal,
    };

    return client.current.post<T>(url, data, config)
      .then(onSuccess)
      .catch(onError<T>);
  };

  const put = async <T, Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      signal,
    };

    return client.current.put<T>(url, data, config)
      .then(onSuccess)
      .catch(onError<T>);
  };

  const del = async <T>(url: string, params?: object, signal?: AbortSignal): Promise<Result<T>> => {
    const config: AxiosRequestConfig = {
      params,
      signal,
    };

    return client.current.delete<T>(url, config)
      .then(onSuccess)
      .catch(onError<T>);
  };

  const getFile = async (url: string, params?: object, signal?: AbortSignal): Promise<Result<FileVm>> => {
    const config: AxiosRequestConfig = {
      params,
      signal,
      responseType: 'blob',
    };

    return client.current.get<FileVm>(url, config)
      .then(onSuccess)
      .catch(onError<FileVm>);
  };

  const postFile = async <Data>(url: string, data: Data, signal?: AbortSignal): Promise<Result<FileVm>> => {
    const config: AxiosRequestConfig = {
      signal,
      responseType: 'blob',
    };

    return client.current.post<FileVm>(url, data, config)
      .then(onSuccess)
      .catch(onError<FileVm>);
  };

  const onSuccess = <T, Data>(response: AxiosResponse<T, Data>): Result<T> => {
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
  };

  const onError = <T>(error: AxiosError<{ Message: string }>): Result<T> => {
    // TODO: add notification about error

    return {
      data: undefined,
      isOk: false,
      status: null,
      errorMessage: error.message,
    };
  };

  const getFileName = (contentDisposition: string) => {
    return contentDisposition.split('filename=')[1];
  };

  return { get, post, put, del, getFile, postFile };
};

export default useHttpService;