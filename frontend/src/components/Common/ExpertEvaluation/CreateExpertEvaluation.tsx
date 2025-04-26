'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  List,
  ListDivider,
  ListItem,
  ListItemDecorator,
  Slider,
  Tooltip,
  Typography,
} from '@mui/joy';
import {
  Add,
  ArrowBack,
  Delete,
  Groups,
  InfoOutlined,
  LocationOn,
  Payments,
  Psychology,
  Save,
  Shield,
  SupportAgent,
  TrendingUp,
  Warning,
} from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useNotification } from '../../../Contexts/notificationContext.tsx';
import Menu from '../../Menu/Menu.tsx';
import useRecommendationService from '../../../Services/recommendationService.ts';
import type { CreateRecommendationDto } from '../../../Types/Recommendation/createRecommendationDto.ts';

interface ExpertEvaluationFormData {
  locationScore: number;
  financialScore: number;
  adaptationScore: number;
  teamScore: number;
  supportScore: number;
  popularityScore: number;
  complexScore: number;
  locationWeight: number;
  financialWeight: number;
  adaptationWeight: number;
  teamWeight: number;
  supportWeight: number;
  popularityWeight: number;
  complexWeight: number;
}

// Define the priority order for criteria weights
const priorityOrder = [
  'locationWeight',
  'financialWeight',
  'adaptationWeight',
  'teamWeight',
  'supportWeight',
  'popularityWeight',
  'complexWeight',
];

// Map each weight key to its priority index (lower index = higher priority)
const priorityIndex: Record<string, number> = {};
priorityOrder.forEach((key, index) => {
  priorityIndex[key] = index;
});

// Reorder scoreCategories based on priority
const scoreCategories = [
  { name: 'Локація', scoreKey: 'locationScore', weightKey: 'locationWeight', icon: <LocationOn /> },
  {
    name: 'Фінансові показники',
    scoreKey: 'financialScore',
    weightKey: 'financialWeight',
    icon: <Payments />,
  },
  {
    name: 'Адаптація до умов в Україні',
    scoreKey: 'adaptationScore',
    weightKey: 'adaptationWeight',
    icon: <Shield />,
  },
  { name: 'Команда', scoreKey: 'teamScore', weightKey: 'teamWeight', icon: <Groups /> },
  {
    name: 'Підтримка колишнього власника',
    scoreKey: 'supportScore',
    weightKey: 'supportWeight',
    icon: <SupportAgent />,
  },
  {
    name: 'Популярність бізнесу',
    scoreKey: 'popularityScore',
    weightKey: 'popularityWeight',
    icon: <TrendingUp />,
  },
  { name: 'Комплексна оцінка', scoreKey: 'complexScore', weightKey: 'complexWeight', icon: <Psychology /> },
].sort((a, b) => priorityIndex[a.weightKey] - priorityIndex[b.weightKey]);

const defaultWeights = {
  locationWeight: 0.1,
  financialWeight: 0.3,
  adaptationWeight: 0.1,
  teamWeight: 0.15,
  supportWeight: 0.05,
  popularityWeight: 0.1,
  complexWeight: 0.2,
};

const CreateExpertEvaluationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalWeightError, setTotalWeightError] = useState<string | null>(null);
  const [pluses, setPluses] = useState<string[]>([]);
  const [minuses, setMinuses] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [newPlus, setNewPlus] = useState('');
  const [newMinus, setNewMinus] = useState('');
  const [newRecommendation, setNewRecommendation] = useState('');
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const { createRecommendation } = useRecommendationService();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ExpertEvaluationFormData>({
    defaultValues: {
      locationScore: 0,
      financialScore: 0,
      adaptationScore: 0,
      teamScore: 0,
      supportScore: 0,
      popularityScore: 0,
      complexScore: 0,
      ...defaultWeights,
    },
  });

  const watchedWeights = watch(priorityOrder);

  // Calculate total weight
  const totalWeight = watchedWeights.reduce((sum, weight) => sum + (Number.parseFloat(weight as string) || 0), 0);
  const totalWeightFormatted = useMemo(() => {
    return totalWeight.toFixed(4);
  }, [totalWeight]);

  // Calculate remaining weight available
  const getRemainingWeight = (currentPriorityIndex: number) => {
    let usedWeight = 0;

    // Sum all weights with higher priority (lower index)
    for (let i = 0; i < currentPriorityIndex; i++) {
      const key = priorityOrder[i];
      usedWeight += Number.parseFloat(watch(key as keyof ExpertEvaluationFormData) as string) || 0;
    }

    return Math.max(0, 1 - usedWeight);
  };

  // Validate total weight
  useEffect(() => {
    if (Math.abs(totalWeight - 1) > 0.01) {
      setTotalWeightError(`Сума ваг має дорівнювати 1. Поточна сума: ${totalWeightFormatted}`);
    } else {
      setTotalWeightError(null);
    }
  }, [watchedWeights, totalWeight, totalWeightFormatted]);

  const calculateTotalScore = (data: ExpertEvaluationFormData) => {
    let totalScore = 0;

    scoreCategories.forEach((category) => {
      const score = data[category.scoreKey as keyof ExpertEvaluationFormData] as number;
      const weight = data[category.weightKey as keyof ExpertEvaluationFormData] as number;

      totalScore += score * weight;
    });

    return totalScore;
  };

  // Adjust lower priority weights when a higher priority weight changes
  const adjustLowerPriorityWeights = (changedPriorityIndex: number) => {
    const lowerPriorityCriteria = priorityOrder.filter((key) => priorityIndex[key] > changedPriorityIndex);

    if (lowerPriorityCriteria.length === 0) {
      return;
    }

    // Calculate the remaining weight available for lower priority criteria
    const remainingWeight = getRemainingWeight(changedPriorityIndex + 1);

    // Calculate the current sum of lower priority weights
    const lowerPrioritySum = lowerPriorityCriteria.reduce((sum, key) => {
      return sum + (Number.parseFloat(watch(key as keyof ExpertEvaluationFormData) as string) || 0);
    }, 0);

    // If the lower priority sum is already zero, distribute the remaining weight equally
    if (lowerPrioritySum <= 0.001) {
      const equalShare = remainingWeight / lowerPriorityCriteria.length;
      lowerPriorityCriteria.forEach((key) => {
        setValue(key as keyof ExpertEvaluationFormData, Number.parseFloat(equalShare.toFixed(4)));
      });
      return;
    }

    // Calculate the adjustment factor
    const adjustmentFactor = remainingWeight / lowerPrioritySum;

    // Adjust each lower priority weight proportionally
    lowerPriorityCriteria.forEach((key) => {
      const currentWeight = Number.parseFloat(watch(key as keyof ExpertEvaluationFormData) as string) || 0;
      const newWeight = currentWeight * adjustmentFactor;
      setValue(key as keyof ExpertEvaluationFormData, Number.parseFloat(newWeight.toFixed(4)));
    });
  };

  const addPlus = () => {
    if (newPlus.trim()) {
      setPluses([...pluses, newPlus.trim()]);
      setNewPlus('');
    }
  };

  const removePlus = (index: number) => {
    setPluses(pluses.filter((_, i) => i !== index));
  };

  const addMinus = () => {
    if (newMinus.trim()) {
      setMinuses([...minuses, newMinus.trim()]);
      setNewMinus('');
    }
  };

  const removeMinus = (index: number) => {
    setMinuses(minuses.filter((_, i) => i !== index));
  };

  const addRecommendation = () => {
    if (newRecommendation.trim()) {
      setRecommendations([...recommendations, newRecommendation.trim()]);
      setNewRecommendation('');
    }
  };

  const removeRecommendation = (index: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ExpertEvaluationFormData) => {
    if (Math.abs(totalWeight - 1) > 0.01) {
      normalizeWeights();
      // If still not normalized (which shouldn't happen), show error
      if (Math.abs(totalWeight - 1) > 0.01) {
        showErrorNotification('Сума ваг має дорівнювати 1');
        return;
      }
    }

    if (pluses.length === 0) {
      showErrorNotification('Додайте хоча б одну сильну сторону');
      return;
    }

    if (minuses.length === 0) {
      showErrorNotification('Додайте хоча б одну слабку сторону');
      return;
    }

    if (recommendations.length === 0) {
      showErrorNotification('Додайте хоча б одну рекомендацію');
      return;
    }

    try {
      setIsSubmitting(true);

      const totalScore = calculateTotalScore(data);

      const recommendationDto: CreateRecommendationDto = {
        businessId: id!,
        criteriaWeights: [
          data.locationWeight,
          data.financialWeight,
          data.adaptationWeight,
          data.teamWeight,
          data.supportWeight,
          data.popularityWeight,
          data.complexWeight,
        ],
        locationScore: data.locationScore,
        adaptationScore: data.adaptationScore,
        supportFromPreviousOwnerScore: data.supportScore,
        complexScore: data.complexScore,
        financialScore: data.financialScore,
        teamScore: data.teamScore,
        popularityScore: data.popularityScore,
        pluses: pluses,
        minuses,
        recommendations,
      };

      await createRecommendation(recommendationDto);
      showSuccessNotification('Експертну оцінку успішно додано');
      navigate(`/business/${id}`);
    } catch (error) {
      showErrorNotification('Помилка при додаванні експертної оцінки');
    } finally {
      setIsSubmitting(false);
    }
  };

  const normalizeWeights = () => {
    // Start from the lowest priority (highest index) and adjust it to make the sum 1
    for (let i = priorityOrder.length - 1; i >= 0; i--) {
      const key = priorityOrder[i];
      const currentValue = Number.parseFloat(watch(key as keyof ExpertEvaluationFormData) as string) || 0;

      if (currentValue > 0 || i === 0) {
        // Calculate the sum of all weights except this one
        const otherWeightsSum = priorityOrder.reduce((sum, k, idx) => {
          if (idx === i) return sum;
          return sum + (Number.parseFloat(watch(k as keyof ExpertEvaluationFormData) as string) || 0);
        }, 0);

        // Set this weight to make the total sum 1
        const newValue = Math.max(0, 1 - otherWeightsSum);
        setValue(key as keyof ExpertEvaluationFormData, Number.parseFloat(newValue.toFixed(4)));
        break;
      }
    }
  };

  const resetWeights = () => {
    scoreCategories.forEach((category) => {
      setValue(
        category.weightKey as keyof ExpertEvaluationFormData,
        defaultWeights[category.weightKey as keyof typeof defaultWeights],
      );
    });
  };

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Button
          variant="outlined"
          color="neutral"
          startDecorator={<ArrowBack />}
          onClick={() => navigate(`/business/${id}`)}
          sx={{ mb: 3 }}
        >
          Повернутися до бізнесу
        </Button>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography level="h4" sx={{ mb: 3 }}>
                Ваги критеріїв
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography level="title-sm">Ваги критеріїв (сума має дорівнювати 1)</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="sm" variant="outlined" onClick={normalizeWeights}>
                    Нормалізувати
                  </Button>
                  <Button size="sm" variant="outlined" onClick={resetWeights}>
                    Скинути до стандартних
                  </Button>
                </Box>
              </Box>

              {totalWeightError && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                    p: 1,
                    bgcolor: 'danger.softBg',
                    borderRadius: 'sm',
                  }}
                >
                  <Warning color="error" />
                  <Typography color="danger" level="body-sm">
                    {totalWeightError}
                  </Typography>
                </Box>
              )}

              <Grid container spacing={2}>
                {scoreCategories.map((category, index) => {
                  // Find the priority index for this category
                  const thisPriorityIndex = priorityIndex[category.weightKey];

                  // Calculate the maximum allowed value for this weight
                  const remainingWeight = getRemainingWeight(thisPriorityIndex);
                  const maxAllowed = Math.min(remainingWeight, 1);

                  return (
                    <Grid xs={12} md={6} key={`weight-${category.weightKey}`}>
                      <Controller
                        name={category.weightKey as keyof ExpertEvaluationFormData}
                        control={control}
                        render={({ field }) => {
                          const handleWeightChange = (newValue: number) => {
                            // Ensure value is not negative
                            if (newValue < 0) {
                              newValue = 0;
                            }

                            // Ensure value doesn't exceed the maximum allowed
                            if (newValue > maxAllowed) {
                              newValue = maxAllowed;
                            }

                            // Set the new value
                            field.onChange(newValue);

                            // Adjust lower priority weights
                            adjustLowerPriorityWeights(thisPriorityIndex);
                          };

                          return (
                            <FormControl sx={{ mb: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                <Box sx={{ mr: 1 }}>{category.icon}</Box>
                                <Typography level="body-sm">{category.name}</Typography>
                                <Tooltip title={`Вага для критерію "${category.name}"`} placement="top">
                                  <IconButton size="sm" variant="plain" sx={{ ml: 0.5 }}>
                                    <InfoOutlined fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Slider
                                  value={Number.parseFloat(field.value as string) || 0}
                                  onChange={(_, value) => {
                                    handleWeightChange(value as number);
                                  }}
                                  min={0}
                                  max={maxAllowed}
                                  step={0.0001}
                                  sx={{ flexGrow: 1 }}
                                />
                                <Input
                                  value={
                                    typeof field.value === 'number'
                                      ? field.value.toFixed(4)
                                      : (Number.parseFloat(field.value as string) || 0).toFixed(4)
                                  }
                                  onChange={(event) => {
                                    const newValue = Number.parseFloat(event.target.value) || 0;
                                    handleWeightChange(newValue);
                                  }}
                                  slotProps={{
                                    input: {
                                      min: 0,
                                      max: maxAllowed,
                                      step: 0.0001,
                                      onBlur: () => {
                                        // Round to 4 decimal places on blur
                                        const currentValue = Number.parseFloat(field.value as string) || 0;
                                        field.onChange(Number.parseFloat(currentValue.toFixed(4)));

                                        // Adjust lower priority weights again after rounding
                                        adjustLowerPriorityWeights(thisPriorityIndex);
                                      },
                                    },
                                  }}
                                  type="number"
                                  sx={{ minWidth: 80, maxWidth: 80 }}
                                />
                              </Box>
                            </FormControl>
                          );
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography level="h4" sx={{ mb: 3 }}>
                Оцінки за критеріями
              </Typography>

              <Grid container spacing={3}>
                {scoreCategories.map((category, index) => (
                  <Grid xs={12} md={6} key={category.scoreKey}>
                    <Controller
                      name={category.scoreKey as keyof ExpertEvaluationFormData}
                      control={control}
                      rules={{ required: `Оцінка для "${category.name}" є обов'язковою` }}
                      render={({ field, fieldState }) => (
                        <FormControl error={!!fieldState.error}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Box sx={{ mr: 1 }}>{category.icon}</Box>
                            <Typography level="body-sm">{category.name}</Typography>
                            <Tooltip title={'Оцінка від 0 до 100'} placement="top">
                              <IconButton size="sm" variant="plain" sx={{ ml: 0.5 }}>
                                <InfoOutlined fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Slider
                              value={Number.parseFloat(field.value as string) || 0}
                              onChange={(_, value) => {
                                field.onChange(value);
                              }}
                              min={0}
                              max={100}
                              step={1}
                              sx={{ flexGrow: 1 }}
                            />
                            <Input
                              value={field.value}
                              onChange={(event) => {
                                field.onChange(Number.parseFloat(event.target.value as string) || 0);
                              }}
                              slotProps={{ input: { min: 0, max: 100.0, step: 0.01 } }}
                              type="number"
                              sx={{ width: 80 }}
                            />
                          </Box>
                          <Typography level="body-xs" sx={{ mt: 0.5 }}>
                            {field.value} з 100 можливих балів
                          </Typography>
                          {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                        </FormControl>
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'primary.softBg',
                  borderRadius: 'sm',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography level="title-md">Загальна оцінка:</Typography>
                <Chip size="lg" variant="solid" color="primary" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  {calculateTotalScore(watch()).toFixed(2)}
                </Chip>
              </Box>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography level="h4" sx={{ mb: 3 }}>
                Сильні сторони
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Input
                    placeholder="Додайте сильну сторону бізнесу"
                    value={newPlus}
                    onChange={(e) => setNewPlus(e.target.value)}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<Add />}
                    onClick={addPlus}
                    disabled={!newPlus.trim()}
                  >
                    Додати
                  </Button>
                </Box>

                {pluses.length === 0 ? (
                  <Typography level="body-sm" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                    Додайте хоча б одну сильну сторону бізнесу
                  </Typography>
                ) : (
                  <List
                    variant="outlined"
                    sx={{
                      borderRadius: 'sm',
                      maxHeight: '300px',
                      overflow: 'auto',
                    }}
                  >
                    {pluses.map((plus, index) => (
                      <div key={index}>
                        <ListItem
                          endAction={
                            <IconButton variant="plain" color="danger" size="sm" onClick={() => removePlus(index)}>
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemDecorator>
                            <Chip size="sm">{index + 1}</Chip>
                          </ListItemDecorator>
                          {plus}
                        </ListItem>
                        {index < pluses.length - 1 && <ListDivider />}
                      </div>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography level="h4" sx={{ mb: 3 }}>
                Слабкі сторони
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Input
                    placeholder="Додайте слабку сторону бізнесу"
                    value={newMinus}
                    onChange={(e) => setNewMinus(e.target.value)}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<Add />}
                    onClick={addMinus}
                    disabled={!newMinus.trim()}
                  >
                    Додати
                  </Button>
                </Box>

                {minuses.length === 0 ? (
                  <Typography level="body-sm" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                    Додайте хоча б одну слабку сторону бізнесу
                  </Typography>
                ) : (
                  <List
                    variant="outlined"
                    sx={{
                      borderRadius: 'sm',
                      maxHeight: '300px',
                      overflow: 'auto',
                    }}
                  >
                    {minuses.map((minus, index) => (
                      <div key={index}>
                        <ListItem
                          endAction={
                            <IconButton variant="plain" color="danger" size="sm" onClick={() => removeMinus(index)}>
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemDecorator>
                            <Chip size="sm">{index + 1}</Chip>
                          </ListItemDecorator>
                          {minus}
                        </ListItem>
                        {index < minuses.length - 1 && <ListDivider />}
                      </div>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Card>

          <Card variant="outlined" sx={{ mb: 3 }}>
            <Box sx={{ p: 3 }}>
              <Typography level="h4" sx={{ mb: 3 }}>
                Рекомендації
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Input
                    placeholder="Додайте рекомендацію щодо бізнесу"
                    value={newRecommendation}
                    onChange={(e) => setNewRecommendation(e.target.value)}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    variant="solid"
                    color="primary"
                    startDecorator={<Add />}
                    onClick={addRecommendation}
                    disabled={!newRecommendation.trim()}
                  >
                    Додати
                  </Button>
                </Box>

                {recommendations.length === 0 ? (
                  <Typography level="body-sm" sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}>
                    Додайте хоча б одну рекомендацію щодо бізнесу
                  </Typography>
                ) : (
                  <List
                    variant="outlined"
                    sx={{
                      borderRadius: 'sm',
                      maxHeight: '300px',
                      overflow: 'auto',
                    }}
                  >
                    {recommendations.map((recommendation, index) => (
                      <div key={index}>
                        <ListItem
                          endAction={
                            <IconButton
                              variant="plain"
                              color="danger"
                              size="sm"
                              onClick={() => removeRecommendation(index)}
                            >
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemDecorator>
                            <Chip size="sm">{index + 1}</Chip>
                          </ListItemDecorator>
                          {recommendation}
                        </ListItem>
                        {index < recommendations.length - 1 && <ListDivider />}
                      </div>
                    ))}
                  </List>
                )}
              </Box>
            </Box>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button variant="outlined" color="neutral" size="lg" onClick={() => navigate(`/business/${id}`)}>
              Скасувати
            </Button>
            <Button
              type="submit"
              variant="solid"
              color="primary"
              size="lg"
              startDecorator={<Save />}
              loading={isSubmitting}
              disabled={
                !!totalWeightError || pluses.length === 0 || minuses.length === 0 || recommendations.length === 0
              }
            >
              Зберегти оцінку
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateExpertEvaluationPage;
