import React, { useEffect, useRef, useState } from 'react';
import { Region } from './RegionCitySelector.tsx';

interface UseRegionCitySelectorProps {
  open: boolean;
  regions: Region[];
}

export const useRegionCitySelector = ({
  open,
  regions,
}: UseRegionCitySelectorProps) => {
  const [isOpen, setIsOpen] = useState(open); // Локальний стан відкриття
  const [currentRegion, setCurrentRegion] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleRegionSelect = (regionName: string) => {
    setCurrentRegion(regionName);
    setSearch('');
  };

  const handleCitySelect = (cityName: string) => {
    setSelected(cityName);
    setIsOpen(false); // Закриваємо компонент після вибору міста
  };

  const handleBack = () => {
    setCurrentRegion(null);
    setSearch('');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Закриваємо компонент при кліку поза ним
    }
  };

  const filteredRegions = regions.filter((region) =>
    region.name.toLowerCase().includes(search),
  );

  const filteredCities = currentRegion
    ? regions
      .find((region) => region.name === currentRegion)?.cities
      .filter((cityGroup) =>
        cityGroup.names.some((city) =>
          city.toLowerCase().includes(search),
        ),
      )
    : [];

  const clearSelection = () => {
    setSelected(null);
    setCurrentRegion(null);
  };

  return {
    containerRef,
    currentRegion,
    search,
    isOpen,
    handleSearchChange,
    handleRegionSelect,
    handleCitySelect,
    handleBack,
    handleClickOutside,
    filteredRegions,
    filteredCities,
    selected,
    clearSelection,
    setIsOpen,
  };
};