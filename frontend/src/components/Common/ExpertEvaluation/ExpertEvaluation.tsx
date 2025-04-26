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
import {
  ExpandMore,
  Groups,
  InfoOutlined,
  LocationOn,
  Payments,
  Person,
  Psychology,
  Shield,
  Star,
  StarHalf,
  StarOutline,
  SupportAgent,
  TrendingUp,
} from '@mui/icons-material';
import { ExpertRecommendationDto } from '../../../Types/Recommendation/expertRecommendationDto.ts';

export interface ExpertEvaluationProps {
  evaluation: ExpertRecommendationDto;
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

const ExpertEvaluation = ({ evaluation }: ExpertEvaluationProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const rating = getInvestmentRating(evaluation.recommendation.ratingScore);

  const scoreCategories = [
    {
      name: 'Локація',
      value: evaluation.recommendation.locationScore,
      icon: <LocationOn />,
    },
    {
      name: 'Фінансові показники',
      value: evaluation.recommendation.financialScore,
      icon: <Payments />,
    },
    {
      name: 'Адаптація до умов в Україні',
      value: evaluation.recommendation.adaptationScore,
      icon: <Shield />,
    },
    {
      name: 'Команда',
      value: evaluation.recommendation.teamScore,
      icon: <Groups />,
    },
    {
      name: 'Підтримка колишнього власника',
      value: evaluation.recommendation.supportScore,
      icon: <SupportAgent />,
    },
    {
      name: 'Популярність бізнесу',
      value: evaluation.recommendation.popularityScore,
      icon: <TrendingUp />,
    },
    {
      name: 'Комплексна оцінка',
      value: evaluation.recommendation.shiScore,
      icon: <Psychology />,
    },
  ];

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          indicator={<ExpandMore />}
          sx={{
            backgroundColor: 'background.level1',
            borderRadius: 'sm',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
            <Person sx={{ fontSize: 28, color: 'primary.500' }} />
            <Box>
              <Typography level="title-lg">{evaluation.expertName}</Typography>
              <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                {new Date(evaluation.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Chip size="lg" variant="soft" color={rating.color} sx={{ ml: 'auto', px: 2 }}>
              {evaluation.recommendation.ratingScore}/100 балів
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
              {scoreCategories.map((category, index) => (
                <Box key={index} sx={{ mb: index < scoreCategories.length - 1 ? 2 : 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box sx={{ mr: 1 }}>{category.icon}</Box>
                    <Typography level="body-sm">{category.name}</Typography>
                    <Tooltip title={`${category.value} з 100 можливих балів`} placement="top">
                      <IconButton size="sm" variant="plain" sx={{ ml: 0.5 }}>
                        <InfoOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Typography level="body-sm" sx={{ ml: 'auto' }}>
                      {category.value}/100
                    </Typography>
                  </Box>
                  <LinearProgress
                    determinate
                    value={category.value * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      ['& .MuiLinearProgress-bar']: {
                        backgroundColor: (theme) => {
                          const percentage = category.value * 100;
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
                  {evaluation.recommendation.pluses.map((strength, index) => (
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
                  {evaluation.recommendation.minuses.map((weakness, index) => (
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
                {evaluation.recommendation.recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemDecorator>
                      <Person fontSize="small" color="primary" />
                    </ListItemDecorator>
                    {recommendation}
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

export default ExpertEvaluation;
