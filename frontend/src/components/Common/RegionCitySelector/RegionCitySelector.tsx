'use client';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from '@mui/joy';
import { ArrowBack, Clear, LocationOn, Search } from '@mui/icons-material';
import { useRegionCitySelector } from './RegionCitySelector.logic';

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
  dropdownWidth?: string | number;
}

const groupRegionsByLetter = (regions: Region[]) => {
  return regions.reduce(
    (acc, region) => {
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
    },
    {} as Record<string, { name: string; isFirstAdded: boolean }[]>,
  );
};

const groupCitiesByLetter = (cities: string[]) => {
  return cities.reduce(
    (acc, city) => {
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
    },
    {} as Record<string, { name: string; isFirstAdded: boolean }[]>,
  );
};

const RegionCitySelector = ({
  regions,
  minWidth = '300px',
  maxWidth = '400px',
  height = '50px',
  border,
  backgroundColor,
  open = false,
  disabled = false,
  selectedRegion,
  onHandleRegionSelect,
  dropdownWidth = '700px',
}: RegionCitySelectorProps) => {
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
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<LocationOn />}
        endDecorator={
          selected && !disabled ? (
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
                setIsOpen(false);
              }}
            >
              <Clear fontSize="small" />
            </IconButton>
          ) : null
        }
        sx={{
          minWidth,
          maxWidth,
          height,
          justifyContent: 'space-between',
          borderRadius: 'md',
          px: 1.5,
          py: 1,
          backgroundColor: backgroundColor || 'background.surface',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          border: border || '1px solid',
          borderColor: 'divider',
          '&:hover': {
            backgroundColor: disabled ? backgroundColor || 'background.surface' : 'background.level1',
          },
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Typography
          level="body-md"
          sx={{
            flex: 1,
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selected || 'Виберіть регіон або місто'}
        </Typography>
      </Button>
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
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<LocationOn />}
        endDecorator={
          selected && !disabled ? (
            <IconButton variant="plain" color="neutral" size="sm" onClick={clearSelection}>
              <Clear fontSize="small" />
            </IconButton>
          ) : null
        }
        sx={{
          minWidth,
          maxWidth,
          height,
          justifyContent: 'space-between',
          borderRadius: 'md',
          px: 1.5,
          py: 1,
          backgroundColor: backgroundColor || 'background.surface',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          border: border || '1px solid',
          borderColor: 'primary.500',
          '&:hover': {
            backgroundColor: disabled ? backgroundColor || 'background.surface' : 'background.level1',
          },
        }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <Typography
          level="body-md"
          sx={{
            flex: 1,
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {selected || 'Виберіть регіон або місто'}
        </Typography>
      </Button>

      {isOpen && (
        <Card
          variant="outlined"
          sx={{
            position: 'absolute',
            top: '100%',
            right: 0,
            zIndex: 10,
            mt: 1,
            p: 2,
            maxHeight: 400,
            overflowY: 'auto',
            width: dropdownWidth,
            boxShadow: 'md',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {currentRegion ? (
              <IconButton
                onClick={handleBack}
                variant="soft"
                color="primary"
                size="sm"
                sx={{ mr: 1 }}
                disabled={disabled}
              >
                <ArrowBack />
              </IconButton>
            ) : (
              <LocationOn color="primary" sx={{ mr: 1 }} />
            )}
            <Typography level="title-md">{currentRegion || 'Шукати оголошення по всій країні'}</Typography>
          </Box>

          <Input
            fullWidth
            placeholder="Введіть перші літери..."
            value={search}
            onChange={handleSearchChange}
            startDecorator={<Search />}
            size="md"
            variant="outlined"
            disabled={disabled}
            sx={{ mb: 2 }}
          />

          {!currentRegion && Object.keys(groupedRegions).length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography level="body-lg" color="neutral">
                Нічого не знайдено
              </Typography>
            </Box>
          )}

          {currentRegion && Object.keys(groupedCities).length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography level="body-lg" color="neutral">
                Нічого не знайдено
              </Typography>
            </Box>
          )}

          <Grid container spacing={1}>
            {!currentRegion &&
              Object.entries(groupedRegions).map(([letter, regions]) => (
                <Grid xs={12} sm={6} md={4} key={letter}>
                  <Sheet
                    variant="soft"
                    color="primary"
                    sx={{
                      p: 0.5,
                      mb: 1,
                      borderRadius: 'md',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography level="title-sm">{letter}</Typography>
                  </Sheet>
                  <List size="sm" sx={{ py: 0 }}>
                    {regions.map((region) => (
                      <ListItem key={region.name} sx={{ py: 0 }}>
                        <ListItemButton
                          onClick={() => !disabled && handleRegionSelect(region.name)}
                          sx={{
                            py: 0.5,
                            borderRadius: 'md',
                          }}
                          disabled={disabled}
                        >
                          <ListItemContent>
                            <Typography level="body-sm">{region.name}</Typography>
                          </ListItemContent>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}

            {currentRegion &&
              Object.entries(groupedCities).map(([letter, cityNames]) => (
                <Grid xs={12} sm={6} md={4} key={letter}>
                  <Sheet
                    variant="soft"
                    color="primary"
                    sx={{
                      p: 0.5,
                      mb: 1,
                      borderRadius: 'md',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography level="title-sm">{letter}</Typography>
                  </Sheet>
                  <List size="sm" sx={{ py: 0 }}>
                    {cityNames.map((city) => (
                      <ListItem key={city.name} sx={{ py: 0 }}>
                        <ListItemButton
                          selected={selected === city.name}
                          onClick={() => !disabled && handleCitySelect(city.name)}
                          sx={{
                            py: 0.5,
                            borderRadius: 'md',
                          }}
                          disabled={disabled}
                        >
                          <ListItemContent>
                            <Typography level="body-sm">{city.name}</Typography>
                          </ListItemContent>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
          </Grid>
        </Card>
      )}
    </Box>
  );
};

export default RegionCitySelector;

