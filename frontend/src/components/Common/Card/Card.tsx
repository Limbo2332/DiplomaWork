import { Typography } from '@mui/material';

import './Card.scss';

import defaultImage from '../../../assets/images/default-image.png';
import { AccessTime, Apartment, Badge, MonetizationOn, PriceChange, Receipt } from '@mui/icons-material';
import StarButton from '../Bookmark/StarButton.tsx';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../Contexts/authContext.tsx';

const Card = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const onCardClick = () => {
    if (isAdmin) {
      navigate('/createoreditbusiness/1');
      return;
    }

    navigate('/business/1');
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="business-card">
        <img className="business-card-image" src={defaultImage} alt="Фото оголошення"
          onClick={onCardClick} />
        <div className="business-card-rows">
          <div className="business-card-row">
            <Typography variant="h4">Назва готового бізнесу</Typography>
            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
              <p className="business-card-price">250 000 грн.</p>
            </div>
          </div>
          <div className="business-card-row">
            <Typography variant="subtitle2" sx={{
              color: 'text.secondary',
            }}>Категорія</Typography>
          </div>
          <div className="business-card-grid">
            <div className="business-card-row justify-content-start gap-1">
              <AccessTime className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Термін окупності:</Typography>
                <Typography variant="body1" className="fw-bold">24 місяців</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Receipt className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Середній чек: </Typography>
                <Typography variant="body1" className="fw-bold">800 грн.</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <MonetizationOn className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Середній дохід на місяць: </Typography>
                <Typography variant="body1" className="fw-bold">15 000 грн.</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Badge className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Кількість працівників: </Typography>
                <Typography variant="body1" className="fw-bold">7</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <PriceChange className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Торг по ціні: </Typography>
                <Typography variant="body1" className="fw-bold">Так</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Apartment className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Площа приміщення: </Typography>
                <Typography variant="body1" className="fw-bold">67 м
                  <sup>2</sup>
                </Typography>
              </div>
            </div>
          </div>
          <div className="business-card-row">
            <Typography variant="subtitle2" sx={{
              color: 'text.secondary',
            }}>Локація - Дата створення</Typography>
            <StarButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;