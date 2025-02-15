import React, { useState } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import InfiniteScrollCards from '../../components/Feed/InfiniteScrollCards/InfiniteScrollCards.tsx';
import { useNavigate } from 'react-router';
import Menu from '../../components/Menu/Menu.tsx';
import './ManageBusinesses.scss';

const ManageBusinesses = () => {
  const [hasBusinesses, setHasBusinesses] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleCreateBusiness = () => {
    navigate('/createoreditbusiness/0');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
          <InfiniteScrollCards />
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
