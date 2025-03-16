export const setTokens = (accessToken: string | null, refreshToken: string | null, isAdmin: boolean) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }

  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }

  localStorage.setItem('isAdmin', isAdmin.toString());
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

  return { accessToken, refreshToken, isAdmin };
};
