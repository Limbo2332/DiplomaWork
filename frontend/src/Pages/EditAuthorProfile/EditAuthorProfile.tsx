import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import { Facebook, Instagram, Telegram, Twitter } from '@mui/icons-material';
import './EditAuthorProfile.scss';
import Menu from '../../components/Menu/Menu.tsx';
import useUserService from '../../Services/userService.ts';

import defaultProfileImage from '../../assets/images/default-image.png';
import { SetProfileDto } from '../../Types/Profile/setProfileDto.ts';

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

const EditAuthorProfile: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<AuthorProfileProps>({
    defaultValues: {
      description: '',
      phoneNumber: '',
      personalSiteLink: '',
    },
  });
  const { getProfileInfo, setProfileInfo } = useUserService();

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

  const onSubmit = async (data: AuthorProfileProps) => {
    setIsLoading(true);

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

    setIsLoading(false);
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

  return (
    <main className="main">
      <Menu />
      <div className="edit-author-main">
        <Paper className="edit-author-profile-container" elevation={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="edit-profile-header">
              <div className="avatar-description-container">
                <div className="avatar-container">
                  <Button variant="contained" component="label" className="avatar-upload-button">
                    <Avatar alt="Author Avatar" src={avatarUrl ?? defaultProfileImage} className="author-avatar" />
                    <input type="file" hidden onChange={handleAvatarChange} accept="image/*" />
                  </Button>
                </div>
                <div className="description-container">
                  <TextField
                    defaultValue=" "
                    label="Повне ім'я"
                    fullWidth
                    margin="normal"
                    disabled
                    value={fullName}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Опис"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                        disabled={isLoading}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="edit-profile-details">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Номер телефону"
                        fullWidth
                        margin="normal"
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="personalSiteLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Персональний сайт"
                        fullWidth
                        margin="normal"
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="telegramLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Telegram"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          startAdornment: <Telegram className="social-media-icon" />,
                        }}
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="instagramLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Instagram"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          startAdornment: <Instagram className="social-media-icon" />,
                        }}
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="facebookLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Facebook"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          startAdornment: <Facebook className="social-media-icon" />,
                        }}
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="twitterLink"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Twitter"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          startAdornment: <Twitter className="social-media-icon" />,
                        }}
                        disabled={isLoading}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" className="submit-button mt-3"
                loading={isLoading}>
                Зберегти
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </main>
  );
};

export default EditAuthorProfile;
