﻿'use client';

import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  Option,
  Select,
  Sheet,
  Slider,
  Stack,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy';
import { Check, Edit, Info, Refresh, Save, Settings, SmartToy } from '@mui/icons-material';
import { useAuth } from '../../Contexts/authContext.tsx';
import Menu from '../../components/Menu/Menu.tsx';
import useGlobalCriteriaService from '../../Services/globalCriteriaService.ts';
import type { GlobalCriteriaDto } from '../../Types/Criteria/globalCriteriaDto.ts';
import { CriteriaDto } from '../../Types/Criteria/criteriaDto.ts';

type CriteriaWithEditing = CriteriaDto & {
  isEditing: boolean;
  index: number;
}

const defaultCriteria: CriteriaWithEditing[] = [
  {
    id: '569234F5-335E-4F53-BFE8-50BBE3D699D9',
    index: 1,
    name: 'Локація розміщення бізнесу',
    isMaximization: true,
    weight: 0.1,
    isEditing: false,
  },
  {
    id: 'EFE60266-226E-4CE1-AC3A-C15940800BF8',
    index: 2,
    name: 'Оцінка чистого прибутку',
    isMaximization: true,
    weight: 0.1,
    isEditing: false,
  },
  {
    id: '049B2022-5EA2-4C9F-97D1-92395D5FD23F',
    index: 3,
    name: 'Оцінка окупності бізнесу',
    isMaximization: false,
    weight: 0.1,
    isEditing: false,
  },
  {
    id: '4CBF6758-F2BD-4AC2-93FE-C7CF54B6385A',
    index: 4,
    name: 'Оцінка ціни бізнесу',
    isMaximization: true,
    weight: 0.033333,
    isEditing: false,
  },
  {
    id: 'EAF1DEBE-F2AD-4F8D-AEDF-DD697F264AEC',
    index: 5,
    name: 'Оцінка середнього чеку',
    isMaximization: true,
    weight: 0.03333,
    isEditing: false,
  },
  {
    id: '113727BF-D9A7-4ABB-9856-C10D44583A90',
    index: 6,
    name: 'Оцінка середнього виторгу',
    isMaximization: true,
    weight: 0.03333,
    isEditing: false,
  },
  {
    id: 'CA4078F1-9B64-4907-9573-92F9CA19081F',
    index: 7,
    name: 'Оцінка адаптації до умов в Україні',
    isMaximization: true,
    weight: 0.1,
    isEditing: false,
  },
  {
    id: 'D3EC8CF0-E484-4F35-82AD-21987BAF1466',
    index: 8,
    name: 'Оцінка команди та зарплатної відомості',
    isMaximization: true,
    weight: 0.15,
    isEditing: false,
  },
  {
    id: '49CFB6D1-53CC-4425-9241-155FA9182510',
    index: 9,
    name: 'Оцінка підтримки від колишнього власника',
    isMaximization: true,
    weight: 0.05,
    isEditing: false,
  },
  {
    id: 'F9A4EF97-43FA-46B3-9D56-974D3913168C',
    index: 10,
    name: 'Оцінка популярності бізнесу',
    isMaximization: true,
    weight: 0.1,
    isEditing: false,
  },
  {
    id: 'ABA86ADC-6C99-46CB-B390-D29E4FCA844F',
    index: 11,
    name: 'Комплексна оцінка',
    isMaximization: true,
    weight: 0.2,
    isEditing: false,
  },
];

