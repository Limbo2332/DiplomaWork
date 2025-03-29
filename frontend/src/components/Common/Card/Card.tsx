import { Tooltip, Typography } from '@mui/material';
import './Card.scss';
import { AccessTime, Apartment, Assessment, Badge, MonetizationOn, PriceChange, Receipt } from '@mui/icons-material';
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

type InvestmentMarkCategory =
  | 'Відмінна інвестиція'
  | 'Гарна інвестиція'
  | 'Задовільна інвестиція'
  | 'Посередня інвестиція'
  | 'Ризикована інвестиція';

interface InvestmentMark {
  category: InvestmentMarkCategory;
  description: string;
  score: number;
  color: string;
}

const getInvestmentMark = (score: number): InvestmentMark => {
  if (score >= 90) {
    return {
      category: 'Відмінна інвестиція',
      description: 'Лідер ринку, Високоефективний бізнес',
      score,
      color: '#4caf50', // green
    };
  } else if (score >= 75) {
    return {
      category: 'Гарна інвестиція',
      description: 'Стабільний і перспективний бізнес',
      score,
      color: '#8bc34a', // light green
    };
  } else if (score >= 60) {
    return {
      category: 'Задовільна інвестиція',
      description: 'Стабільний бізнес з потенціалом',
      score,
      color: '#ffc107', // amber
    };
  } else if (score >= 45) {
    return {
      category: 'Посередня інвестиція',
      description: 'Бізнес з викликами та можливостями',
      score,
      color: '#ff9800', // orange
    };
  } else {
    return {
      category: 'Ризикована інвестиція',
      description: 'Бізнес з високим ризиком',
      score,
      color: '#f44336', // red
    };
  }
};

const InvestmentMarkBadge = ({ score }: { score: number }) => {
  const mark = getInvestmentMark(score);

  return (
    <Tooltip
      title={
        <div>
          <Typography variant="subtitle2">{mark.category}</Typography>
          <Typography variant="body2">{mark.description}</Typography>
          <Typography variant="body2">Оцінка: {mark.score}/100</Typography>
        </div>
      }
      placement="top"
      arrow
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: mark.color,
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
      }}>
        <Assessment fontSize="small" />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {mark.score}
        </Typography>
      </div>
    </Tooltip>
  );
};

interface CardProps {
  businessToPreviewDto: PreviewBusinessDto;
}

const Card = ({
  businessToPreviewDto,
}: CardProps) => {
  const navigate = useNavigate();
  const { isAdmin, currentUser } = useAuth();

  const onCardClick = () => {
    if (isAdmin || currentUser?.id === businessToPreviewDto.createdBy) {
      navigate(`/createoreditbusiness/${businessToPreviewDto.id}`);
      return;
    }

    navigate(`/business/${businessToPreviewDto.id}`);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="business-card">
        <div className="position-relative">
          <img
            className="business-card-image"
            src={businessToPreviewDto.previewImageUrl || '/placeholder.svg'}
            alt="Фото оголошення"
            onClick={onCardClick}
          />
          {businessToPreviewDto.investmentScore !== 0 && (
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
            }}>
              <InvestmentMarkBadge score={businessToPreviewDto.investmentScore} />
            </div>
          )}
        </div>
        <div className="business-card-rows">
          <div className="business-card-row">
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