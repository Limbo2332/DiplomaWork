import React, { useCallback, useState } from 'react';
import { Box, Button, Collapse, Grid, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RangeFilter from '../../Common/RangeFilter/RangeFilter.tsx';
import CurrencyRangeFilter from '../../Common/CurrencyRangeFilter/CurrencyRangeFilter.tsx';
import SingleCheckboxFilter from '../../Common/CheckboxFilter/CheckboxFilter.tsx';
import HryvniaRangeFilter from '../../Common/HryvnyaRangeFilter/HryvnyaRangeFilter.tsx';
import { FilterDto } from '../../../Types/Businesses/filterDto.ts';
import { defaultFilterDtoValues } from '../../../Pages/MainFeed/MainFeed.tsx';
import { Currency } from '../../Common/CurrencyDropdown/CurrencyDropdown.tsx';

interface FiltersProps {
  filter: FilterDto;
  setFilter: (filterDto: FilterDto) => void;
}

const Filters = ({
  filter,
  setFilter,
}: FiltersProps) => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleResetFilters = useCallback(() => {
    setFilter(defaultFilterDtoValues);
  }, [setFilter]);

  return (
    <Box sx={{
      border: '2px solid #b3d4fc',
      borderRadius: 1,
      padding: 2,
      marginTop: 1,
    }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: filtersExpanded ? 2 : 0,
        }}
      >
        <Typography variant="h6">Фільтри</Typography>
        <IconButton onClick={() => setFiltersExpanded(!filtersExpanded)}>
          {filtersExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
      <Collapse in={filtersExpanded}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3.6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CurrencyRangeFilter label="Ціна"
                  min={filter.priceStart}
                  max={filter.priceEnd}
                  step={1000}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    priceStart: minValue,
                    priceEnd: maxValue,
                  })}
                  onCurrencyChange={(currency: Currency) => {
                    setFilter({
                      ...filter,
                      priceCurrency: currency,
                    });
                  }}
                />
                <RangeFilter
                  label="Площа приміщення"
                  min={filter.flatSquareStart}
                  max={filter.flatSquareEnd}
                  step={5}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    flatSquareStart: minValue,
                    flatSquareEnd: maxValue,
                  })}
                  elementPreview={<span className="mx-1">м<sup>2</sup></span>}
                  element={<Typography variant="body2" color="textSecondary"
                    className="d-flex align-items-center">м<sup>2</sup></Typography>}
                />
                <RangeFilter
                  label="Кількість працівників"
                  min={filter.amountOfWorkersStart}
                  max={filter.amountOfWorkersEnd}
                  step={1}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    amountOfWorkersStart: minValue,
                    amountOfWorkersEnd: maxValue,
                  })}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <HryvniaRangeFilter label="Середній чек"
                  min={filter.averageChequeStart}
                  max={filter.averageChequeEnd}
                  step={100}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    averageChequeStart: minValue,
                    averageChequeEnd: maxValue,
                  })}
                />

                <HryvniaRangeFilter label="Середній виторг на місяць"
                  min={filter.averageIncomeStart}
                  max={filter.averageIncomeEnd}
                  step={100}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    averageIncomeStart: minValue,
                    averageIncomeEnd: maxValue,
                  })}
                />

                <HryvniaRangeFilter label="Середній чистий прибуток на місяць"
                  min={filter.averageProfitStart}
                  max={filter.averageProfitEnd}
                  step={100}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    averageProfitStart: minValue,
                    averageProfitEnd: maxValue,
                  })}
                />
                <RangeFilter
                  label="Час окупності бізнесу"
                  min={filter.timeToPaybackStart}
                  max={filter.timeToPaybackEnd}
                  step={1}
                  onSubmit={(minValue, maxValue) => setFilter({
                    ...filter,
                    timeToPaybackStart: minValue,
                    timeToPaybackEnd: maxValue,
                  })}
                  elementPreview={<span className="mx-1">місяців</span>}
                  element={<Typography variant="body2" color="textSecondary"
                    className="d-flex align-items-center">місяців</Typography>}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <SingleCheckboxFilter label="З обладнанням"
                  checked={filter.hasEquipment}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasEquipment: changedValue,
                  })}
                />

                <SingleCheckboxFilter label="З генератором чи EcoFlow"
                  checked={filter.hasGeneratorOrEcoFlow}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasGeneratorOrEcoFlow: changedValue,
                  })}
                />

                <SingleCheckboxFilter
                  label="Торг"
                  checked={filter.hasBargain}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasBargain: changedValue,
                  })}
                />

                <SingleCheckboxFilter
                  label="Підтримка від власника"
                  checked={filter.hasSupportFromOwner}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasSupportFromOwner: changedValue,
                  })}
                />

                <SingleCheckboxFilter label="ФОП"
                  checked={filter.hasPhop}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasPhop: changedValue,
                  })}
                />

                <SingleCheckboxFilter label="Інтеграція з сервісами доставки"
                  checked={filter.hasIntegrationWithDeliveryServices}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hasIntegrationWithDeliveryServices: changedValue,
                  })}
                />

                <SingleCheckboxFilter label="Лише збережені"
                  checked={filter.onlySaved}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    onlySaved: changedValue,
                  })}
                />

                <SingleCheckboxFilter label="Сховати переглянуті"
                  checked={filter.hideViewed}
                  onChange={(changedValue) => setFilter({
                    ...filter,
                    hideViewed: changedValue,
                  })}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
            <Button variant="contained" onClick={handleResetFilters}>
              Скинути фільтри
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Filters;