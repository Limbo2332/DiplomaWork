import { Currency } from '../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';

export type PreviewBusinessDto = {
  id: string;
  createdBy: string;
  previewImageUrl: string;
  name: string;
  price: number;
  priceCurrency: Currency;
  category: string | null;
  termToPayBack: number;
  averageProfit: number;
  hasBargain: boolean;
  averageCheque: number;
  amountOfWorkers: number;
  flatSquare: number;
  location: string;
  creationDate: Date;
  isSaved: boolean;
}