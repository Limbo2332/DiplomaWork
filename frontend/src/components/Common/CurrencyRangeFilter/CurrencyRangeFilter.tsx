import React from 'react';
import CurrencyDropdown, { Currency } from '../CurrencyDropdown/CurrencyDropdown.tsx';
import { AttachMoney, Euro } from '@mui/icons-material';
import uah from '../../../assets/images/hryvnia.svg';
import RangeFilter from '../RangeFilter/RangeFilter.tsx';
import { Box, IconButton } from '@mui/material';
import useCurrencyRangeFilter from './CurrencyRangeFilter.logic.ts';

export interface CurrencyRangeFilterDropdown {
  label: string;
  min: number;
  max: number;
  step: number;
  onSubmit: () => void;
}

const getCurrencyIcon = (currency: Currency) => {
  switch (currency) {
    case 'USD':
      return <AttachMoney style={{
        maxWidth: '20px',
        maxHeight: '20px',
      }} />;
    case 'EURO':
      return <Euro style={{
        maxWidth: '20px',
        maxHeight: '20px',
      }}
      />;
    case 'UAH':
      return <img src={uah} alt="UAH" className="uah-currency" style={{
        maxWidth: '16px',
        maxHeight: '16px',
      }} />;
    default:
      return null;
  }
};

const CurrencyRangeFilter = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  onSubmit,
}: CurrencyRangeFilterDropdown) => {
  const {
    currency,
    setCurrency,
    currencyMenu,
    setCurrencyMenu,
  } = useCurrencyRangeFilter();

  const elementPreview =
    <Box sx={{
      height: '28px',
      width: '20px',
    }}>
      {getCurrencyIcon(currency)}
    </Box>;

  const element =
    <>
      <IconButton
        size="small"
        onClick={(e) => setCurrencyMenu(e.currentTarget)}
        sx={{
          background: '#f5f5f5',
          borderRadius: '8px',
          ':hover': { background: '#e0e0e0' },
        }}
      >
        {getCurrencyIcon(currency)}
      </IconButton>
      <CurrencyDropdown
        anchorEl={currencyMenu}
        onClose={() => setCurrencyMenu(null)}
        handleCurrencyChange={(currency) => setCurrency(currency)}
      />
    </>;

  return (
    <RangeFilter label={label}
      min={min}
      max={max}
      step={step}
      element={element}
      onSubmit={onSubmit}
      elementPreview={elementPreview}
    />
  );
};

export default CurrencyRangeFilter;