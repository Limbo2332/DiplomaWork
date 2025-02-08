import React, { useState } from 'react';
import { Box, Button, Collapse, Grid, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import RangeFilter from '../../Common/RangeFilter/RangeFilter.tsx';
import CurrencyRangeFilter from '../../Common/CurrencyRangeFilter/CurrencyRangeFilter.tsx';
import SingleCheckboxFilter from '../../Common/CheckboxFilter/CheckboxFilter.tsx';

const Filters = () => {
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const handleResetFilters = () => {
    // Логіка для скидання фільтрів
  };

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
                <CurrencyRangeFilter label="Ціна" min={1} max={15000} step={100} onSubmit={() => null} />
                <RangeFilter
                  label="Площа приміщення"
                  min={5}
                  max={1000}
                  step={5}
                  onSubmit={() => null}
                  elementPreview={<span className="mx-1">м<sup>2</sup></span>}
                  element={<Typography variant="body2" color="textSecondary"
                    className="d-flex align-items-center">м<sup>2</sup></Typography>}
                />
                <RangeFilter
                  label="Кількість працівників"
                  min={1}
                  max={1000}
                  step={1}
                  onSubmit={() => null}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={5}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <CurrencyRangeFilter label="Середній чек" min={1} max={15000} step={100} onSubmit={() => null} />
                <CurrencyRangeFilter label="Середній виторг на місяць" min={1} max={200000} step={100}
                  onSubmit={() => null} />
                <CurrencyRangeFilter label="Середній чистий прибуток на місяць" min={1} max={200000} step={100}
                  onSubmit={() => null} />
                <RangeFilter
                  label="Час окупності бізнесу"
                  min={1}
                  max={600}
                  step={1}
                  onSubmit={() => null}
                  elementPreview={<span className="mx-1">місяців</span>}
                  element={<Typography variant="body2" color="textSecondary"
                    className="d-flex align-items-center">місяців</Typography>}
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <SingleCheckboxFilter label="З обладнанням" onChange={() => null} />
                <SingleCheckboxFilter label="З генератором чи EcoFlow" onChange={() => null} />
                <SingleCheckboxFilter label="Торг" onChange={() => null} />
                <SingleCheckboxFilter label="Підтримка від власника" onChange={() => null} />
                <SingleCheckboxFilter label="ФОП" onChange={() => null} />
                <SingleCheckboxFilter label="Інтеграція з сервісами доставки" onChange={() => null} />
                <SingleCheckboxFilter label="Лише збережені" onChange={() => null} />
                <SingleCheckboxFilter label="Сховати переглянуті" onChange={() => null} />
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