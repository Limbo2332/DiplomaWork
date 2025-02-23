import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';

const useCategoriesService = () => {
  const { get } = useHttpService({
    baseUrl: 'categories',
  });

  const getCategories = useCallback(async (): Promise<Result<string[]>> => {
    return await get('/');
  }, [get]);

  return { getCategories };
};

export default useCategoriesService;