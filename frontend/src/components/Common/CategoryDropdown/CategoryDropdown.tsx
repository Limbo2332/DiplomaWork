'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Chip,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowDropDown, ArrowDropUp, Check, Close, Search } from '@mui/icons-material';
import { useCategoryDropdown } from './CategoryDropdown.logic.ts';

interface CategoryDropdownProps {
  multiSelect?: boolean;
  initialSelectedOptions: string[];
  onOptionsSelected: (options: string[]) => void;
  maxWidth?: string;
}

export default function CategoryDropdown({
  multiSelect = false,
  initialSelectedOptions,
  onOptionsSelected,
  maxWidth = '100%',
}: CategoryDropdownProps) {
  const {
    options,
    open,
    openDropdown,
    closeDropdown,
    selectCategory,
    anchorEl,
    selectedOptions,
    handleToggle,
    isLoading,
  } = useCategoryDropdown({
    initialSelectedOptions,
    onOptionsSelected,
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSelect = (option: string) => {
    if (multiSelect) {
      handleToggle(option);
    } else {
      selectCategory(option);
    }
  };

  const handleRemoveChip = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    handleToggle(option);
  };

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={{ width: '100%', maxWidth: maxWidth }}>
      <Button
        variant="outlined"
        onClick={openDropdown}
        disabled={isLoading}
        endIcon={open ? <ArrowDropUp /> : <ArrowDropDown />}
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          minHeight: '50px',
          textTransform: 'none',
          padding: '8px 12px',
          textAlign: 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.5,
            maxWidth: 'calc(100% - 30px)',
            overflow: 'hidden',
          }}
        >
          {selectedOptions.length > 0 ? (
            multiSelect ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, maxWidth: '100%' }}>
                {selectedOptions.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    size="small"
                    onDelete={(event) => handleRemoveChip(option, event)}
                    deleteIcon={<Close fontSize="small" />}
                    sx={{
                      maxWidth: 150,
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                Обрана категорія: {selectedOptions[0]}
              </Typography>
            )
          ) : (
            <Typography color="text.secondary">Категорія</Typography>
          )}
        </Box>
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={closeDropdown}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: maxWidth === '100%' ? '800px' : maxWidth,
            maxHeight: 300,
          },
        }}
      >
        <Paper elevation={0}>
          <TextField
            autoFocus
            placeholder="Пошук категорії..."
            fullWidth
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ m: 1, width: 'calc(100% - 16px)' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <List sx={{ pt: 0, pb: 0 }}>
            {filteredOptions.length === 0 ? (
              <ListItem>
                <ListItemText primary="No category found" />
              </ListItem>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedOptions.includes(option);
                return (
                  <ListItemButton key={option} onClick={() => handleSelect(option)} selected={isSelected}>
                    <ListItemIcon sx={{ minWidth: 36 }}>{isSelected && <Check fontSize="small" />}</ListItemIcon>
                    <ListItemText
                      primary={option}
                      primaryTypographyProps={{
                        style: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        },
                      }}
                    />
                  </ListItemButton>
                );
              })
            )}
          </List>
        </Paper>
      </Popover>
    </div>
  );
}

