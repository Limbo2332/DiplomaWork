import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Avatar, Button, Grid, Paper, TextField } from '@mui/material';
import { Facebook, Instagram, Telegram, Twitter } from '@mui/icons-material';
import './EditAuthorProfile.scss';
import Menu from '../../components/Menu/Menu.tsx';

const EditAuthorProfile: React.FC = () => {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      name: 'John Doe',
      avatarUrl: 'path/to/avatar.jpg',
      bio: 'This is a short bio about the author.',
      phoneNumber: '+380 68 33 73 177',
      email: 'john.doe@example.com',
      socialMedia: {
        telegram: 'https://t.me/johndoe',
        instagram: 'https://instagram.com/johndoe',
        facebook: 'https://facebook.com/johndoe',
        twitter: 'https://twitter.com/johndoe',
      },
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form data submitted:', data);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('avatarUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const avatarUrl = watch('avatarUrl');

  return (
    <main className="main">
      <Menu />
      <div className="edit-author-main">
        <Paper className="edit-author-profile-container" elevation={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="edit-profile-header">
              <Button variant="contained" component="label" className="avatar-upload-button">
                <Avatar alt="Author Avatar" src={avatarUrl} className="author-avatar" />
                <input type="file" hidden onChange={handleAvatarChange} />
              </Button>
            </div>
            <div className="edit-profile-details">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Опис"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={3}
                      />
                    )}
                  />
                </Grid>
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Персональний сайт"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="socialMedia.telegram"
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="socialMedia.instagram"
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="socialMedia.facebook"
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
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="socialMedia.twitter"
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
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="primary" className="submit-button mt-3">
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
