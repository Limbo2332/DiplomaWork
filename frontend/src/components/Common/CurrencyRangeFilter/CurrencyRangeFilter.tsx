import type { Currency } from '../CurrencyDropdown/CurrencyDropdown.tsx';
import React, { useState } from 'react';
import uah from '../../../assets/images/hryvnia.svg';
import { AttachMoney, Euro } from '@mui/icons-material';
import { Box, FormControl, Option, Select, Slider, Typography } from '@mui/joy';

const CurrencyRangeFilterControl = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  currency,
  onCurrencyChange,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setLocalValue(newValue as [number, number]);
  };

  const handleChangeCommitted = () => {
    onChange(localValue);
  };

  const getCurrencyIcon = () => {
    switch (currency) {
      case 'UAH':
        return <img src={uah || '/placeholder.svg'} alt="UAH" style={{ width: 20, height: 20 }} />;
      case 'USD':
        return <AttachMoney />;
      case 'EURO':
        return <Euro />;
      default:
        return <AttachMoney />;
    }
  };

  return (
    <FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ color: 'primary.500', mr: 1, maxHeight: '24px' }}>{getCurrencyIcon()}</Box>
        <Typography level="body-md" noWrap sx={{ flex: 1 }}>
          {label}
        </Typography>
        <Box sx={{ ml: 'auto', maxHeight: '24px' }}>
          <Select
            size="sm"
            value={currency}
            onChange={(_, value) => onCurrencyChange(value as Currency)}
            variant="plain"
            sx={{ minWidth: 70 }}
          >
            <Option value="UAH">UAH</Option>
            <Option value="USD">USD</Option>
            <Option value="EURO">EURO</Option>
          </Select>
        </Box>
      </Box>
      <Slider
        value={localValue}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        sx={{ my: 1 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography level="body-sm">
          {localValue[0].toLocaleString()} {currency}
        </Typography>
        <Typography level="body-sm">
          {localValue[1].toLocaleString()} {currency}
        </Typography>
      </Box>
    </FormControl>
  );
};

export default CurrencyRangeFilterControl;