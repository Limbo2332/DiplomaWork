import React, { useState } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

interface SingleCheckboxFilterProps {
  label: string;
  checked?: boolean;
  onChange: () => void;
}

const SingleCheckboxFilter = ({
  label,
  checked = false,
  onChange,
}: SingleCheckboxFilterProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange();

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