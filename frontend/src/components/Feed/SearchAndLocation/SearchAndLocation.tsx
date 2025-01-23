import React from 'react';
import { Box } from '@mui/material';
import CategoryDropdown from '../../Common/CategoryDropdown/CategoryDropdown';
import Search from '../../Common/Search/Search.tsx';
import RegionCitySelector from '../../Common/RegionCitySelector/RegionCitySelector.tsx';
import { regions } from '../../../Data/Regions.ts';

const SearchAndLocation = () => {
  const doSearch = () => {
    console.log('Searching...');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1,
        padding: '8px 16px',
        gap: 2,
        marginTop: '36px',
      }}
    >
      {/* Dropdown меню */}
      <CategoryDropdown />

      {/* Поле пошуку */}
      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <Search placeholder="Пошук оголошень..." doSearch={doSearch} />
      </Box>

      {/* Селектор регіонів */}
      <RegionCitySelector regions={regions} open />
    </Box>
  );
};

export default SearchAndLocation;
