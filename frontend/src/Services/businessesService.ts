import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { MainFeedBusinessesResponseDto } from '../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import { MainFeedBusinessesRequestDto } from '../Types/Businesses/Requests/mainFeedBusinessesRequestDto.ts';

const useBusinessService = () => {
  const { post } = useHttpService({
    baseUrl: 'businesses',
  });

  const getMainFeedBusinesses = useCallback(async (request: MainFeedBusinessesRequestDto): Promise<Result<MainFeedBusinessesResponseDto>> => {
    return await post('/', request);
  }, [post]);

  return {
    getMainFeedBusinesses,
  };
};

export default useBusinessService;