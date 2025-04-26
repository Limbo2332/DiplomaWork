import { useEffect, useState } from 'react';
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
import { Add, ArrowBack, Delete, InfoOutlined, Save } from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useNotification } from '../../../Contexts/notificationContext.tsx';
import Menu from '../../Menu/Menu.tsx';
import useRecommendationService from '../../../Services/recommendationService.ts';
import type { CreateRecommendationDto } from '../../../Types/Recommendation/createRecommendationDto.ts';
import { GlobalCriteriaDto } from '../../../Types/Criteria/globalCriteriaDto.ts';
import { CriteriaDto } from '../../../Types/Criteria/criteriaDto.ts';
import { CriteriaEstimateDto } from '../../../Types/Criteria/criteriaEstimateDto.ts';
import useGlobalCriteriaService from '../../../Services/globalCriteriaService.ts';

interface ExpertEvaluationFormData {
  [key: string]: number;
}

const CreateExpertEvaluationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pluses, setPluses] = useState<string[]>([]);
  const [minuses, setMinuses] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [newPlus, setNewPlus] = useState('');
  const [newMinus, setNewMinus] = useState('');
  const [newRecommendation, setNewRecommendation] = useState('');
  const { showSuccessNotification, showErrorNotification } = useNotification();
  const { createRecommendation } = useRecommendationService();
  
  const { getCriteria } = useGlobalCriteriaService();

  const [globalCriteria, setGlobalCriteria] = useState<GlobalCriteriaDto | null>(null);
  const [loading, setLoading] = useState(true);

  const generateFormFields = (criteria: CriteriaDto[]) => {
    const fields: ExpertEvaluationFormData = {};

    criteria.forEach((criterion) => {
      fields[`${criterion.id}_score`] = 0;
    });

    return fields;
  };

  useEffect(() => {
    const fetchGlobalCriteria = async () => {
      try {
        setLoading(true);
        const result = await getCriteria();

        if (result?.data) {
          setGlobalCriteria(result.data);

          const defaultValues = generateFormFields(result.data.criteria);
          reset(defaultValues);
        }
      } catch (error) {
        showErrorNotification('Помилка при завантаженні критеріїв');
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalCriteria();
  }, []);

  const {
    control,
    handleSubmit,
    watch,
    reset,
  } = useForm<ExpertEvaluationFormData>({
    defaultValues: {},
  });

  const calculateTotalScore = (data: ExpertEvaluationFormData) => {
    if (!globalCriteria) return 0;

    let totalScore = 0;
    let totalWeight = 0;

    globalCriteria.criteria.forEach((criterion) => {
      const score = data[`${criterion.id}_score`] as number;
      const weight = criterion.weight;

      totalScore += score * weight;
      totalWeight += weight;
    });

    // Normalize by total weight
    return totalWeight > 0 ? totalScore / totalWeight : 0;
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
    if (!globalCriteria) return;

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

      const criteriaEstimates: CriteriaEstimateDto[] = globalCriteria.criteria
        .filter((criterion) => criterion.id !== null)
        .map((criterion) => ({
          id: criterion.id as string,
          name: criterion.name,
          estimate: data[`${criterion.id}_score`] as number,
        }));

      const recommendationDto: CreateRecommendationDto = {
        businessId: id!,
        criteriaEstimates,
        pluses,
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

  if (loading) {
    return (
      <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
        <Menu />
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', textAlign: 'center' }}>
          <Typography level="h4">Завантаження критеріїв...</Typography>
        </Box>
      </Box>
    );
  }

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
                Оцінки за критеріями
              </Typography>

              <Grid container spacing={3}>
                {globalCriteria?.criteria.map((criterion) => {
                  const scoreKey = `${criterion.id}_score`;

                  return (
                    <Grid xs={12} md={6} key={scoreKey}>
                      <Controller
                        name={scoreKey}
                        control={control}
                        rules={{ required: `Оцінка для "${criterion.name}" є обов'язковою` }}
                        render={({ field, fieldState }) => (
                          <FormControl error={!!fieldState.error}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                              <Typography level="body-sm">{criterion.name}</Typography>
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
                  );
                })}
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
              disabled={pluses.length === 0 || minuses.length === 0 || recommendations.length === 0}
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
