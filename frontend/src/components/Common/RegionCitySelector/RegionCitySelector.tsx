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
import ClearIcon from '@mui/icons-material/Clear';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
  open?: boolean;
}

const RegionCitySelector: React.FC<RegionCitySelectorProps> = ({
  regions,
  open = false,
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
  });

  if (!isOpen) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          minWidth: 300,
          maxWidth: 400,
          height: 50,
          mx: 'auto',
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <LocationOnIcon color="primary" />
          <Typography variant="body1" sx={{ flex: 1 }}>
            {selected || 'Виберіть регіон або місто'}
          </Typography>
        </Box>
        {selected && (
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
        maxWidth: 800,
        mx: 'auto',
      }}
    >
      {/* Заголовок для вибору */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px 12px',
          height: 50,
          backgroundColor: '#fff',
          cursor: 'pointer',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={() => setIsOpen(!isOpen)}>
          <LocationOnIcon color="primary" />
          <Typography variant="body1">
            {selected || 'Виберіть регіон або місто'}
          </Typography>
        </Box>
        {selected && (
          <IconButton size="small" onClick={clearSelection}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
      {/* Випадаючий список */}
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
          />
          <Grid container spacing={2} sx={{
            marginTop: '10px',
          }}>
            {/* Регіони */}
            {!currentRegion &&
              filteredRegions.map((region) => (
                <Grid item xs={6} md={4} key={region.name}>
                  <div className="d-flex justify-content-center align-items-center">
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        color: 'text.secondary',
                      }}
                    >
                      {region.name[0]}
                    </Typography>
                  </div>
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
                </Grid>
              ))}
            {/* Міста */}
            {currentRegion &&
              filteredCities?.map((cityGroup) => (
                <Grid item xs={6} md={4} key={cityGroup.letter}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                    }}
                  >
                    {cityGroup.letter}
                  </Typography>
                  <List dense>
                    {cityGroup.names.map((city) => (
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
                </Grid>
              ))}
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default RegionCitySelector;
