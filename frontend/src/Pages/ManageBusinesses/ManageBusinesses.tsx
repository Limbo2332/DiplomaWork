import type React from 'react';
import { useCallback, useState } from 'react';
import { Box, Button, Card, CardContent, Divider, Grid, Tab, TabList, Tabs, Typography } from '@mui/joy';
import { Add, Business, Cancel, CheckCircle, HourglassEmpty } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import Menu from '../../components/Menu/Menu';
import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards';
import type { MainFeedBusinessesResponseDto } from '../../Types/Businesses/Responses/mainFeedBusinessesResponseDto';
import type { GetBusinessesByStatus } from '../../Types/Businesses/Requests/getBusinessesByStatus';
import { BusinessStatus } from '../../Types/Businesses/businessStatus';
import useBusinessService from '../../Services/businessesService';

const tabValueToBusinessStatus = (tabValue: number): BusinessStatus => {
  switch (tabValue) {
    case 0:
      return BusinessStatus.Approved;
    case 1:
      return BusinessStatus.WaitingForApproval;
    case 2:
      return BusinessStatus.Denied;
    default:
      throw new Error('Invalid tab value');
  }
};

const ManageBusinesses = () => {
  const [hasBusinesses, setHasBusinesses] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const { getBusinessesByStatus } = useBusinessService();

  const getCards = useCallback(
    async (offset: number, pageSize: number): Promise<MainFeedBusinessesResponseDto> => {
      const request: GetBusinessesByStatus = {
        pageCount: pageSize,
        offset: offset,
        status: tabValueToBusinessStatus(tabValue),
      };

      const result = await getBusinessesByStatus(request);

      setHasBusinesses((result?.data?.previewBusinesses?.length ?? 0) > 0);

      if (!result?.data) {
        return {
          previewBusinesses: [],
          hasMore: false,
        };
      }

      return result.data;
    },
    [getBusinessesByStatus, tabValue],
  );

  const handleCreateBusiness = () => {
    navigate('/createoreditbusiness');
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setHasBusinesses(true);
  };

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography level="h2" startDecorator={<Business sx={{ color: 'primary.500' }} />}>
            Мої бізнеси
          </Typography>
          <Button
            variant="solid"
            color="primary"
            startDecorator={<Add />}
            onClick={handleCreateBusiness}
            size="lg"
            sx={{ borderRadius: 'full' }}
          >
            Виставити оголошення
          </Button>
        </Box>

        <Card variant="outlined" sx={{ mb: 4, overflow: 'visible' }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ bgcolor: 'background.level1' }}>
            <TabList variant="plain" sx={{ p: 0, borderRadius: 0 }}>
              <Tab>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle fontSize="small" color="success" />
                  <span>Схвалені</span>
                </Box>
              </Tab>
              <Tab>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <HourglassEmpty fontSize="small" color="warning" />
                  <span>Очікують схвалення</span>
                </Box>
              </Tab>
              <Tab>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Cancel fontSize="small" color="danger" />
                  <span>Відхилені</span>
                </Box>
              </Tab>
            </TabList>
          </Tabs>

          <CardContent sx={{ p: 3 }}>
            {hasBusinesses ? (
              <InfiniteScrollCards key={tabValue} getCards={getCards} />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 8,
                  textAlign: 'center',
                }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    bgcolor: 'background.level2',
                    color: 'primary.500',
                  }}
                >
                  {tabValue === 0 && <CheckCircle sx={{ fontSize: 48 }} />}
                  {tabValue === 1 && <HourglassEmpty sx={{ fontSize: 48 }} />}
                  {tabValue === 2 && <Cancel sx={{ fontSize: 48 }} />}
                </Box>
                <Typography level="h4" sx={{ mb: 1 }}>
                  {tabValue === 0 && 'У вас немає схвалених бізнесів'}
                  {tabValue === 1 && 'У вас немає бізнесів, які очікують схвалення'}
                  {tabValue === 2 && 'У вас немає відхилених бізнесів'}
                </Typography>
                <Typography level="body-md" color="neutral" sx={{ mb: 3 }}>
                  {tabValue === 0 && 'Ваші схвалені оголошення будуть відображатися тут'}
                  {tabValue === 1 && 'Оголошення, які очікують модерації, будуть відображатися тут'}
                  {tabValue === 2 && 'Відхилені оголошення будуть відображатися тут'}
                </Typography>
                <Button
                  variant="outlined"
                  color="neutral"
                  startDecorator={<Add />}
                  onClick={handleCreateBusiness}
                  sx={{ borderRadius: 'full' }}
                >
                  Створити нове оголошення
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card variant="soft" color="primary" invertedColors sx={{ mb: 2 }}>
          <CardContent>
            <Typography level="title-lg" sx={{ mb: 2 }}>
              Поради для успішного продажу бізнесу
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    Якісні фотографії
                  </Typography>
                  <Typography level="body-sm">
                    Додайте якісні фотографії вашого бізнесу. Гарні зображення збільшують шанси на продаж до 80%.
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    Детальний опис
                  </Typography>
                  <Typography level="body-sm">
                    Надайте детальну інформацію про ваш бізнес, включаючи фінансові показники та перспективи розвитку.
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Typography level="title-sm" sx={{ mb: 1 }}>
                    Швидкі відповіді
                  </Typography>
                  <Typography level="body-sm">
                    Відповідайте на запити потенційних покупців якомога швидше. Це підвищує довіру та шанси на успішну
                    угоду.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ManageBusinesses;

