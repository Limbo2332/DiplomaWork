import { useState } from 'react';
import { Currency } from '../CurrencyDropdown/CurrencyDropdown.tsx';

const useCurrencyRangeFilter = () => {
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currencyMenu, setCurrencyMenu] = useState<Element | null>(null);

  return {
    currency,
    setCurrency,
    currencyMenu,
    setCurrencyMenu,
  };
};

export default useCurrencyRangeFilter;