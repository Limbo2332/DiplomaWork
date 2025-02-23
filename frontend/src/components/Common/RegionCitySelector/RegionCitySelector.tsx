import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRegionCitySelector } from './RegionCitySelector.logic.ts';
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export interface Region {
  name: string;
  cities: string[];
}

interface RegionCitySelectorProps {
  regions: Region[];
  open?: boolean;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  border?: string;
  backgroundColor?: string;
  disabled?: boolean;
  selectedRegion?: string;
  onHandleRegionSelect: (region: string) => void;
}

const groupRegionsByLetter = (regions: Region[]) => {
  return regions.reduce((acc, region) => {
    const firstLetter = region.name[0].toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    const isFirstAdded = acc[firstLetter].length === 0;

    acc[firstLetter].push({
      name: region.name,
      isFirstAdded,
    });

    return acc;
  }, {} as Record<string, { name: string; isFirstAdded: boolean }[]>);
};

const groupCitiesByLetter = (cities: string[]) => {
  return cities.reduce((acc, city) => {
    const firstLetter = city[0].toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }

    const isFirstAdded = acc[firstLetter].length === 0;

    acc[firstLetter].push({
      name: city,
      isFirstAdded,
    });

    return acc;
  }, {} as Record<string, { name: string; isFirstAdded: boolean }[]>);
};

const RegionCitySelector: React.FC<RegionCitySelectorProps> = ({
  regions,
  minWidth = '300px',
  maxWidth = '400px',
  height = '50px',
  border = '1px solid #ccc',
  backgroundColor = '#fff',
  open = false,
  disabled = false,
  selectedRegion,
  onHandleRegionSelect,
}) => {
  const {
    containerRef,
    currentRegion,
    handleBack,
    search,
    isOpen,
    handleSearchChange,
    filteredRegions,
    filteredCities,
    selected,
    handleCitySelect,
    handleRegionSelect,
    clearSelection,
    setIsOpen,
  } = useRegionCitySelector({
    open,
    regions,
    selectedRegion,
    onHandleRegionSelect,
  });

  const groupedRegions = groupRegionsByLetter(filteredRegions);
  const groupedCities = groupCitiesByLetter(filteredCities ?? []);

  if (!isOpen) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: border,
          borderRadius: '4px',
          padding: '8px 12px',
          minWidth: minWidth,
          maxWidth: maxWidth,
          height: height,
          mx: 'auto',
          backgroundColor: backgroundColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="body1" sx={{ flex: 1 }}>
            {selected || 'Виберіть регіон або місто'}
          </Typography>
        </Box>
        {selected && !disabled && (
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              clearSelection();
              setIsOpen(false);
            }}
          >
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        minWidth: 300,
        maxWidth: !maxWidth ? 800 : '100%',
        mx: '0',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: border,
          borderRadius: '4px',
          padding: '8px 12px',
          minWidth: minWidth,
          maxWidth: maxWidth,
          height: height,
          backgroundColor: backgroundColor,
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <LocationOnIcon color="primary" />
          <Typography variant="body1">
            {selected || 'Виберіть регіон або місто'}
          </Typography>
        </Box>
        {selected && !disabled && (
          <IconButton size="small" onClick={clearSelection}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>

      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 10,
            mt: 1,
            p: 2,
            maxHeight: 300,
            overflowY: 'auto',
            backgroundColor: '#fff',
            width: 700,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            {currentRegion && (
              <IconButton
                onClick={handleBack}
                size="small"
                sx={{ mr: 1, color: 'primary.main' }}
                disabled={disabled}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            )}
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {currentRegion || 'Шукати оголошення по всій країні'}
            </Typography>
          </Box>
          <TextField
            fullWidth
            placeholder="Введіть перші літери..."
            value={search}
            onChange={handleSearchChange}
            size="small"
            variant="outlined"
            disabled={disabled}
          />

          <Grid container sx={{ marginTop: '5px' }}>
            {!currentRegion &&
              Object.entries(groupedRegions).map(([letter, regions]) => (
                <Grid item xs={6} md={4} key={letter}>
                  <List dense sx={{
                    paddingTop: '4px',
                    paddingBottom: 0,
                  }}>
                    {regions.map((region) => (
                      <div key={region.name} className="d-flex justify-content-center align-items-center">
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            color: 'text.secondary',
                            minWidth: 10,
                          }}
                        >
                          {region.isFirstAdded ? letter : ' '}
                        </Typography>
                        <ListItemButton
                          onClick={() => !disabled && handleRegionSelect(region.name)}
                          sx={{
                            py: 0.5, '&:hover': {
                              backgroundColor: 'transparent',
                              color: 'inherit',
                            },
                          }}
                          disabled={disabled}
                        >
                          <ListItemText
                            primary={region.name}
                            primaryTypographyProps={{ fontSize: '0.8rem' }}
                          />
                        </ListItemButton>
                      </div>
                    ))}
                  </List>
                </Grid>
              ))}

            {currentRegion &&
              Object.entries(groupedCities).map(([letter, cityNames]) => (
                <Grid item xs={6} md={4} key={letter}>
                  <List dense>
                    {cityNames.map((city) => (
                      <div key={city.name} className="d-flex justify-content-center align-items-center">
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            color: 'text.secondary',
                            minWidth: 10,
                          }}
                        >
                          {city.isFirstAdded ? letter : ' '}
                        </Typography>
                        <ListItemButton
                          selected={selected === city.name}
                          onClick={() => !disabled && handleCitySelect(city.name)}
                          sx={{
                            py: 0.5, '&:hover': {
                              backgroundColor: 'transparent',
                              color: 'inherit',
                            },
                          }}
                          disabled={disabled}
                        >
                          <ListItemText
                            primary={city.name}
                            primaryTypographyProps={{ fontSize: '0.8rem' }}
                          />
                        </ListItemButton>
                      </div>
                    ))}
                  </List>
                </Grid>
              ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default RegionCitySelector;
