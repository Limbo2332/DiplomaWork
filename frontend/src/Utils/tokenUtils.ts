import { UserDto } from '../Types/User/userDto.ts';

export const setTokens = (accessToken: string | null, refreshToken: string | null, isAdmin: boolean, currentUser: UserDto | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  localStorage.setItem('isAdmin', isAdmin.toString());

  if (currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('isAdmin');
};

export const getTokens = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const isAdmin = localStorage.getItem('isAdmin');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') ?? 'null') as UserDto;

  return { accessToken, refreshToken, isAdmin, currentUser };
};
