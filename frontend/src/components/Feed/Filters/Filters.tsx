'use client';

import React, { useCallback, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Stack, Typography } from '@mui/joy';
import {
  AddCircle,
  Apartment,
  Bookmark,
  BusinessCenter,
  EvStation,
  ExpandLess,
  ExpandMore,
  FilterAlt,
  Handshake,
  HomeRepairService,
  LocalShipping,
  MonetizationOn,
  Receipt,
  RestartAlt,
  SupervisorAccount,
  SupportAgent,
  Timer,
  VisibilityOff,
} from '@mui/icons-material';
import type { FilterDto } from '../../../Types/Businesses/filterDto';
import { defaultFilterDtoValues } from '../../../Pages/MainFeed/MainFeed';
import CurrencyRangeFilterControl from '../../Common/CurrencyRangeFilter/CurrencyRangeFilter';
import RangeFilterControl from '../../Common/RangeFilter/RangeFilter';
import CheckboxFilterControl from '../../Common/CheckboxFilter/CheckboxFilter';

interface FiltersProps {
  filter: FilterDto;
  setFilter: (filterDto: FilterDto) => void;
}

const Filters = ({ filter, setFilter }: FiltersProps) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleResetFilters = useCallback(() => {
    setFilter(defaultFilterDtoValues);
  }, [setFilter]);

  return (
    <Card
      variant="outlined"
      sx={{
        mt: 2,
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: filtersExpanded ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterAlt sx={{ mr: 1, color: 'primary.500' }} />
          <Typography level="title-md">Фільтри</Typography>
        </Box>
        <IconButton variant="plain" color="neutral" onClick={() => setFiltersExpanded(!filtersExpanded)}>
          {filtersExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {filtersExpanded && (
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <CurrencyRangeFilterControl
                  label="Ціна"
                  min={0}
                  max={10000000}
                  step={1000}
                  value={[filter.priceStart, filter.priceEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      priceStart: newValue[0],
                      priceEnd: newValue[1],
                    })
                  }
                  currency={filter.priceCurrency}
                  onCurrencyChange={(currency) =>
                    setFilter({
                      ...filter,
                      priceCurrency: currency,
                    })
                  }
                />

                <RangeFilterControl
                  label="Площа приміщення"
                  icon={<Apartment />}
                  min={0}
                  max={5000000}
                  step={5}
                  value={[filter.flatSquareStart, filter.flatSquareEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      flatSquareStart: newValue[0],
                      flatSquareEnd: newValue[1],
                    })
                  }
                  unit="м²"
                />

                <RangeFilterControl
                  label="Кількість працівників"
                  icon={<SupervisorAccount />}
                  min={1}
                  max={1000}
                  step={1}
                  value={[filter.amountOfWorkersStart, filter.amountOfWorkersEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      amountOfWorkersStart: newValue[0],
                      amountOfWorkersEnd: newValue[1],
                    })
                  }
                />
              </Stack>
            </Grid>

            {/* Financial Filters */}
            <Grid xs={12} md={4}>
              <Stack spacing={3}>
                <RangeFilterControl
                  label="Середній чек"
                  icon={<Receipt />}
                  min={0}
                  max={15000000}
                  step={1}
                  value={[filter.averageChequeStart, filter.averageChequeEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      averageChequeStart: newValue[0],
                      averageChequeEnd: newValue[1],
                    })
                  }
                  unit="грн"
                />

                <RangeFilterControl
                  label="Середній виторг на місяць"
                  icon={<MonetizationOn />}
                  min={1}
                  max={10000000}
                  step={10000}
                  value={[filter.averageIncomeStart, filter.averageIncomeEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      averageIncomeStart: newValue[0],
                      averageIncomeEnd: newValue[1],
                    })
                  }
                  unit="грн"
                />

                <RangeFilterControl
                  label="Середній чистий прибуток на місяць"
                  icon={<AddCircle />}
                  min={1}
                  max={10000000}
                  step={5000}
                  value={[filter.averageProfitStart, filter.averageProfitEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      averageProfitStart: newValue[0],
                      averageProfitEnd: newValue[1],
                    })
                  }
                  unit="грн"
                />

                <RangeFilterControl
                  label="Час окупності бізнесу"
                  icon={<Timer />}
                  min={1}
                  max={1200}
                  step={1}
                  value={[filter.timeToPaybackStart, filter.timeToPaybackEnd]}
                  onChange={(newValue) =>
                    setFilter({
                      ...filter,
                      timeToPaybackStart: newValue[0],
                      timeToPaybackEnd: newValue[1],
                    })
                  }
                  unit="місяців"
                />
              </Stack>
            </Grid>

            {/* Checkbox Filters */}
            <Grid xs={12} md={4}>
              <Card variant="soft" sx={{ p: 2 }}>
                <Typography level="title-sm" sx={{ mb: 1 }}>
                  Характеристики бізнесу
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Stack spacing={1}>
                  <CheckboxFilterControl
                    label="З обладнанням"
                    icon={<HomeRepairService />}
                    checked={filter.hasEquipment}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasEquipment: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="З генератором чи EcoFlow"
                    icon={<EvStation />}
                    checked={filter.hasGeneratorOrEcoFlow}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasGeneratorOrEcoFlow: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="Торг"
                    icon={<Handshake />}
                    checked={filter.hasBargain}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasBargain: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="Підтримка від власника"
                    icon={<SupportAgent />}
                    checked={filter.hasSupportFromOwner}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasSupportFromOwner: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="ФОП"
                    icon={<BusinessCenter />}
                    checked={filter.hasPhop}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasPhop: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="Інтеграція з сервісами доставки"
                    icon={<LocalShipping />}
                    checked={filter.hasIntegrationWithDeliveryServices}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hasIntegrationWithDeliveryServices: checked,
                      })
                    }
                  />

                  <Divider sx={{ my: 1 }} />
                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    Налаштування відображення
                  </Typography>

                  <CheckboxFilterControl
                    label="Лише збережені"
                    icon={<Bookmark />}
                    checked={filter.onlySaved}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        onlySaved: checked,
                      })
                    }
                  />

                  <CheckboxFilterControl
                    label="Сховати переглянуті"
                    icon={<VisibilityOff />}
                    checked={filter.hideViewed}
                    onChange={(checked) =>
                      setFilter({
                        ...filter,
                        hideViewed: checked,
                      })
                    }
                  />
                </Stack>
              </Card>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              color="neutral"
              startDecorator={<RestartAlt />}
              onClick={handleResetFilters}
              size="lg"
              sx={{ borderRadius: 'full', px: 4 }}
            >
              Скинути фільтри
            </Button>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default Filters;

