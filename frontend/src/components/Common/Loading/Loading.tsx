import { CircularProgress } from '@mui/material';
import React from 'react';

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <CircularProgress />
    </div>
  );
};