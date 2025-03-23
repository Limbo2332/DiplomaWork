import useHttpService, { Result } from '../Hooks/useHttpService.ts';
import { useCallback } from 'react';
import { MainFeedBusinessesResponseDto } from '../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import {
  AdminFeedBusinessesRequestDto,
  MainFeedBusinessesRequestDto,
} from '../Types/Businesses/Requests/mainFeedBusinessesRequestDto.ts';
import { AddToFavoritesRequest } from '../Types/Businesses/Requests/addToFavoritesRequest.ts';
import { BusinessDto } from '../Types/Businesses/businessDto.ts';
import { ApproveBusinessDto } from '../Types/Businesses/Requests/approveBusinessDto.ts';
import { RejectBusinessDto } from '../Types/Businesses/Requests/rejectBusinessDto.ts';
import { GetBusinessesByStatus } from '../Types/Businesses/Requests/getBusinessesByStatus.ts';

const useBusinessService = () => {
  const { get, post, postFormData } = useHttpService({
    baseUrl: 'businesses',
  });

  const getMainFeedBusinesses = useCallback(async (request: MainFeedBusinessesRequestDto): Promise<Result<MainFeedBusinessesResponseDto>> => {
    return await post('/', request);
  }, [post]);

  const getBusiness = useCallback(async (postId: string): Promise<Result<BusinessDto>> => {
    return await get(`/${postId}`);
  }, [get]);

  const getUnapprovedFeedBusinesses = useCallback(async (request: AdminFeedBusinessesRequestDto): Promise<Result<void>> => {
    return await post('/adminFeed', request);
  }, [post]);

  const createBusiness = useCallback(async (request: FormData): Promise<Result<void>> => {
    return await postFormData('/create', request);
  }, [postFormData]);

  const editBusiness = useCallback(async (request: FormData): Promise<Result<void>> => {
    return await postFormData('/edit', request);
  }, [postFormData]);

  const addToFavoriteBusiness = useCallback(async (request: AddToFavoritesRequest): Promise<Result<void>> => {
    return await post('/favorites', request);
  }, [post]);

  const approveBusiness = useCallback(async (request: ApproveBusinessDto): Promise<Result<void>> => {
    return await post('/approve', request);
  }, [post]);

  const rejectBusiness = useCallback(async (request: RejectBusinessDto): Promise<Result<void>> => {
    return await post('/reject', request);
  }, [post]);

  const getBusinessesByStatus = useCallback(async (request: GetBusinessesByStatus): Promise<Result<MainFeedBusinessesResponseDto>> => {
    return await post('/status', request);
  }, [post]);

  return {
    getMainFeedBusinesses,
    getUnapprovedFeedBusinesses,
    createBusiness,
    addToFavoriteBusiness,
    getBusiness,
    approveBusiness,
    rejectBusiness,
    getBusinessesByStatus,
    editBusiness,
  };
};

export default useBusinessService;