import type React from 'react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Input,
  Textarea,
  Typography,
} from '@mui/joy';
import { AddAPhoto, Facebook, Instagram, Phone, Save, Telegram, Twitter, Web } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import Menu from '../../components/Menu/Menu';
import useUserService from '../../Services/userService';
import defaultProfileImage from '../../assets/images/default-image.png';
import type { SetProfileDto } from '../../Types/Profile/setProfileDto';
import { useNotification } from '../../Contexts/notificationContext';

interface AuthorProfileProps {
  profileImageUrl?: string;
  description?: string;
  phoneNumber?: string;
  personalSiteLink?: string;
  telegramLink?: string;
  instagramLink?: string;
  facebookLink?: string;
  twitterLink?: string;
}

const EditAuthorProfile = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<AuthorProfileProps>({
    defaultValues: {
      description: '',
      phoneNumber: '',
      personalSiteLink: '',
    },
  });
  const { getProfileInfo, setProfileInfo } = useUserService();
  const { showSuccessNotification } = useNotification();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfileInfo = async () => {
      setIsLoading(true);

      const profileInfo = await getProfileInfo();

      if (profileInfo.data) {
        setFullName(profileInfo.data.fullName);
        setAvatarUrl(profileInfo.data.profileImagePath ?? defaultProfileImage);

        reset({
          profileImageUrl: profileInfo.data.profileImagePath,
          description: profileInfo.data.description,
          phoneNumber: profileInfo.data.phoneNumber,
          personalSiteLink: profileInfo.data.personalSiteLink,
          telegramLink: profileInfo.data.telegramLink,
          instagramLink: profileInfo.data.instagramLink,
          facebookLink: profileInfo.data.facebookLink,
          twitterLink: profileInfo.data.twitterLink,
        });
      }

      setIsLoading(false);
    };

    fetchProfileInfo();
  }, [getProfileInfo, reset]);

  const onSubmit = async (data: AuthorProfileProps) => {
    setIsSubmitting(true);

    const setProfileDto: SetProfileDto = {
      profileImage: profileImage,
      description: data.description,
      phoneNumber: data.phoneNumber,
      personalSiteLink: data.personalSiteLink,
      telegramLink: data.telegramLink,
      instagramLink: data.instagramLink,
      twitterLink: data.twitterLink,
      facebookLink: data.facebookLink,
    };

    const formData = new FormData();

    if (setProfileDto.profileImage) {
      formData.append('ProfileImage', setProfileDto.profileImage);
    }
    if (setProfileDto.description) {
      formData.append('Description', setProfileDto.description);
    }
    if (setProfileDto.phoneNumber) {
      formData.append('PhoneNumber', setProfileDto.phoneNumber);
    }
    if (setProfileDto.personalSiteLink) {
      formData.append('PersonalSiteLink', setProfileDto.personalSiteLink);
    }
    if (setProfileDto.telegramLink) {
      formData.append('TelegramLink', setProfileDto.telegramLink);
    }
    if (setProfileDto.instagramLink) {
      formData.append('InstagramLink', setProfileDto.instagramLink);
    }
    if (setProfileDto.facebookLink) {
      formData.append('FacebookLink', setProfileDto.facebookLink);
    }
    if (setProfileDto.twitterLink) {
      formData.append('TwitterLink', setProfileDto.twitterLink);
    }

    await setProfileInfo(formData);

    setIsSubmitting(false);
    showSuccessNotification('Інформація успішно збережена!');
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setProfileImage(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {/* Avatar on the left */}
                <Grid xs={12} sm={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <Avatar
                        src={avatarUrl || defaultProfileImage}
                        alt="Profile Avatar"
                        sx={{
                          width: 150,
                          height: 150,
                          border: '4px solid',
                          borderColor: 'primary.500',
                        }}
                      />
                      <IconButton
                        component="label"
                        color="primary"
                        variant="solid"
                        size="md"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          borderRadius: '50%',
                        }}
                      >
                        <AddAPhoto />
                        <input type="file" hidden onChange={handleAvatarChange} accept="image/*" />
                      </IconButton>
                    </Box>
                    <Typography level="title-lg" sx={{ mb: 1 }}>
                      {fullName}
                    </Typography>
                  </Box>
                </Grid>

                {/* Description on the right */}
                <Grid xs={12} sm={8}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ height: '100%' }}>
                        <Textarea
                          {...field}
                          minRows={8}
                          sx={{ height: 'calc(100% - 30px)' }} // Subtract label height
                          placeholder="Розкажіть про себе, свій досвід та бізнеси, які ви пропонуєте..."
                        />
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Contact Info */}
                <Grid xs={12} sm={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Номер телефону</FormLabel>
                        <Input {...field} startDecorator={<Phone />} placeholder="+380 XX XXX XX XX" />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <Controller
                    name="personalSiteLink"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <FormLabel>Персональний сайт</FormLabel>
                        <Input {...field} startDecorator={<Web />} placeholder="https://example.com" />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid xs={12}>
                  <Controller
                    name="telegramLink"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <Input {...field} startDecorator={<Telegram />} placeholder="Telegram" />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid xs={12}>
                  <Controller
                    name="instagramLink"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <Input {...field} startDecorator={<Instagram />} placeholder="Instagram" />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid xs={12}>
                  <Controller
                    name="facebookLink"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <Input {...field} startDecorator={<Facebook />} placeholder="Facebook" />
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid xs={12}>
                  <Controller
                    name="twitterLink"
                    control={control}
                    render={({ field }) => (
                      <FormControl sx={{ mb: 2 }}>
                        <Input {...field} startDecorator={<Twitter />} placeholder="Twitter" />
                      </FormControl>
                    )}
                  />
                </Grid>

                {/* Save Button */}
                <Grid xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button
                      type="submit"
                      loading={isSubmitting}
                      size="lg"
                      color="primary"
                      startDecorator={<Save />}
                      sx={{ borderRadius: 'full', px: 4 }}
                    >
                      Зберегти зміни
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </form>
      </Box>
    </Box>
  );
};

export default EditAuthorProfile;

