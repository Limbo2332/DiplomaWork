import { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Sheet,
  Typography,
} from '@mui/joy';
import { NavLink, useLocation } from 'react-router';
import { Business, Logout, Menu as MenuIcon, Person, Settings } from '@mui/icons-material';
import { useAuth } from '../../Contexts/authContext.tsx';
import useMenu from './Menu.logic.ts';

import logo from '../../assets/images/logo.png';

const Menu = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isAdmin } = useAuth();

  const { logout } = useMenu();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: 'Мій профіль', path: '/editprofile', icon: <Person /> },
    { label: 'Керувати бізнесами', path: '/manage-businesses', icon: <Business /> },
  ];

  if (isAdmin) {
    menuItems.push({
      label: 'Глобальні критерії',
      path: '/global-criteria',
      icon: <Settings />,
    });
  }

  return (
    <Sheet
      variant="solid"
      color="primary"
      invertedColors
      sx={{
        height: { xs: 70, md: 80 },
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        p: 0,
        boxShadow: 'sm',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          px: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo || '/placeholder.svg'} alt="logo" style={{ height: 50, width: 'auto' }} />
          </NavLink>
          <Typography
            level="title-lg"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontWeight: 'bold',
            }}
          >
            Готові бізнеси
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          {menuItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              variant={isActive(item.path) ? 'solid' : 'plain'}
              color={isActive(item.path) ? 'neutral' : undefined}
              startDecorator={item.icon}
              size="md"
              sx={{
                borderRadius: 'full',
                px: 2,
                py: 1,
                fontWeight: 'normal',
                fontSize: '0.95rem',
                '&:hover': {
                  bgcolor: 'primary.700',
                },
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<Logout />}
            onClick={logout}
            size="md"
            sx={{
              borderRadius: 'full',
              ml: 1,
              fontWeight: 'normal',
              fontSize: '0.95rem',
            }}
          >
            Вийти з акаунту
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          variant="plain"
          color="neutral"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Drawer */}
        <Drawer
          size="md"
          variant="plain"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          slotProps={{
            content: {
              sx: {
                bgcolor: 'primary.900',
                color: 'white',
                p: 0,
              },
            },
          }}
        >
          <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <img src="/placeholder.svg?height=40&width=40" alt="logo" style={{ height: 40, width: 'auto' }} />
            <Typography level="title-lg" fontWeight="bold">
              Готові бізнеси
            </Typography>
          </Box>
          <ListDivider sx={{ bgcolor: 'primary.800' }} />
          <List
            size="lg"
            sx={{
              '--ListItem-paddingY': '1rem',
              '--ListItem-paddingX': '1.5rem',
            }}
          >
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
                <Avatar size="lg" variant="outlined" sx={{ bgcolor: 'primary.700' }}>
                  <Person />
                </Avatar>
                <Box>
                  <Typography level="title-sm">Користувач</Typography>
                  <Typography level="body-sm">user@example.com</Typography>
                </Box>
              </Box>
            </ListItem>
            <ListDivider sx={{ bgcolor: 'primary.800' }} />
            {menuItems.map((item) => (
              <ListItem key={item.path}>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  selected={isActive(item.path)}
                  sx={{
                    borderRadius: 'md',
                    '&.Mui-selected': {
                      bgcolor: 'primary.700',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {item.icon}
                    <Typography>{item.label}</Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
            <ListDivider sx={{ bgcolor: 'primary.800' }} />
            <ListItem>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  logout();
                }}
                sx={{ borderRadius: 'md' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Logout />
                  <Typography>Вийти з акаунту</Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </Sheet>
  );
};

export default Menu;
