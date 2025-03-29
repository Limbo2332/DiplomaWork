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
  Psychology,
  Shield,
  Star,
  StarHalf,
  StarOutline,
  SupportAgent,
  TrendingUp,
} from '@mui/icons-material';

export interface AIRecommendationProps {
  scores: {
    location: number; // out of 10
    financial: number; // out of 30
    adaptation: number; // out of 10
    team: number; // out of 15
    ownerSupport: number; // out of 5
    popularity: number; // out of 10
    aiEvaluation: number; // out of 20
  };
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
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

const Recommendation = ({ scores, recommendations, strengths, weaknesses }: AIRecommendationProps) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const rating = getInvestmentRating(totalScore);

  const scoreCategories = [
    { name: 'Локація', value: scores.location, max: 10, icon: <LocationOn /> },
    { name: 'Фінансові показники', value: scores.financial, max: 30, icon: <Payments /> },
    { name: 'Адаптація до умов в Україні', value: scores.adaptation, max: 10, icon: <Shield /> },
    { name: 'Команда', value: scores.team, max: 15, icon: <Groups /> },
    { name: 'Підтримка колишнього власника', value: scores.ownerSupport, max: 5, icon: <SupportAgent /> },
    { name: 'Популярність бізнесу', value: scores.popularity, max: 10, icon: <TrendingUp /> },
    { name: 'Комплексна оцінка ШІ', value: scores.aiEvaluation, max: 20, icon: <Psychology /> },
  ];

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
              {totalScore}/100 балів
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
                    <Tooltip title={`${category.value} з ${category.max} можливих балів`} placement="top">
                      <IconButton size="sm" variant="plain" sx={{ ml: 0.5 }}>
                        <InfoOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Typography level="body-sm" sx={{ ml: 'auto' }}>
                      {category.value}/{category.max}
                    </Typography>
                  </Box>
                  <LinearProgress
                    determinate
                    value={(category.value / category.max) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      ['& .MuiLinearProgress-bar']: {
                        backgroundColor: (theme) => {
                          const percentage = (category.value / category.max) * 100;
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
                  {strengths.map((strength, index) => (
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
                  {weaknesses.map((weakness, index) => (
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
                {recommendations.map((recommendation, index) => (
                  <ListItem key={index}>
                    <ListItemDecorator>
                      <Psychology fontSize="small" color="primary" />
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

export default Recommendation;

