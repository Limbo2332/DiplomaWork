import React, { useCallback, useState } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';
import { useNavigate } from 'react-router';
import Menu from '../../components/Menu/Menu.tsx';
import './ManageBusinesses.scss';
import { MainFeedBusinessesResponseDto } from '../../Types/Businesses/Responses/mainFeedBusinessesResponseDto.ts';
import { GetBusinessesByStatus } from '../../Types/Businesses/Requests/getBusinessesByStatus.ts';
import { BusinessStatus } from '../../Types/Businesses/businessStatus.ts';
import useBusinessService from '../../Services/businessesService.ts';

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

  const getCards = useCallback(async (offset: number, pageSize: number): Promise<MainFeedBusinessesResponseDto> => {
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
  }, [getBusinessesByStatus, tabValue]);

  const handleCreateBusiness = () => {
    navigate('/createoreditbusiness/0');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setHasBusinesses(true);
  };

  return (
    <main className="main">
      <Menu />
      <div className="container manage-businesses-container">
        <Typography variant="h4" className="manage-businesses-header">
          Мої бізнеси
        </Typography>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Схвалені" />
          <Tab label="Очікують схвалення" />
          <Tab label="Відхилені" />
        </Tabs>
        <div className="create-business-button-container">
          <Button variant="contained" color="primary" onClick={handleCreateBusiness}>
            Виставити оголошення про продаж бізнесу
          </Button>
        </div>
        {hasBusinesses ? (
          <InfiniteScrollCards key={tabValue} getCards={getCards} />
        ) : (
          <div className="no-businesses-message">
            <Typography variant="h5">
              {tabValue === 0 && 'У вас немає схвалених бізнесів.'}
              {tabValue === 1 && 'У вас немає бізнесів, які очікують схвалення.'}
              {tabValue === 2 && 'У вас немає відхилених бізнесів.'}
            </Typography>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageBusinesses;
