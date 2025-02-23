import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { ProfileDto } from '../Types/Profile/profileDto.ts';

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

  return { getProfileInfo, setProfileInfo };
};

export default useUserService;