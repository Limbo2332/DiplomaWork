import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Paper, Typography } from '@mui/material';
import { Facebook, Instagram, Telegram, Twitter } from '@mui/icons-material';

import './AuthorProfile.scss';
import Menu from '../../components/Menu/Menu.tsx';
import { useLoading } from '../../Contexts/loadingContext.tsx';

import defaultImage from '../../assets/images/default-image.png';

const AuthorProfile: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();
  const [authorData, setAuthorData] = useState<{
    name: string;
    avatarUrl: string;
    bio: string;
    registeredDate: string;
    salesCount: number;
    phoneNumber: string;
    email: string;
    socialMedia: {
      telegram?: string;
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  } | null>(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const data = {
        name: 'John Doe',
        avatarUrl: 'path/to/avatar.jpg',
        bio: 'This is a short bio about the author.',
        registeredDate: '2021-01-01',
        salesCount: 15,
        phoneNumber: '+380 68 33 73 177',
        email: 'john.doe@example.com',
        socialMedia: {
          telegram: 'https://t.me/johndoe',
          instagram: 'https://instagram.com/johndoe',
        },
      };

      showLoading();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      hideLoading();

      setAuthorData(data);
    };

    fetchAuthorData();
  }, [hideLoading, showLoading]);

  if (!authorData) {
    return;
  }

  return (
    <main className="main">
      <Menu />
      <div className="author-main">
        <Paper className="author-profile-container" elevation={3}>
          <div className="author-profile-header">
            <Avatar alt={authorData.name} src={defaultImage} className="author-avatar" />
            <Typography variant="h4" className="author-name">
              {authorData.name}
            </Typography>
          </div>
          <Divider className="divider" />
          <div className="author-profile-details">
            <Typography variant="body1" className="author-bio">
              {authorData.bio}
            </Typography>
            <div className="author-info">
              <Typography variant="subtitle1">
                <strong>Зареєстрований:</strong> {authorData.registeredDate}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Кількість продажів:</strong> {authorData.salesCount}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Номер телефону:</strong> {authorData.phoneNumber}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {authorData.email}
              </Typography>
            </div>
            <div className="social-media-links">
              {authorData.socialMedia.telegram && (
                <a href={authorData.socialMedia.telegram} target="_blank" rel="noopener noreferrer">
                  <Telegram className="social-media-icon" />
                </a>
              )}
              {authorData.socialMedia.instagram && (
                <a href={authorData.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="social-media-icon" />
                </a>
              )}
              {authorData.socialMedia.facebook && (
                <a href={authorData.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="social-media-icon" />
                </a>
              )}
              {authorData.socialMedia.twitter && (
                <a href={authorData.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="social-media-icon" />
                </a>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </main>
  );
};

export default AuthorProfile;
