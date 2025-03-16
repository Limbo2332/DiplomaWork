import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { AddToFavoritesRequest } from '../../../Types/Businesses/Requests/addToFavoritesRequest.ts';
import useBusinessService from '../../../Services/businessesService.ts';

interface StarButtonProps {
  postId: string;
  defaultValue: boolean;
}

const StarButton = ({
  postId,
  defaultValue,
}: StarButtonProps) => {
  const [isFavorited, setIsFavorited] = useState(defaultValue);

  const { addToFavoriteBusiness } = useBusinessService();

  const handleClick = async () => {
    const request: AddToFavoritesRequest = {
      postId: postId,
      value: !isFavorited,
    };

    await addToFavoriteBusiness(request);

    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    setIsFavorited(defaultValue);
  }, [defaultValue]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
      }}
    >
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
