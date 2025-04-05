import type React from 'react';
import { useEffect, useState } from 'react';
import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/joy';
import {
  Business,
  CalendarMonth,
  Call,
  Email,
  Facebook,
  Instagram,
  Person,
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

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Left Column - Profile Info */}
          <Grid xs={12} md={4}>
            <Card variant="outlined" sx={{ mb: { xs: 2, md: 0 } }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Avatar
                  src={authorData.avatarPreview ?? defaultImage}
                  alt={authorData.name}
                  sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.500',
                  }}
                />
                <Typography level="h3" sx={{ mb: 0.5 }}>
                  {authorData.name}
                </Typography>
                <Chip variant="soft" color="primary" startDecorator={<Person />} size="md">
                  Продавець бізнесу
                </Chip>

                <Divider sx={{ my: 2, width: '100%' }} />

                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <CalendarMonth sx={{ color: 'primary.500' }} />
                    <Box sx={{ textAlign: 'left' }}>
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
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography level="body-xs" color="neutral">
                          Телефон
                        </Typography>
                        <Typography level="body-md">{authorData.phoneNumber}</Typography>
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Email sx={{ color: 'primary.500' }} />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography level="body-xs" color="neutral">
                        Email
                      </Typography>
                      <Typography level="body-md">{authorData.email}</Typography>
                    </Box>
                  </Box>
                </Stack>

                {(authorData.phoneNumber || authorData.telegram || authorData.instagram || authorData.twitter
                    || authorData.facebook || authorData.site) &&
                  <>
                    <Box sx={{ display: 'flex', gap: 1, marginTop: 2, justifyContent: 'center' }}>
                      <SocialLink icon={<Telegram />} url={authorData.telegram || ''} />
                      <SocialLink icon={<Instagram />} url={authorData.instagram || ''} />
                      <SocialLink icon={<Twitter />} url={authorData.twitter || ''} />
                      <SocialLink icon={<Facebook />} url={authorData.facebook || ''} />
                      <SocialLink icon={<Web />} url={authorData.site || ''} />
                    </Box>
                    <Divider sx={{ my: 2, width: '100%' }} />
                  </>
                }
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column - About and Listings */}
          <Grid xs={12} md={8}>
            {/* About Section */}
            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography level="title-lg" startDecorator={<Person sx={{ color: 'primary.500' }} />} sx={{ mb: 2 }}>
                  Про продавця
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {authorData.description ? (
                  <Typography level="body-md" sx={{ whiteSpace: 'pre-line' }}>
                    {authorData.description}
                  </Typography>
                ) : (
                  <Typography level="body-md" color="neutral">
                    Продавець не додав опис про себе.
                  </Typography>
                )}
              </CardContent>
            </Card>

            {/* Listings Section */}
            <Card variant="outlined">
              <CardContent>
                <Typography level="title-lg" startDecorator={<Business sx={{ color: 'primary.500' }} />} sx={{ mb: 2 }}>
                  Бізнеси продавця
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  {[1, 2, 3].map((item) => (
                    <Grid key={item} xs={12} sm={6} md={4}>
                      <Card variant="soft" sx={{ height: '100%' }}>
                        <AspectRatio ratio="4/3" sx={{ minHeight: 120 }}>
                          <img src={defaultImage} alt="Business preview" style={{ objectFit: 'cover' }} />
                        </AspectRatio>
                        <CardContent>
                          <Typography level="title-sm">Бізнес #{item}</Typography>
                          <Typography level="body-sm" sx={{ mb: 1 }}>
                            Категорія бізнесу
                          </Typography>
                          <Typography level="body-sm" fontWeight="bold">
                            {(Math.random() * 1000000).toFixed(0)} грн
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button variant="outlined" color="primary" sx={{ borderRadius: 'full', px: 4 }}>
                    Переглянути всі бізнеси
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthorProfile;

