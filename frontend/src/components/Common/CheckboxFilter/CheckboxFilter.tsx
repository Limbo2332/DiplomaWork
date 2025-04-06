import React, { useEffect, useState } from 'react';
import { Box, Switch, Typography } from '@mui/joy';

const CheckboxFilterControl = ({
  label,
  icon,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  icon?: React.ReactNode;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        py: 0.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ color: 'primary.500', mr: 1 }}>{icon}</Box>
        <Typography level="body-md">{label}</Typography>
      </Box>
      <Switch disabled={disabled} checked={isChecked} onChange={(e) => onChange(e.target.checked)} />
    </Box>
  );
};

export default CheckboxFilterControl;