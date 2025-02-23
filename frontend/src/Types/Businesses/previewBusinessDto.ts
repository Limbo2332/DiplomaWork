import { Currency } from '../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';

export type PreviewBusinessDto = {
  id: string;
  previewImageUrl: string;
  name: string;
  price: number;
  priceCurrency: Currency;
  category: string;
  termToPayback: number;
  averageProfit: number;
  hasBargain: boolean;
  averageCheque: number;
  amountOfWorkers: number;
  flatSquare: number;
  location: string;
  dateOfCreation: Date;
  isSaved: boolean;
}