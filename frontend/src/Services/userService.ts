import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { ProfileDto } from '../Types/Profile/profileDto.ts';
import { AuthorDto } from '../Types/Profile/authorDto.ts';

const useUserService = () => {
  const { get, postFormData } = useHttpService({
    baseUrl: 'user',
  });

  const getProfileInfo = useCallback(async (): Promise<Result<ProfileDto>> => {
    return await get('/profileInfo');
  }, [get]);

  const setProfileInfo = useCallback(async (request: FormData): Promise<Result<void>> => {
    return await postFormData('/profileInfo', request);
  }, [postFormData]);

  const getAuthor = useCallback(async (id: string): Promise<Result<AuthorDto>> => {
    return get(`${id}`);
  }, [get]);

  return { getProfileInfo, setProfileInfo, getAuthor };
};

export default useUserService;