import { Currency } from '../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';

export type FilterDto = {
  categories: string[];
  search?: string;
  location?: string;
  priceStart: number;
  priceEnd: number;
  priceCurrency: Currency;
  flatSquareStart: number;
  flatSquareEnd: number;
  amountOfWorkersStart: number;
  amountOfWorkersEnd: number;
  averageChequeStart: number;
  averageChequeEnd: number;
  averageIncomeStart: number;
  averageIncomeEnd: number;
  averageProfitStart: number;
  averageProfitEnd: number;
  timeToPaybackStart: number;
  timeToPaybackEnd: number;
  hasEquipment: boolean;
  hasGeneratorOrEcoFlow: boolean;
  hasBargain: boolean;
  hasSupportFromOwner: boolean;
  hasPhop: boolean;
  hasIntegrationWithDeliveryServices: boolean;
  onlySaved: boolean;
  hideViewed: boolean;
}