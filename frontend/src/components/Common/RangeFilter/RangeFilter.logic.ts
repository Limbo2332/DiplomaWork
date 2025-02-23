import React, { useEffect, useState } from 'react';

export interface UseRangeFilterLogicProps {
  min: number;
  max: number;
}

const useRangeFilterLogic = ({
  min,
  max,
}: UseRangeFilterLogicProps) => {
  const [range, setRange] = useState([min, max]);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  useEffect(() => {
    setRange([min, max]);
  }, [min, max]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  const handleInputChange = (index: number, value: string) => {
    const newRange = [...range];
    const numValue = Number(value);

    if (index === 0) {
      newRange[0] = Math.min(numValue, range[1]);
    } else {
      newRange[1] = Math.max(numValue, range[0]);
    }

    newRange[0] = Math.max(newRange[0], min);
    newRange[1] = Math.min(newRange[1], max);

    setRange(newRange);
  };

  return {
    handleOpen,
    handleClose,
    handleSliderChange,
    handleInputChange,
    range,
    anchorEl,
  };
};

export default useRangeFilterLogic;