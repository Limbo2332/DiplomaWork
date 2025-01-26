import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const StarButton = () => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
      {/* Кнопка із зіркою */}
      <Tooltip
        title={isFavorited ? 'Видалити з обраного' : 'Підписатися'}
        arrow
      >
        <IconButton onClick={handleClick}>
          {isFavorited ? (
            <StarIcon sx={{ color: '#fbc02d', fontSize: '36px' }} />
          ) : (
            <StarBorderIcon sx={{ fontSize: '36px' }} />
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default StarButton;
