import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { GlobalCriteriaDto } from '../Types/Criteria/globalCriteriaDto.ts';

const useGlobalCriteriaService = () => {
  const { get, post } = useHttpService({
    baseUrl: 'globalcriteria',
  });

  const getCriteria = useCallback(async (): Promise<Result<GlobalCriteriaDto>> => {
    return await get('/');
  }, [get]);

  const replaceCriteria = useCallback(async (newGlobalCriteria: GlobalCriteriaDto): Promise<Result<void>> => {
    return await post('/', newGlobalCriteria);
  }, [post]);

  return { getCriteria, replaceCriteria };
};

export default useGlobalCriteriaService;