import './Menu.scss';

import logo from '../../assets/images/logo.png';
import defaultImage from '../../assets/images/default-image.png';
import { NavLink } from 'react-router';
import { Button } from '@mui/joy';
import useMenu from './Menu.logic.ts';

const Menu = () => {
  const { logout } = useMenu();

  return (
    <header className="menu w-100 box-shadow-y">
      <div className="container menu-container">
        <div className="logo-container">
          <NavLink to="/">
            <img alt="logo" src={logo} className="menu-logo ps-2" />
          </NavLink>
          <h3 className="mb-0">Готові бізнеси</h3>
        </div>
        <div className="d-flex flex-row align-items-center box-shadow gap-3">
          <div className="link-container d-flex align-items-center gap-2">
            <Button variant="plain" size="lg" className="h-60px d-flex gap-2">
              <div className="profile-container">
                <img src={defaultImage} alt="Profile Picture" />
              </div>
              <NavLink className="menu-link profile-link" to="/" style={{ fontSize: '1.1rem' }}>
                Мій профіль
              </NavLink>
            </Button>
          </div>
          <div className="link-container d-flex align-items-center gap-2">
            <Button
              variant="plain"
              size="lg"
              className="h-60px menu-link"
              onClick={logout}
              style={{ fontSize: '1.1rem' }}
            >
              Вийти з акаунту
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Menu;