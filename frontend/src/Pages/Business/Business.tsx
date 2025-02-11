import { Divider, Typography } from '@mui/material';
import Menu from '../../components/Menu/Menu.tsx';
import StarButton from '../../components/Common/Bookmark/StarButton.tsx';
import {
  AcUnit,
  AddCircle,
  Apartment,
  BeachAccess,
  BusinessRounded,
  Copyright,
  DateRange,
  DeliveryDining,
  EvStation,
  HomeRepairService,
  Instagram,
  Layers,
  LocalAtm,
  LocationOn,
  MonetizationOn,
  Money,
  MoneyOff,
  NightShelter,
  Pix,
  Receipt,
  SupervisorAccount,
  Telegram,
  Timer,
} from '@mui/icons-material';

import businessImage from '../../assets/images/default-image.png';

import './Business.scss';
import Carousel from 'react-material-ui-carousel';
import { NavLink } from 'react-router';
import HtmlRenderer from '../../components/Common/HtmlRenderer/HtmlRenderer.tsx';

const Business = () => {
  const htmlContent = '<p>Hello, world!</p>';

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <div className="row mt-2 d-flex align-items-center">
          <div className="col-8">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <StarButton />
                <Typography variant="h5" className="fw-bold">Назва готового бізнесу</Typography>
              </div>
              <div className="d-flex flex-row align-items-center" style={{
                paddingLeft: '14px',
              }}>
                <div className="d-flex align-items-center gap-1">
                  <LocationOn className="blue-hover-color" />
                  <Typography variant="body2">Локація</Typography>
                </div>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <Typography variant="body2">Категорія</Typography>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <div className="d-flex align-items-center gap-1">
                  <DateRange className="blue-hover-color" />
                  <Typography variant="body2">Останні зміни: дата</Typography>
                </div>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <div className="social-medias">
                  <Telegram className="social-media" />
                  <Instagram className="social-media" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-between align-items-center gap-2">
              <p className="business-card-price">250 000 грн.</p>
            </div>
          </div>
        </div>
        <div className="row d-flex mt-4">
          <div className="col-8">
            <div className="w-100 d-flex justify-content-center">
              <Carousel autoPlay navButtonsAlwaysVisible className="w-100 text-center">
                <img className="business-image" src={businessImage} alt="Фото оголошення" />
                <img className="business-image" src={businessImage} alt="Фото оголошення" />
                <img className="business-image" src={businessImage} alt="Фото оголошення" />
                <img className="business-image" src={businessImage} alt="Фото оголошення" />
              </Carousel>
            </div>
            <div className="mt-3 p-2">
              <HtmlRenderer htmlContent={htmlContent} />
            </div>
          </div>
          <div className="col-4 mb-3">
            <div className="author-profile dashed-border d-flex gap-3">
              {/*TODO: place the route towards author profile */}
              <NavLink to="/">
                <img className="author-image" src={businessImage} alt="Фото автора" />
              </NavLink>
              <div>
                <Typography variant="h6"><b>Ім`я автора</b></Typography>
                <Typography variant="subtitle2">Зареєстрований: Дата</Typography>
                <Typography variant="subtitle2">Кількість продажів: Дата</Typography>
                <Typography variant="subtitle2">Номер телефону: +380 68 33 73 177</Typography>
                <div className="social-medias">
                  <Telegram className="social-media" />
                  <Instagram className="social-media" />
                </div>
              </div>
            </div>
            <div className="dashed-border mt-3">
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Apartment className="blue-hover-color" />
                <Typography variant="subtitle1">Площа приміщення: <b>25 м<sup>2</sup></b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <LocalAtm className="blue-hover-color" />
                <Typography variant="subtitle1">Ціна оренди приміщення: <b>25 000 грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <SupervisorAccount className="blue-hover-color" />
                <Typography variant="subtitle1">Кількість працівників: <b>25</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Money className="blue-hover-color" />
                <Typography variant="subtitle1">Сума витрат на зарплату: <b>25 000
                  грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Receipt className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього чеку: <b>85
                  грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <MonetizationOn className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього виторгу на місяць: <b>85 000
                  грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <AddCircle className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього прибутку на місяць: <b>85 000
                  грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Timer className="blue-hover-color" />
                <Typography variant="subtitle1">
                  Час окупності бізнесу: <b>120 місяців</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <HomeRepairService className="blue-hover-color" />
                <Typography variant="subtitle1">Обладнання: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <NightShelter className="blue-hover-color" />
                <Typography variant="subtitle1">Укриття: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <EvStation className="blue-hover-color" />
                <Typography variant="subtitle1">Генератор чи EcoFlow: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Pix className="blue-hover-color" />
                <Typography variant="subtitle1">Можливий торг: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Copyright className="blue-hover-color" />
                <Typography variant="subtitle1">Підтримка колишнього власника: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <MoneyOff className="blue-hover-color" />
                <Typography variant="subtitle1">ФОП: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Layers className="blue-hover-color" />
                <Typography variant="subtitle1">Група ФОП: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <BusinessRounded className="blue-hover-color" />
                <Typography variant="subtitle1">Конкуренти в межах району: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <AcUnit className="blue-hover-color" />
                <Typography variant="subtitle1">Сезонність: <b>Так</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <BeachAccess className="blue-hover-color" />
                <Typography variant="subtitle1">Сезон: <b>Весна</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 py-2">
                <DeliveryDining className="blue-hover-color" />
                <Typography variant="subtitle1">Сервіси доставки: <b>Так</b></Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Business;