const GlobalCriteriaPage = () => {
  const [criteria, setCriteria] = useState<CriteriaWithEditing[]>([]);
  const [globalCriteriaId, setGlobalCriteriaId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [totalWeight, setTotalWeight] = useState(0);

  const { getCriteria, replaceCriteria, getNewFromAi } = useGlobalCriteriaService();

  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchGlobalCriteria = async () => {
      setIsLoading(true);

      const globalCriteria = await getCriteria();

      if (globalCriteria?.data) {
        const criteriaWithEditing = globalCriteria.data.criteria.map((x, idx) => ({
          ...x,
          index: idx + 1,
          isEditing: false,
          weight: Number.parseFloat(x.weight.toFixed(4)),
        }));

        setGlobalCriteriaId(globalCriteria.data.id);
        setCriteria(criteriaWithEditing);
      }

      setIsLoading(false);
    };

    fetchGlobalCriteria();
  }, []);

  useEffect(() => {
    const sum = criteria.reduce((acc, curr) => acc + curr.weight, 0);
    setTotalWeight(Number(sum.toFixed(2)));
  }, [criteria]);

  const handleResetToDefault = () => {
    setCriteria(defaultCriteria);
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const globalCriteriaDto: GlobalCriteriaDto = {
      criteria: criteria,
      id: globalCriteriaId!,
    };

    const result = await replaceCriteria(globalCriteriaDto);
    setSaveSuccess(result.isOk);
    setIsLoading(false);
  };

  const handleAskAI = async () => {
    setIsLoading(true);

    const globalCriteria = await getNewFromAi();

    if (globalCriteria?.data) {
      const criteriaWithEditing = globalCriteria.data.criteria.map((x, idx) => ({
        ...x,
        index: idx + 1,
        isEditing: false,
        weight: Number.parseFloat(x.weight.toFixed(4)),
      }));

      setGlobalCriteriaId(globalCriteria.data.id);
      setCriteria(criteriaWithEditing);
    }

    setIsLoading(false);
  };

  const toggleEditMode = (index: number) => {
    setCriteria(criteria.map((c) => (c.index === index ? { ...c, isEditing: !c.isEditing } : c)));
  };

  // Update calculateMaxWeight to use index instead of id for ordering
  const calculateMaxWeight = (criterionIndex: number): number => {
    // Sum of weights for criteria with lower indices
    const higherCriteriaSum = criteria.filter((c) => c.index < criterionIndex).reduce((sum, c) => sum + c.weight, 0);

    // Maximum weight is what's left after accounting for higher criteria
    return Number((1 - higherCriteriaSum).toFixed(4));
  };

  const updateCriterion = (index: number, field: keyof CriteriaWithEditing, value: any) => {
    if (field === 'weight') {
      // Get the current criterion
      const currentCriterion = criteria.find((c) => c.index === index);
      if (!currentCriterion) return;

      const oldWeight = currentCriterion.weight;
      const newWeight = Number(value.toFixed(4));
      const weightDifference = newWeight - oldWeight;
      const currentIndex = currentCriterion.index;

      // If the weights would be the same, no need to adjust
      if (weightDifference === 0) {
        setCriteria(criteria.map((c) => (c.index === index ? { ...c, [field]: newWeight } : c)));
        return;
      }

      // Only adjust weights of criteria that appear AFTER this one in the list
      const lowerCriteria = criteria.filter((c) => c.index > currentIndex);
      const lowerWeightsSum = lowerCriteria.reduce((sum, c) => sum + c.weight, 0);

      // If there are no lower criteria or their sum is 0, we can't adjust
      if (lowerCriteria.length === 0 || lowerWeightsSum === 0) {
        // Just update the current criterion
        setCriteria(criteria.map((c) => (c.index === index ? { ...c, weight: newWeight } : c)));
        return;
      }

      // Calculate how much weight is available for lower criteria
      const higherCriteriaSum = criteria.filter((c) => c.index < currentIndex).reduce((sum, c) => sum + c.weight, 0);
      const availableForLowerCriteria = 1 - higherCriteriaSum - newWeight;

      // If we're decreasing the weight, we need to distribute the extra weight to lower criteria
      if (weightDifference < 0) {
        // Extra weight to distribute
        const extraWeight = Math.abs(weightDifference);

        // Distribute extra weight proportionally among lower criteria
        setCriteria(
          criteria.map((c) => {
            if (c.index === index) {
              return { ...c, weight: newWeight };
            } else if (c.index > currentIndex) {
              // Calculate proportional share of the extra weight
              const proportion = c.weight / lowerWeightsSum;
              const additionalWeight = extraWeight * proportion;
              const adjustedWeight = Number((c.weight + additionalWeight).toFixed(4));
              return { ...c, weight: adjustedWeight };
            } else {
              return c;
            }
          }),
        );
      } else {
        if (availableForLowerCriteria < 0) {
          const maxWeight = calculateMaxWeight(currentIndex);
          setCriteria(criteria.map((c) => (c.index === index ? { ...c, weight: maxWeight } : c)));
          return;
        }

        const adjustmentFactor = availableForLowerCriteria / lowerWeightsSum;

        setCriteria(
          criteria.map((c) => {
            if (c.index === index) {
              return { ...c, weight: newWeight };
            } else if (c.index > currentIndex) {
              // Only adjust weights of criteria that appear after this one
              const adjustedWeight = Number((c.weight * adjustmentFactor).toFixed(4));
              return { ...c, weight: adjustedWeight };
            } else {
              // Don't change weights of criteria that appear before this one
              return c;
            }
          }),
        );
      }
    } else {
      // For other fields, just update normally
      setCriteria(criteria.map((c) => (c.index === index ? { ...c, [field]: value } : c)));
    }

    setSaveSuccess(false);
  };

  // If not admin, redirect or show access denied
  if (!isAdmin) {
    return (
      <>
        <Menu />
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
          <Alert color="danger" variant="soft">
            Доступ заборонено. Ця сторінка доступна тільки для адміністраторів.
          </Alert>
        </Box>
      </>
    );
  }

  return (
    <>
      <Menu />
      <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
          {/* Header */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box>
              <Typography level="h2">Глобальні критерії оцінки</Typography>
              <Typography level="body-lg" color="neutral">
                Налаштування критеріїв для оцінки бізнесів
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" color="neutral" startDecorator={<SmartToy />} onClick={handleAskAI}
                loading={isLoading}>
                Запитати AI
              </Button>
              <Button variant="outlined" color="danger" startDecorator={<Refresh />} onClick={handleResetToDefault}>
                Відновити за замовчуванням
              </Button>
              <Button
                variant="solid"
                color="primary"
                startDecorator={<Save />}
                onClick={handleSave}
                loading={isLoading}
              >
                Зберегти зміни
              </Button>
            </Stack>
          </Box>

          {/* Success message */}
          {saveSuccess && (
            <Alert color="success" variant="soft" sx={{ mb: 3 }}>
              Критерії успішно збережено!
            </Alert>
          )}

          {/* Weight summary */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography level="title-md">Загальна вага критеріїв: {totalWeight}</Typography>
                <Tooltip title="Сума ваг усіх критеріїв повинна дорівнювати 1.0">
                  <Info color={totalWeight === 1 ? 'success' : 'warning'} />
                </Tooltip>
              </Box>
              {totalWeight !== 1 && (
                <Alert color="warning" variant="soft" sx={{ mt: 2 }}>
                  Сума ваг критеріїв повинна дорівнювати 1.0. Поточна сума: {totalWeight}
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Criteria table */}
          <Card variant="outlined">
            <Sheet
              variant="soft"
              sx={{
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTopLeftRadius: 'var(--Card-radius)',
                borderTopRightRadius: 'var(--Card-radius)',
              }}
            >
              <Typography level="title-md" startDecorator={<Settings />}>
                Критерії оцінки
              </Typography>
            </Sheet>
            <Table
              stripe="odd"
              hoverRow
              sx={{
                '& thead th:nth-child(1)': { width: '5%' },
                '& thead th:nth-child(2)': { width: '45%' },
                '& thead th:nth-child(3)': { width: '20%' },
                '& thead th:nth-child(4)': { width: '20%' },
                '& thead th:nth-child(5)': { width: '10%' },
                '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
              }}
            >
              <thead>
                <tr>
                  <th>№</th>
                  <th>Назва критерію</th>
                  <th>Тип</th>
                  <th>Вага (0-1)</th>
                  <th>Дії</th>
                </tr>
              </thead>
              {/* Update the table to display the index instead of the GUID */}
              <tbody>
                {criteria.map((criterion) => {
                  const maxWeight = calculateMaxWeight(criterion.index);

                  return (
                    <tr key={criterion.index}>
                      <td>{criterion.index}</td>
                      <td>{criterion.name}</td>
                      <td>
                        {criterion.isEditing ? (
                          <FormControl size="sm">
                            <Select
                              value={criterion.isMaximization ? 'max' : 'min'}
                              onChange={(_, value) => updateCriterion(criterion.index, 'isMaximization', value === 'max')}
                              size="sm"
                            >
                              <Option value="max">Максимізація</Option>
                              <Option value="min">Мінімізація</Option>
                            </Select>
                          </FormControl>
                        ) : criterion.isMaximization ? (
                          'Максимізація'
                        ) : (
                          'Мінімізація'
                        )}
                      </td>
                      <td>
                        {criterion.isEditing ? (
                          <FormControl size="sm">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ flexGrow: 1 }}>
                                <Slider
                                  value={criterion.weight}
                                  onChange={(_, value) =>
                                    updateCriterion(criterion.index, 'weight', Number(value.toFixed(4)))
                                  }
                                  min={0}
                                  max={maxWeight}
                                  step={0.0001}
                                  valueLabelDisplay="auto"
                                  valueLabelFormat={(value) => value.toFixed(4)}
                                />
                              </Box>
                              <Box sx={{ width: '80px' }}>
                                <input
                                  type="number"
                                  value={criterion.weight}
                                  onChange={(e) => {
                                    const value = Number.parseFloat(e.target.value);
                                    if (!isNaN(value) && value >= 0 && value <= maxWeight) {
                                      updateCriterion(criterion.index, 'weight', Number(value.toFixed(4)));
                                    }
                                  }}
                                  step={0.0001}
                                  min={0}
                                  max={maxWeight}
                                  style={{
                                    width: '100%',
                                    padding: '8px',
                                    border: '1px solid var(--joy-palette-neutral-outlinedBorder)',
                                    borderRadius: 'var(--joy-radius-sm)',
                                    fontSize: '0.875rem',
                                  }}
                                />
                              </Box>
                            </Box>
                          </FormControl>
                        ) : (
                          criterion.weight.toFixed(4)
                        )}
                      </td>
                      <td>
                        {criterion.isEditing ? (
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="sm"
                              variant="soft"
                              color="success"
                              onClick={() => toggleEditMode(criterion.index)}
                            >
                              <Check />
                            </IconButton>
                          </Box>
                        ) : (
                          <IconButton
                            size="sm"
                            variant="soft"
                            color="primary"
                            onClick={() => toggleEditMode(criterion.index)}
                          >
                            <Edit />
                          </IconButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default GlobalCriteriaPage;
