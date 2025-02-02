import React, { ReactNode } from 'react';
import { Box, Button, Popover, Slider, TextField, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import './RangeFilter.scss';
import useRangeFilterLogic from './RangeFilter.logic.ts';

export interface RangeFilterDropdown {
  label: string;
  min: number;
  max: number;
  step: number;
  elementPreview?: ReactNode;
  element?: ReactNode;
  onSubmit: () => void;
}

const RangeFilterDropdown = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  onSubmit,
  elementPreview = null,
  element = null,
}: RangeFilterDropdown) => {
  const {
    handleOpen,
    handleClose,
    handleSliderChange,
    handleInputChange,
    range,
    anchorEl,
  } = useRangeFilterLogic({
    min,
    max,
  });

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleOpen}
        endIcon={<ExpandMore />}
        sx={{
          textTransform: 'none',
          padding: '8px 16px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          backgroundColor: '#f5f5f5',
          color: '#333',
          '&:hover': {
            borderColor: '#999',
          },
        }}
      >
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
          <div className="d-flex align-items-center">
            <Box sx={{ marginRight: '2px' }}>
              {label}:
            </Box>
            {range[0] === range[1]
              ?
              (<Box sx={{ fontWeight: 'bold' }}>
                {range[0]}
              </Box>)
              : (
                <>
                  <Box sx={{ fontWeight: 'bold' }}>
                    {range[0]}
                  </Box>
                  <Box sx={{ mx: 1, height: '28px' }}> - </Box>
                  <Box sx={{ fontWeight: 'bold' }}>
                    {range[1]}
                  </Box>
                </>
              )}
            {elementPreview}
          </div>
        </Typography>
      </Button>
      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '16px',
          },
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          width="400px"
        >
          <Box display="flex" justifyContent="space-between" gap={1}>
            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <Typography variant="body2" color="textSecondary">Від</Typography>
              <TextField
                type="number"
                value={range[0]}
                onChange={(e) => handleInputChange(0, e.target.value)}
                inputProps={{ min, max }}
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>

            <Box display="flex" alignItems="center" gap={1} flex={1}>
              <Typography variant="body2" color="textSecondary">до</Typography>
              <TextField
                type="number"
                value={range[1]}
                onChange={(e) => handleInputChange(1, e.target.value)}
                inputProps={{ min, max }}
                fullWidth
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  },
                }}
              />
            </Box>
            {element}
          </Box>

          {/* Slider */}
          <Slider
            value={range}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            min={min}
            max={max}
            step={step}
            aria-labelledby="range-slider"
            sx={{
              color: '#1976d2',
              '& .MuiSlider-thumb': {
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0px 0px 0px 8px rgba(25, 118, 210, 0.16)',
                },
              },
            }}
          />

          {/* Apply Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleClose();
              onSubmit();
            }}
            sx={{
              alignSelf: 'center',
              marginTop: '8px',
              borderRadius: '8px',
              textTransform: 'none',
              padding: '8px 24px',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Застосувати
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default RangeFilterDropdown;