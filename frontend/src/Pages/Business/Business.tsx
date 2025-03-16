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
  Facebook,
  HomeRepairService,
  Instagram,
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
  Twitter,
  Web,
} from '@mui/icons-material';

import './Business.scss';
import Carousel from 'react-material-ui-carousel';
import { Link, NavLink, useParams } from 'react-router';
import HtmlRenderer from '../../components/Common/HtmlRenderer/HtmlRenderer.tsx';
import { useEffect, useState } from 'react';
import useBusinessService from '../../Services/businessesService.ts';
import { BusinessDto } from '../../Types/Businesses/businessDto.ts';
import { Loading } from '../../components/Common/Loading/Loading.tsx';
import { currencyToStringRepresentation } from '../../components/Common/Card/Card.tsx';

import defaultImage from '../../assets/images/default-image.png';
import formatNumberWithSpacesManual from '../../Utils/numberUtils.ts';

const Business = () => {
  const { id } = useParams();
  const { getBusiness } = useBusinessService();

  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState<BusinessDto | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setIsLoading(true);

      const business = await getBusiness(id!);

      if (business?.data) {
        setBusiness(business.data);
      }


      setIsLoading(false);
    };

    fetchBusiness();
  }, [id]);

  if (!business || isLoading || !id) {
    return <Loading />;
  }

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <div className="row mt-2 d-flex align-items-center">
          <div className="col-8">
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center">
                <StarButton postId={id} defaultValue={business.isSaved} />
                <Typography variant="h5" className="fw-bold">{business.name}</Typography>
              </div>
              <div className="d-flex flex-row align-items-center" style={{
                paddingLeft: '14px',
              }}>
                <div className="d-flex align-items-center gap-1">
                  <LocationOn className="blue-hover-color" />
                  <Typography variant="body2">{business.location}</Typography>
                </div>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <Typography variant="body2">{business.category}</Typography>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <div className="d-flex align-items-center gap-1">
                  <DateRange className="blue-hover-color" />
                  <Typography variant="body2">Останні
                    зміни: {new Date(business.updatedAt).toLocaleDateString()}</Typography>
                </div>
                <Divider orientation="vertical" flexItem className="mx-2 blue-hover-color" />
                <div className="social-medias">
                  {business.telegram && (
                    <Link to={business.telegram} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Telegram />
                    </Link>
                  )}
                  {business.instagram && (
                    <Link to={business.instagram} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Instagram />
                    </Link>
                  )}
                  {business.twitter && (
                    <Link to={business.twitter} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Twitter />
                    </Link>
                  )}
                  {business.facebook && (
                    <Link to={business.facebook} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Facebook />
                    </Link>
                  )}
                  {business.site && (
                    <Link to={business.site} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Web />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-between align-items-center gap-2">
              <p
                className="business-card-price">{formatNumberWithSpacesManual(business.price)} {currencyToStringRepresentation(business.priceCurrency)}</p>
            </div>
          </div>
        </div>
        <div className="row d-flex mt-4">
          <div className="col-8">
            <div className="w-100 d-flex justify-content-center">
              <Carousel autoPlay navButtonsAlwaysVisible className="w-100 text-center">
                {business.images.map((image) => (
                  <img key={image.id} className="business-image" src={image.path} alt="Фото оголошення" />
                ))}
              </Carousel>
            </div>
            <div className="mt-3 p-2">
              <HtmlRenderer htmlContent={business.description} />
            </div>
          </div>
          <div className="col-4 mb-3">
            <div className="author-profile dashed-border d-flex gap-3">
              <NavLink to={`/authors/${business.authorId}`}>
                <img className="author-image" src={business.authorImagePreview ?? defaultImage} alt="Фото автора" />
              </NavLink>
              <div>
                <Typography variant="h6"><b>{business.authorName}</b></Typography>
                <Typography
                  variant="subtitle2">Зареєстрований: {new Date(business.authorRegistrationDate).toLocaleDateString()}</Typography>
                {business.authorPhoneNumber && (
                  <Typography variant="subtitle2">Номер телефону: {business.authorPhoneNumber}</Typography>)}
                <div className="social-medias">
                  {business.authorTelegram && (
                    <Link to={business.authorTelegram} target="_blank" rel="noopener noreferrer"
                      className="social-media">
                      <Telegram />
                    </Link>
                  )}
                  {business.authorInstagram && (
                    <Link to={business.authorInstagram} target="_blank" rel="noopener noreferrer"
                      className="social-media">
                      <Instagram />
                    </Link>
                  )}
                  {business.authorTwitter && (
                    <Link to={business.authorTwitter} target="_blank" rel="noopener noreferrer"
                      className="social-media">
                      <Twitter />
                    </Link>
                  )}
                  {business.authorFacebook && (
                    <Link to={business.authorFacebook} target="_blank" rel="noopener noreferrer"
                      className="social-media">
                      <Facebook />
                    </Link>
                  )}
                  {business.authorSite && (
                    <Link to={business.authorSite} target="_blank" rel="noopener noreferrer" className="social-media">
                      <Web />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="dashed-border mt-3">
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Apartment className="blue-hover-color" />
                <Typography variant="subtitle1">Площа приміщення: <b>{business.area} м<sup>2</sup></b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <LocalAtm className="blue-hover-color" />
                <Typography variant="subtitle1">Ціна оренди приміщення: <b>{business.rentPrice} грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <SupervisorAccount className="blue-hover-color" />
                <Typography variant="subtitle1">Кількість працівників: <b>{business.employees}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Money className="blue-hover-color" />
                <Typography variant="subtitle1">Сума витрат на
                  зарплату: <b>{business.salaryExpenses} грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Receipt className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього чеку: <b>{business.averageCheck}
                  {' '} грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <MonetizationOn className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього виторгу на місяць: <b>{business.averageMonthlyRevenue}
                  {' '} грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <AddCircle className="blue-hover-color" />
                <Typography variant="subtitle1">Сума середнього прибутку на місяць: <b>{business.averageMonthlyProfit}
                  {' '} грн.</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Timer className="blue-hover-color" />
                <Typography variant="subtitle1">
                  Час окупності бізнесу: <b>{business.timeToPayBack} місяців</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <HomeRepairService className="blue-hover-color" />
                <Typography variant="subtitle1">Обладнання: <b>{business.hasEquipment ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <NightShelter className="blue-hover-color" />
                <Typography variant="subtitle1">Укриття: <b>{business.hasShelter ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <EvStation className="blue-hover-color" />
                <Typography variant="subtitle1">Генератор чи
                  EcoFlow: <b>{business.hasGenerator ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Pix className="blue-hover-color" />
                <Typography variant="subtitle1">Можливий
                  торг: <b>{business.isNegotiable ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <Copyright className="blue-hover-color" />
                <Typography variant="subtitle1">Підтримка колишнього
                  власника: <b>{business.hasPreviousOwnerSupport ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <MoneyOff className="blue-hover-color" />
                <Typography variant="subtitle1">ФОП: <b>{business.hasFop ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <BusinessRounded className="blue-hover-color" />
                <Typography variant="subtitle1">Конкуренти в межах
                  району: <b>{business.hasCompetitors ? 'Так' : 'Ні'}</b></Typography>
              </div>
              <div className="d-flex align-items-center gap-2 px-3 pt-2">
                <AcUnit className="blue-hover-color" />
                <Typography variant="subtitle1">Сезонність: <b>{business.isSeasonal ? 'Так' : 'Ні'}</b></Typography>
              </div>
              {business.isSeasonal && (
                <div className="d-flex align-items-center gap-2 px-3 pt-2">
                  <BeachAccess className="blue-hover-color" />
                  <Typography variant="subtitle1">Сезон: <b>{business.season}</b></Typography>
                </div>
              )}
              <div className="d-flex align-items-center gap-2 px-3 py-2">
                <DeliveryDining className="blue-hover-color" />
                <Typography variant="subtitle1">Сервіси
                  доставки: <b>{business.hasDeliveryServices ? 'Так' : 'Ні'}</b></Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Business;