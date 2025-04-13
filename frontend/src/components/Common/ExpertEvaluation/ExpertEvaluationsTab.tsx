'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Typography } from '@mui/joy';
import ExpertEvaluationsList from './ExpertEvaluationList.tsx';
import useRecommendationService from '../../../Services/recommendationService.ts';
import { ExpertRecommendationDto } from '../../../Types/Recommendation/expertRecommendationDto.ts';

interface ExpertEvaluationsTabProps {
  businessId: string;
}

const ExpertEvaluationsTab = ({ businessId }: ExpertEvaluationsTabProps) => {
  const [expertEvaluations, setExpertEvaluations] = useState<ExpertRecommendationDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getExpertRecommendations } = useRecommendationService();

  const fetchExpertEvaluations = async () => {
    if (!businessId) return;

    try {
      setIsLoading(true);
      const result = await getExpertRecommendations(businessId);

      if (result?.data) {
        setExpertEvaluations(result.data);
      }

    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertEvaluations();
  }, [businessId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
        <LinearProgress sx={{ width: '100%', mb: 2 }} />
        <Typography level="h4">Завантаження експертних оцінок...</Typography>
        <Typography level="body-md" textAlign="center">
          Завантажуємо експертні оцінки для цього бізнесу. Це може зайняти кілька секунд.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid xs={12}>
        <ExpertEvaluationsList evaluations={expertEvaluations} businessId={businessId} />
      </Grid>
    </Grid>
  );
};

export default ExpertEvaluationsTab;
