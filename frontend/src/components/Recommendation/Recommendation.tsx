import { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemDecorator,
  Sheet,
  Tooltip,
  Typography,
} from '@mui/joy';
import { ExpandMore, InfoOutlined, Psychology, Star, StarHalf, StarOutline } from '@mui/icons-material';
import { RecommendationDto } from '../../Types/Recommendation/recommendationDto.ts';

export interface AIRecommendationProps {
  recommendation: RecommendationDto;
}

const getInvestmentRating = (
  totalScore: number,
): {
  label: string;
  color: 'success' | 'primary' | 'warning' | 'neutral' | 'danger';
  stars: number;
} => {
  if (totalScore >= 90) {
    return { label: 'Відмінна інвестиція (Лідер ринку, Високоефективний бізнес)', color: 'success', stars: 5 };
  } else if (totalScore >= 75) {
    return { label: 'Гарна інвестиція (Стабільний і перспективний бізнес)', color: 'success', stars: 4 };
  } else if (totalScore >= 60) {
    return { label: 'Задовільна інвестиція (Стабільний бізнес з потенціалом)', color: 'primary', stars: 3 };
  } else if (totalScore >= 45) {
    return { label: 'Посередня інвестиція (Бізнес з викликами та можливостями)', color: 'warning', stars: 2 };
  } else {
    return { label: 'Ризикована інвестиція (Бізнес з високим ризиком)', color: 'danger', stars: 1 };
  }
};

const renderStars = (count: number) => {
  const stars = [];
  const fullStars = Math.floor(count);
  const hasHalfStar = count - fullStars >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} sx={{ color: 'warning.500' }} />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half" sx={{ color: 'warning.500' }} />);
  }

  const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<StarOutline key={`empty-${i}`} sx={{ color: 'warning.300' }} />);
  }

  return stars;
};

const Recommendation = ({ recommendation }: AIRecommendationProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const rating = getInvestmentRating(recommendation.totalScore);

  return (
    <Card variant="outlined" sx={{ mt: 3 }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          indicator={<ExpandMore />}
          sx={{
            backgroundColor: 'background.level1',
            borderRadius: 'sm',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
            <Psychology sx={{ fontSize: 28, color: 'primary.500' }} />
            <Typography level="title-lg">AI Рекомендації та Оцінка</Typography>
            <Chip size="lg" variant="soft" color={rating.color} sx={{ ml: 'auto', px: 2 }}>
              {recommendation.totalScore}/100 балів
            </Chip>
          </Box>
        </AccordionSummary>

        <AccordionDetails>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography level="title-md">Загальна оцінка:</Typography>
              <Box sx={{ display: 'flex', ml: 2 }}>{renderStars(rating.stars)}</Box>
            </Box>

            <Chip size="lg" variant="soft" color={rating.color} sx={{ mb: 3 }}>
              {rating.label}
            </Chip>

            <Divider sx={{ my: 2 }} />

            <Typography level="title-md" sx={{ mb: 2 }}>
              Детальна оцінка:
            </Typography>

            <Sheet variant="soft" sx={{ p: 2, borderRadius: 'md' }}>
              {recommendation.criteriaEstimates.map((criteria, index) => (
                <Box key={criteria.id} sx={{ mb: index < recommendation.criteriaEstimates.length - 1 ? 2 : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography level="body-sm">{criteria.name}</Typography>
                    <Tooltip title={`${criteria.estimate} з 100 можливих балів`} placement="top">
                      <IconButton size="sm" variant="plain" sx={{ ml: 0.5 }}>
                        <InfoOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Typography level="body-sm" sx={{ ml: 'auto' }}>
                      {criteria.estimate}/100
                    </Typography>
                  </Box>
                  <LinearProgress
                    determinate
                    value={criteria.estimate}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      ['& .MuiLinearProgress-bar']: {
                        backgroundColor: (theme) => {
                          const percentage = criteria.estimate;
                          if (percentage >= 80) return theme.vars.palette.success[500];
                          if (percentage >= 60) return theme.vars.palette.primary[500];
                          if (percentage >= 40) return theme.vars.palette.warning[500];
                          return theme.vars.palette.danger[500];
                        },
                      },
                    }}
                  />
                </Box>
              ))}
            </Sheet>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', gap: 2, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
              <Card variant="soft" color="success" sx={{ flex: 1 }}>
                <Typography level="title-md">Сильні сторони</Typography>
                <List size="sm">
                  {recommendation.pluses.map((strength, index) => (
                    <ListItem key={index}>
                      <ListItemDecorator>
                        <Star fontSize="small" />
                      </ListItemDecorator>
                      {strength}
                    </ListItem>
                  ))}
                </List>
              </Card>

              <Card variant="soft" color="danger" sx={{ flex: 1 }}>
                <Typography level="title-md">Слабкі сторони</Typography>
                <List size="sm">
                  {recommendation.minuses.map((weakness, index) => (
                    <ListItem key={index}>
                      <ListItemDecorator>
                        <Star fontSize="small" />
                      </ListItemDecorator>
                      {weakness}
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography level="title-md" sx={{ mb: 1 }}>
              Рекомендації:
            </Typography>
            <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'md' }}>
              <List size="sm">
                {recommendation.recommendations.map((rec, index) => (
                  <ListItem key={index}>
                    <ListItemDecorator>
                      <Psychology fontSize="small" color="primary" />
                    </ListItemDecorator>
                    {rec}
                  </ListItem>
                ))}
              </List>
            </Sheet>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
};

export default Recommendation;
