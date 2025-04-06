import { useCallback, useState } from 'react';
import SearchAndLocation from '../../components/Feed/SearchAndLocation/SearchAndLocation.tsx';
import Filters from '../../components/Feed/Filters/Filters.tsx';
import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';
import useBusinessService from '../../Services/businessesService.ts';
import type { MainFeedBusinessesRequestDto } from '../../Types/Businesses/Requests/mainFeedBusinessesRequestDto.ts';
import { FilterDto, SortOptions as SortOptionsEnum } from '../../Types/Businesses/filterDto.ts';
import type { MainFeedBusinessesResponseDto } from '../../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';

export const defaultFilterDtoValues: FilterDto = {
  categories: [],
  search: undefined,
  location: undefined,
  priceStart: 1,
  priceEnd: 10000000,
  priceCurrency: 'USD',
  amountOfWorkersStart: 1,
  amountOfWorkersEnd: 1000,
  averageChequeStart: 1,
  averageChequeEnd: 15000000,
  averageIncomeStart: 1,
  averageIncomeEnd: 10000000,
  averageProfitStart: 1,
  averageProfitEnd: 10000000,
  timeToPaybackStart: 1,
  timeToPaybackEnd: 1200,
  hasEquipment: false,
  hasBargain: false,
  hasSupportFromOwner: false,
  hasPhop: false,
  hasIntegrationWithDeliveryServices: false,
  onlySaved: false,
  hideViewed: false,
  flatSquareStart: 5,
  flatSquareEnd: 5000000,
  hasGeneratorOrEcoFlow: false,
  sortBy: SortOptionsEnum.Default,
};

const MainFeed = () => {
  const { getMainFeedBusinesses } = useBusinessService();

  const [filter, setFilter] = useState<FilterDto>(defaultFilterDtoValues);

  const getCards = useCallback(
    async (offset: number, pageSize: number): Promise<MainFeedBusinessesResponseDto> => {
      const request: MainFeedBusinessesRequestDto = {
        pageCount: pageSize,
        offset: offset,
        filter: filter,
      };

      const result = await getMainFeedBusinesses(request);

      if (!result?.data) {
        return {
          previewBusinesses: [],
          hasMore: false,
        };
      }

      return result.data;
    },
    [filter, getMainFeedBusinesses],
  );

  return (
    <>
      <SearchAndLocation filter={filter} setFilter={setFilter} />
      <Filters filter={filter} setFilter={setFilter} />
      <InfiniteScrollCards key={JSON.stringify(filter)} getCards={getCards} />
    </>
  );
};

export default MainFeed;

