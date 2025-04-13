import { Box, Button, Card, Typography } from '@mui/joy';
import { Add, Groups } from '@mui/icons-material';
import ExpertEvaluation from './ExpertEvaluation';
import { useNavigate } from 'react-router';
import { ExpertRecommendationDto } from '../../../Types/Recommendation/expertRecommendationDto.ts';
import { useAuth } from '../../../Contexts/authContext.tsx';

interface ExpertEvaluationsListProps {
  evaluations: ExpertRecommendationDto[];
  businessId: string;
}

const ExpertEvaluationsList = ({ evaluations, businessId }: ExpertEvaluationsListProps) => {
  const { isExpert } = useAuth();

  const navigate = useNavigate();

  if (!evaluations || evaluations.length === 0) {
    return (
      <Card variant="outlined" sx={{ p: 4, textAlign: 'center', display: 'flex', alignItems: 'center' }}>
        <Groups sx={{ fontSize: 60, color: 'neutral.400', mb: 2 }} />
        <Typography level="h4">Немає експертних оцінок</Typography>
        <Typography level="body-md" sx={{ color: 'text.secondary', mt: 1 }}>
          Для цього бізнесу ще не було надано експертних оцінок.
        </Typography>
        {isExpert && (
          <div className="d-flex justify-content-center mt-3">
            <Button
              variant="solid"
              color="primary"
              startDecorator={<Add />}
              onClick={() => navigate(`/estimatebusiness/${businessId}`)}
              sx={{ mb: 2 }}
            >
              Додати експертну оцінку
            </Button>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Box>
      {isExpert && (
        <div className="d-flex justify-content-center mt-3">
          <Button
            variant="solid"
            color="primary"
            startDecorator={<Add />}
            onClick={() => navigate(`/estimatebusiness/${businessId}`)}
            sx={{ mb: 2 }}
          >
            Додати експертну оцінку
          </Button>
        </div>
      )}
      <Typography level="title-lg" sx={{ mb: 2 }}>
        Експертні оцінки ({evaluations.length})
      </Typography>
      {evaluations.map((evaluation) => (
        <ExpertEvaluation key={evaluation.recommendation.id} evaluation={evaluation} />
      ))}
    </Box>
  );
};

export default ExpertEvaluationsList;
