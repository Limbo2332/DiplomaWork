import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface SingleCheckboxFilterProps {
  label: string;
  checked?: boolean;
  onChange: (value: boolean) => void;
}

const SingleCheckboxFilter = ({
  label,
  checked = false,
  onChange,
}: SingleCheckboxFilterProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);

    setIsChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          name={label}
        />
      }
      label={label}
    />
  );
};

export default SingleCheckboxFilter;