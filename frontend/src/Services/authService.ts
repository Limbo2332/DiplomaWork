import { useCallback } from 'react';
import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { UserLoginDto } from '../Types/User/userLoginDto.ts';
import { AuthUserDto } from '../Types/Auth/authUserDto.ts';
import { UserRegisterDto } from '../Types/User/userRegisterDto.ts';
import { ResetPasswordDto } from '../Types/Auth/resetPasswordDto.ts';

const useAuthService = () => {
  const { post, removeRefreshToken } = useHttpService({
    baseUrl: 'auth',
  });

  const login = useCallback(async (request: UserLoginDto): Promise<Result<AuthUserDto>> => {
    return await post('/login', request);
  }, [post]);

  const register = useCallback(async (request: UserRegisterDto): Promise<Result<AuthUserDto>> => {
    return await post('/register', request);
  }, [post]);

  const resetPassword = useCallback(async (request: ResetPasswordDto): Promise<Result<void>> => {
    return await post('/resetPassword', request);
  }, [post]);

  return { login, register, resetPassword, removeRefreshToken };
};

export default useAuthService;