import { Typography } from '@mui/material';

import './Card.scss';
import { AccessTime, Apartment, Badge, MonetizationOn, PriceChange, Receipt } from '@mui/icons-material';
import StarButton from '../Bookmark/StarButton.tsx';
import { useNavigate } from 'react-router';
import { useAuth } from '../../../Contexts/authContext.tsx';
import { PreviewBusinessDto } from '../../../Types/Businesses/previewBusinessDto.ts';
import { Currency } from '../CurrencyDropdown/CurrencyDropdown.tsx';

export const currencyToStringRepresentation = (currency: Currency) => {
  switch (currency) {
    case 'UAH':
      return 'грн';
    case 'EURO':
      return 'євро';
    case 'USD':
      return 'доларів';
  }
};

interface CardProps {
  businessToPreviewDto: PreviewBusinessDto;
}

const Card = ({
  businessToPreviewDto,
}: CardProps) => {
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
        <img className="business-card-image" src={businessToPreviewDto.previewImageUrl} alt="Фото оголошення"
          onClick={onCardClick} />
        <div className="business-card-rows">
          <div className="business-card-row">
            <Typography variant="h4">{businessToPreviewDto.name}</Typography>
            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
              <p
                className="business-card-price">{businessToPreviewDto.price} {currencyToStringRepresentation(businessToPreviewDto.priceCurrency)}.</p>
            </div>
          </div>
          {businessToPreviewDto.category &&
            (<div className="business-card-row">
              <Typography variant="subtitle2" sx={{
                color: 'text.secondary',
              }}>{businessToPreviewDto.category}</Typography>
            </div>)}
          <div className="business-card-grid">
            <div className="business-card-row justify-content-start gap-1">
              <AccessTime className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Термін окупності:</Typography>
                <Typography variant="body1"
                  className="fw-bold">{businessToPreviewDto.termToPayBack} місяців</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Receipt className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Середній чек: </Typography>
                <Typography variant="body1" className="fw-bold">{businessToPreviewDto.averageCheque} грн.</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <MonetizationOn className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Середній дохід на місяць: </Typography>
                <Typography variant="body1" className="fw-bold">{businessToPreviewDto.averageProfit} грн.</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Badge className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Кількість працівників: </Typography>
                <Typography variant="body1" className="fw-bold">{businessToPreviewDto.amountOfWorkers}</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <PriceChange className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Торг по ціні: </Typography>
                <Typography variant="body1"
                  className="fw-bold">{businessToPreviewDto.hasBargain ? 'Так' : 'Ні'}</Typography>
              </div>
            </div>
            <div className="business-card-row justify-content-start gap-1">
              <Apartment className="business-card-row-icon" />
              <div className="d-flex align-items-center gap-1">
                <Typography variant="body1">Площа приміщення: </Typography>
                <Typography variant="body1" className="fw-bold">{businessToPreviewDto.flatSquare} м
                  <sup>2</sup>
                </Typography>
              </div>
            </div>
          </div>
          <div className="business-card-row">
            <Typography variant="subtitle2" sx={{
              color: 'text.secondary',
            }}>{businessToPreviewDto.location} - {new Date(businessToPreviewDto.creationDate).toLocaleDateString()}</Typography>
            <StarButton postId={businessToPreviewDto.id} defaultValue={businessToPreviewDto.isSaved} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;