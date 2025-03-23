import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Paper, Typography } from '@mui/material';
import { Facebook, Instagram, Telegram, Twitter, Web } from '@mui/icons-material';

import './AuthorProfile.scss';
import Menu from '../../components/Menu/Menu.tsx';

import defaultImage from '../../assets/images/default-image.png';
import { AuthorDto } from '../../Types/Profile/authorDto.ts';
import { Loading } from '../../components/Common/Loading/Loading.tsx';
import useUserService from '../../Services/userService.ts';
import { Link, useParams } from 'react-router';

const AuthorProfile: React.FC = () => {
  const { id } = useParams();
  const { getAuthor } = useUserService();

  const [authorData, setAuthorData] = useState<AuthorDto | null>(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const result = await getAuthor(id!);

      if (result?.data) {
        setAuthorData(result.data);
      }
    };

    fetchAuthorData();
  }, []);

  if (!authorData) {
    return <Loading />;
  }

  return (
    <main className="main">
      <Menu />
      <div className="author-main">
        <Paper className="author-profile-container" elevation={3}>
          <div className="author-profile-header">
            <Avatar alt={authorData.name} src={authorData.avatarPreview ?? defaultImage} className="author-avatar" sx={{
              width: '300px !important',
              height: '300px !important',
            }} />
            <Typography variant="h4" className="author-name">
              {authorData.name}
            </Typography>
          </div>
          <Divider className="divider" />
          <div className="author-profile-details">
            <Typography variant="body1" className="author-bio">
              {authorData.description}
            </Typography>
            <div className="author-info">
              <Typography variant="subtitle1">
                <strong>Зареєстрований:</strong> {new Date(authorData.registrationDate).toLocaleDateString()}
              </Typography>
              {authorData.phoneNumber && (<Typography variant="subtitle1">
                <strong>Номер телефону:</strong> {authorData.phoneNumber}
              </Typography>)}
              <Typography variant="subtitle1">
                <strong>Email:</strong> {authorData.email}
              </Typography>
            </div>
            <div className="social-medias">
              {authorData.telegram && (
                <Link to={authorData.telegram} target="_blank" rel="noopener noreferrer" className="social-media">
                  <Telegram />
                </Link>
              )}
              {authorData.instagram && (
                <Link to={authorData.instagram} target="_blank" rel="noopener noreferrer" className="social-media">
                  <Instagram />
                </Link>
              )}
              {authorData.twitter && (
                <Link to={authorData.twitter} target="_blank" rel="noopener noreferrer" className="social-media">
                  <Twitter />
                </Link>
              )}
              {authorData.facebook && (
                <Link to={authorData.facebook} target="_blank" rel="noopener noreferrer" className="social-media">
                  <Facebook />
                </Link>
              )}
              {authorData.site && (
                <Link to={authorData.site} target="_blank" rel="noopener noreferrer" className="social-media">
                  <Web />
                </Link>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </main>
  );
};

export default AuthorProfile;
