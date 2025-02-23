import React from 'react';
import { Box, IconButton } from '@mui/material';
import RangeFilter from '../RangeFilter/RangeFilter.tsx';
import uah from '../../../assets/images/hryvnia.svg';

export interface HryvniaRangeFilterProps {
  label: string;
  min: number;
  max: number;
  step: number;
  onSubmit: (minValue: number, maxValue: number) => void;
}

const HryvniaRangeFilter = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  onSubmit,
}: HryvniaRangeFilterProps) => {
  const elementPreview = (
    <Box sx={{
      height: '28px',
      width: '20px',
    }}>
      <img src={uah} alt="UAH" className="uah-currency" style={{
        maxWidth: '16px',
        maxHeight: '16px',
      }} />
    </Box>
  );

  const element = (
    <IconButton
      size="small"
      sx={{
        background: '#f5f5f5',
        borderRadius: '8px',
        ':hover': { background: '#e0e0e0' },
      }}
    >
      <img src={uah} alt="UAH" className="uah-currency" style={{
        maxWidth: '16px',
        maxHeight: '16px',
      }} />
    </IconButton>
  );

  return (
    <RangeFilter
      label={label}
      min={min}
      max={max}
      step={step}
      element={element}
      onSubmit={onSubmit}
      elementPreview={elementPreview}
    />
  );
};

export default HryvniaRangeFilter;
