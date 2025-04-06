import React from 'react';
import { Box, Button, Menu, MenuItem, Typography } from '@mui/joy';
import { Sort } from '@mui/icons-material';
import { FilterDto, SortOptions as SortOptionsEnum } from '../../../Types/Businesses/filterDto.ts';

interface SortOptionsProps {
  filter: FilterDto;
  setFilter: (filterDto: FilterDto) => void;
}

const SortOptions = ({ filter, setFilter }: SortOptionsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (sortOption: SortOptionsEnum) => {
    setFilter({
      ...filter,
      sortBy: sortOption,
    });
    handleClose();
  };

  const getSortDisplayText = () => {
    switch (filter.sortBy) {
      case SortOptionsEnum.Ai:
        return 'За рекомендаціями ШІ';
      case SortOptionsEnum.Expert:
        return 'За рекомендаціями експертів';
      default:
        return 'Сортування';
    }
  };

  return (
    <Box sx={{ ml: 2 }}>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Sort />}
        onClick={handleClick}
        size="md"
        sx={{
          borderRadius: 'md',
          minWidth: '220px',
          justifyContent: 'flex-start',
        }}
      >
        {getSortDisplayText()}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} placement="bottom-end">
        <MenuItem selected={filter.sortBy === SortOptionsEnum.Default}
          onClick={() => handleSortChange(SortOptionsEnum.Default)}>
          <Typography>За замовчуванням</Typography>
        </MenuItem>
        <MenuItem selected={filter.sortBy === SortOptionsEnum.Ai} onClick={() => handleSortChange(SortOptionsEnum.Ai)}>
          <Typography>Сортувати за рекомендаціями ШІ</Typography>
        </MenuItem>
        <MenuItem selected={filter.sortBy === SortOptionsEnum.Expert}
          onClick={() => handleSortChange(SortOptionsEnum.Expert)}>
          <Typography>Сортувати за рекомендаціями експертів</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortOptions;

