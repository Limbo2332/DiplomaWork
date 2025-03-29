import React, { useEffect, useState } from 'react';
import { Box, FormControl, Slider, Typography } from '@mui/joy';

const RangeFilterControl = ({
  label,
  icon,
  min,
  max,
  step,
  value,
  onChange,
  unit,
}: {
  label: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (newValue: [number, number]) => void;
  unit?: string;
}) => {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setLocalValue(newValue as [number, number]);
  };

  const handleChangeCommitted = (_event: React.SyntheticEvent | Event, newValue: number | number[]) => {
    onChange(newValue as [number, number]);
  };

  return (
    <FormControl>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ color: 'primary.500', mr: 1, display: 'flex' }}>{icon}</Box>
        <Typography level="body-md" noWrap sx={{ flex: 1 }}>
          {label}
        </Typography>
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
        <Typography level="body-sm" sx={{ whiteSpace: 'nowrap' }}>
          {localValue[0].toLocaleString()} {unit}
        </Typography>
        <Typography level="body-sm" sx={{ whiteSpace: 'nowrap' }}>
          {localValue[1].toLocaleString()} {unit}
        </Typography>
      </Box>
    </FormControl>
  );
};

export default RangeFilterControl;