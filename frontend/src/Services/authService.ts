import { useCallback } from 'react';
import useHttpService, { Result } from '../Hooks/useHttpService.ts';

const useAuthService = () => {
  const { post } = useHttpService({
    baseUrl: 'auth',
  });

  // TODO: replace with real request
  const login = useCallback(async (request: { email: string; password: string }): Promise<Result<unknown>> => {
    return await post('/login', request);
  }, [post]);

  // TODO: replace with real request
  const register = useCallback(async (request: {
    email: string;
    password: string;
    fullName: string;
  }): Promise<Result<unknown>> => {
    return await post('/register', request);
  }, [post]);

  // TODO: replace with real request
  const resetPassword = useCallback(async (request: { email: string }): Promise<Result<unknown>> => {
    return await post('/resetPassword', request);
  }, [post]);

  return { login, register, resetPassword };
};

export default useAuthService;