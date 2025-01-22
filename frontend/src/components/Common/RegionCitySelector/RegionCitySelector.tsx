import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRegionCitySelector } from './RegionCitySelector.logic.ts';

export interface RegionData {
  letter: string;
  names: string[];
}

export interface Region {
  name: string;
  cities: RegionData[];
}

interface RegionCitySelectorProps {
  regions: Region[];
  open?: boolean; // Ініціалізація відкритого стану
}

const RegionCitySelector: React.FC<RegionCitySelectorProps> = ({
  regions,
  open = false, // Значення за замовчуванням
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
  } = useRegionCitySelector({
    open,
    regions,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        p: 2,
        maxWidth: 400,
        mx: 'auto',
        position: 'relative',
        zIndex: 10, // Щоб компонент був поверх інших елементів
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {currentRegion && (
          <IconButton
            onClick={handleBack}
            size="small"
            sx={{ mr: 1, color: 'primary.main' }}
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
        sx={{ mb: 1 }}
      />
      <Paper
        elevation={1}
        sx={{
          p: 1,
          maxHeight: 300, // Обмеження висоти
          overflowY: 'auto', // Скрол при перевищенні висоти
        }}
      >
        <Grid container spacing={1}>
          {!currentRegion &&
            filteredRegions.map((region) => (
              <Grid item xs={12} key={region.name}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                      mt: 1,
                    }}
                  >
                    {region.name[0]}
                  </Typography>
                  <List dense>
                    <ListItemButton
                      onClick={() => handleRegionSelect(region.name)}
                      sx={{ py: 0.5 }}
                    >
                      <ListItemText
                        primary={region.name}
                        primaryTypographyProps={{ fontSize: '0.9rem' }}
                      />
                    </ListItemButton>
                  </List>
                </Box>
              </Grid>
            ))}
          {currentRegion &&
            filteredCities?.map((cityGroup) => (
              <Grid item xs={12} key={cityGroup.letter}>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                      mt: 1,
                    }}
                  >
                    {cityGroup.letter}
                  </Typography>
                  <List dense>
                    {cityGroup.names
                      .filter((city) => city.toLowerCase().includes(search))
                      .map((city) => (
                        <ListItem disablePadding key={city}>
                          <ListItemButton
                            selected={selected === city}
                            onClick={() => handleCitySelect(city)}
                            sx={{ py: 0.5 }}
                          >
                            <ListItemText
                              primary={city}
                              primaryTypographyProps={{ fontSize: '0.9rem' }}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                  </List>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default RegionCitySelector;
