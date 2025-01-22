import React, { useState } from 'react';

export const useCategoryDropdown = () => {
  const [options, setOptions] = useState<string[]>([
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство',
    'Компанія',
    'Сільське господарство Сільське господарство Сільське господарство',
    'Компанія',
  ]);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const openDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const selectCategory = (option: string) => {
    setOpen(false);
    setAnchorEl(null);
  };

  const handleToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  return {
    options,
    open,
    openDropdown,
    closeDropdown,
    selectCategory,
    anchorEl,
    selectedOptions,
    handleToggle,
  };
};