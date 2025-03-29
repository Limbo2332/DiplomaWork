'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import useCategoriesService from '../../../Services/categoriesService';

interface UseCategoryDropdownProps {
  initialSelectedOptions: string[];
  onOptionsSelected: (options: string[]) => void;
}

export const useCategoryDropdown = ({ initialSelectedOptions, onOptionsSelected }: UseCategoryDropdownProps) => {
  const { getCategories } = useCategoriesService();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      const result = await getCategories();

      if (result.data) {
        setOptions(result.data);
      }

      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(initialSelectedOptions);

  useEffect(() => {
    if (selectedOptions.length !== 0 && selectedOptions.every(option => !!option)) {
      return;
    }

    setSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions]);

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

    setSelectedOptions([option]);
    onOptionsSelected([option]);
  };

  const handleToggle = (option: string) => {
    const optionsToSet = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];

    onOptionsSelected(optionsToSet);

    setSelectedOptions(optionsToSet);
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
    isLoading,
  };
};

