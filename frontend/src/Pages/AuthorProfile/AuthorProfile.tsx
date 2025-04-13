'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Avatar, Box, Card, CardContent, Chip, Divider, Grid, IconButton, Stack, Typography } from '@mui/joy';
import {
  AdminPanelSettings,
  CalendarMonth,
  Call,
  Email,
  Facebook,
  Instagram,
  Person,
  Psychology,
  Store,
  Telegram,
  Twitter,
  Web,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router';
import Menu from '../../components/Menu/Menu';
import defaultImage from '../../assets/images/default-image.png';
import type { AuthorDto } from '../../Types/Profile/authorDto';
import { Loading } from '../../components/Common/Loading/Loading';
import useUserService from '../../Services/userService';

type RoleType = 'Продавець бізнесу' | 'Адміністратор' | 'Експерт'

interface RoleStyle {
  color: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  icon: React.ReactNode;
}

const getRoleStyle = (role: RoleType | undefined): RoleStyle => {
  switch (role) {
    case 'Адміністратор':
      return {
        color: 'warning',
        icon: <AdminPanelSettings />,
      };
    case 'Експерт':
      return {
        color: 'success',
        icon: <Psychology />,
      };
    case 'Продавець бізнесу':
    default:
      return {
        color: 'primary',
        icon: <Store />,
      };
  }
};

const getRole = (isExpert: boolean, isAdmin: boolean, isSeller: boolean): RoleType | undefined => {
  if (isExpert) {
    return 'Експерт';
  }

  if (isAdmin) {
    return 'Адміністратор';
  }

  if (isSeller) {
    return 'Продавець бізнесу';
  }

  return undefined;
};

const SocialLink = ({ icon, url }: { icon: React.ReactNode; url: string }) => {
  if (!url) return null;
  return (
    <IconButton
      component={Link}
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="soft"
      color="primary"
      size="md"
    >
      {icon}
    </IconButton>
  );
};

const AuthorProfile = () => {
  const { id } = useParams();
  const { getAuthor } = useUserService();
  const [authorData, setAuthorData] = useState<AuthorDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      setIsLoading(true);
      const result = await getAuthor(id!);

      if (result?.data) {
        setAuthorData(result.data);
      }
      setIsLoading(false);
    };

    fetchAuthorData();
  }, [id]);

  if (isLoading || !authorData) {
    return <Loading />;
  }

  const role = getRole(authorData.isExpert, authorData.isAdmin, authorData.isSeller);
  const roleStyle = getRoleStyle(role);

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Header Card with Profile Info */}
        <Card
          variant="outlined"
          sx={{
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, var(--joy-palette-primary-500), var(--joy-palette-primary-700))',
                height: 120,
                width: '100%',
              }}
            />

            <Grid container spacing={2} sx={{ p: 3, pt: 0 }}>
              <Grid xs={12} sm={4} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src={authorData.avatarPreview ?? defaultImage}
                  alt={authorData.name}
                  sx={{
                    width: 140,
                    height: 140,
                    mt: -8,
                    border: '4px solid',
                    borderColor: 'background.surface',
                    boxShadow: 'sm',
                  }}
                />
                <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
                  <SocialLink icon={<Telegram />} url={authorData.telegram || ''} />
                  <SocialLink icon={<Instagram />} url={authorData.instagram || ''} />
                  <SocialLink icon={<Twitter />} url={authorData.twitter || ''} />
                  <SocialLink icon={<Facebook />} url={authorData.facebook || ''} />
                  <SocialLink icon={<Web />} url={authorData.site || ''} />
                </Box>
              </Grid>

              <Grid xs={12} sm={8} md={9}>
                <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
                  <Typography level="h3" sx={{ mb: 1 }}>
                    {authorData.name}
                  </Typography>
                  {role && <Chip
                    variant="soft"
                    color={roleStyle.color}
                    startDecorator={roleStyle.icon}
                    size="md"
                    sx={{ alignSelf: 'flex-start', mb: 2 }}
                  >
                    {role}
                  </Chip>}

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <CalendarMonth sx={{ color: 'primary.500' }} />
                      <Box>
                        <Typography level="body-xs" color="neutral">
                          Зареєстрований
                        </Typography>
                        <Typography level="body-md">
                          {new Date(authorData.registrationDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>

                    {authorData.phoneNumber && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Call sx={{ color: 'primary.500' }} />
                        <Box>
                          <Typography level="body-xs" color="neutral">
                            Телефон
                          </Typography>
                          <Typography level="body-md">{authorData.phoneNumber}</Typography>
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Email sx={{ color: 'primary.500' }} />
                      <Box>
                        <Typography level="body-xs" color="neutral">
                          Email
                        </Typography>
                        <Typography level="body-md">{authorData.email}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card variant="outlined">
          <CardContent>
            <Typography level="title-lg" startDecorator={<Person sx={{ color: 'primary.500' }} />} sx={{ mb: 2 }}>
              Про {role === 'Продавець бізнесу' ? 'продавця' : role === 'Адміністратор' ? 'адміністратора' : 'експерта'}
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {authorData.description ? (
              <Box
                sx={{
                  p: 3,
                  borderRadius: 'md',
                  bgcolor: 'background.level1',
                  whiteSpace: 'pre-line',
                }}
              >
                <Typography level="body-md">{authorData.description}</Typography>
              </Box>
            ) : (
              <Box
                sx={{
                  p: 3,
                  borderRadius: 'md',
                  bgcolor: 'background.level1',
                }}
              >
                <Typography level="body-md" color="neutral">
                  {role === 'Продавець бізнесу'
                    ? 'Продавець не додав опис про себе.'
                    : role === 'Адміністратор'
                      ? 'Адміністратор не додав опис про себе.'
                      : 'Експерт не додав опис про себе.'}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AuthorProfile;
