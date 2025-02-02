import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

import './CurrencyDropdown.scss';
import { AttachMoney, Euro } from '@mui/icons-material';

import uah from '../../../assets/images/hryvnia.svg';

export type Currency = 'UAH' | 'USD' | 'EURO';

export interface CurrencyDropdownProps {
  anchorEl: Element | null;
  onClose: () => void;
  handleCurrencyChange: (currency: Currency) => void;
}

const CurrencyDropdown = ({
  handleCurrencyChange,
  anchorEl,
  onClose,
}: CurrencyDropdownProps) => {

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
    >
      <MenuItem onClick={() => handleCurrencyChange('USD')}>
        <IconButton>
          <AttachMoney className="img-usd" />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={() => handleCurrencyChange('EURO')}>
        <IconButton>
          <Euro className="img-eur" />
        </IconButton>
      </MenuItem>
      <MenuItem onClick={() => handleCurrencyChange('UAH')}>
        <IconButton>
          <img src={uah} alt="uah" className="img-uah" />
        </IconButton>
      </MenuItem>
    </Menu>
  );
};

export default CurrencyDropdown;