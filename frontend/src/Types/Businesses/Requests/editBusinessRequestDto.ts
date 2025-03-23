import { Currency } from '../../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';
import { ImagePathDto } from '../../BlobImage/imagePathDto.ts';

export type EditBusinessRequestDto = {
  id: string;
  name: string;
  location: string;
  category: string;
  price: number;
  currency: Currency;
  area: string;
  rentPrice: number;
  employees: number;
  salaryExpenses: number;
  averageCheck: number;
  averageMonthlyRevenue: number;
  averageMonthlyProfit: number;
  hasEquipment: boolean;
  hasShelter: boolean;
  hasGenerator: boolean;
  isNegotiable: boolean;
  hasPreviousOwnerSupport: boolean;
  hasFop: boolean;
  hasCompetitors: boolean;
  isSeasonal: boolean;
  season: string;
  hasDeliveryServices: boolean;
  telegram: string;
  instagram: string;
  facebook: string;
  twitter: string;
  site: string;
  description: string;
  oldImages: ImagePathDto[];
  newImages: File[];
}