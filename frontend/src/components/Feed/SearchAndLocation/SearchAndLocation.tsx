import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import CategoryDropdown from '../../Common/CategoryDropdown/CategoryDropdown';
import Search from '../../Common/Search/Search.tsx';
import RegionCitySelector from '../../Common/RegionCitySelector/RegionCitySelector.tsx';
import { regions } from '../../../Data/Regions.ts';
import { FilterDto } from '../../../Types/Businesses/filterDto.ts';

interface SearchAndLocationProps {
  filter: FilterDto;
  setFilter: (filterDto: FilterDto) => void;
}

const SearchAndLocation = ({
  filter,
  setFilter,
}: SearchAndLocationProps) => {
  const doSearch = useCallback((value?: string) => {
    setFilter({
      ...filter,
      search: value,
    });
  }, [filter, setFilter]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 1,
        padding: '8px 16px',
        gap: 2,
        marginTop: '12px',
      }}
    >
      <CategoryDropdown multiSelect
        initialSelectedOptions={filter.categories}
        onOptionsSelected={(options) => setFilter({
          ...filter,
          categories: options,
        })}
      />

      <Box sx={{ flexGrow: 1, mx: 2 }}>
        <Search placeholder="Пошук оголошень..." doSearch={doSearch} initialValue={filter.search} />
      </Box>

      <RegionCitySelector regions={regions}
        selectedRegion={filter.location}
        onHandleRegionSelect={(region) => setFilter({
          ...filter,
          location: region,
        })}
      />
    </Box>
  );
};

export default SearchAndLocation;
