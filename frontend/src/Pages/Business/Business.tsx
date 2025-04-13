import type React from 'react';
import { useEffect, useState } from 'react';
import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Divider,
  Grid,
  IconButton,
  Tab,
  TabList,
  Tabs,
  Tooltip,
  Typography,
} from '@mui/joy';
import {
  AcUnit,
  AddCircle,
  Apartment,
  BeachAccess,
  BusinessRounded,
  Call,
  Chat,
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
  Receipt,
  SupervisorAccount,
  Telegram,
  Timer,
  Twitter,
  Verified,
  Web,
} from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router';
import useBusinessService from '../../Services/businessesService';
import type { BusinessDto } from '../../Types/Businesses/businessDto';
import { Loading } from '../../components/Common/Loading/Loading';
import { currencyToStringRepresentation } from '../../components/Common/Card/Card';
import formatNumberWithSpacesManual from '../../Utils/numberUtils';
import HtmlRenderer from '../../components/Common/HtmlRenderer/HtmlRenderer';
import Recommendation from '../../components/Recommendation/Recommendation.tsx';

import defaultImage from '../../assets/images/default-image.png';
import Menu from '../../components/Menu/Menu.tsx';
import StarButton from '../../components/Common/Bookmark/StarButton.tsx';
import { RecommendationDto } from '../../Types/Recommendation/recommendationDto.ts';
import ExpertEvaluationsTab from '../../components/Common/ExpertEvaluation/ExpertEvaluationsTab.tsx';

// Image gallery component
const ImageGallery = ({ images }: { images: Array<{ id: string; path: string }> }) => {
  const [activeImage, setActiveImage] = useState(images[0].path);

  return (
    <Box sx={{ width: '100%' }}>
      <AspectRatio ratio="16/9" sx={{ mb: 2, borderRadius: 'lg', overflow: 'hidden' }}>
        <img src={activeImage} alt="Main business image" style={{ objectFit: 'cover' }} />
      </AspectRatio>
      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
        {images.map((image) => (
          <Box
            key={image.id}
            onClick={() => setActiveImage(image.path)}
            sx={{
              width: 80,
              flexShrink: 0,
              cursor: 'pointer',
              borderRadius: 'md',
              overflow: 'hidden',
              border: activeImage === image.path ? '2px solid' : '2px solid transparent',
              borderColor: 'primary.500',
            }}
          >
            <AspectRatio ratio="1/1">
              <img src={image.path} alt="Thumbnail" style={{ objectFit: 'cover' }} />
            </AspectRatio>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Business feature item component
const FeatureItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
    <Box sx={{ color: 'primary.600' }}>{icon}</Box>
    <Box sx={{ flex: 1 }}>
      <Typography level="body-sm" color="neutral">
        {label}
      </Typography>
      <Typography level="body-md" fontWeight="md">
        {value}
      </Typography>
    </Box>
  </Box>
);

// Social media link component
const SocialLink = ({ icon, url }: { icon: React.ReactNode; url: string }) => {
  if (!url) return null;
  return (
    <IconButton
      component={Link}
      to={url}
      target="_blank"
      rel="noopener noreferrer"
      variant="soft"
      color="neutral"
      size="sm"
    >
      {icon}
    </IconButton>
  );
};

// Tab content components
const DescriptionTab = ({ business }: { business: BusinessDto }) => (
  <Box sx={{ p: 3 }}>
    <ImageGallery images={business.images} />
    <Box sx={{ mt: 3 }}>
      <HtmlRenderer htmlContent={business.description} />
    </Box>
  </Box>
);

const FinancialTab = ({ business }: { business: BusinessDto }) => (
  <Box sx={{ p: 3 }}>
    <Typography level="title-lg" sx={{ mb: 3 }}>
      Фінансові показники
    </Typography>
    <Grid container spacing={2}>
      <Grid xs={12} sm={6}>
        <Card variant="soft" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="title-sm" sx={{ mb: 2 }}>
              Витрати
            </Typography>
            <FeatureItem icon={<LocalAtm />} label="Ціна оренди приміщення" value={`${business.rentPrice} грн/міс`} />
            <FeatureItem icon={<Money />} label="Витрати на зарплату" value={`${business.salaryExpenses} грн/міс`} />
            <FeatureItem icon={<SupervisorAccount />} label="Кількість працівників" value={business.employees} />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card variant="soft" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="title-sm" sx={{ mb: 2 }}>
              Доходи
            </Typography>
            <FeatureItem icon={<Receipt />} label="Середній чек" value={`${business.averageCheck} грн`} />
            <FeatureItem
              icon={<MonetizationOn />}
              label="Середній виторг на місяць"
              value={`${business.averageMonthlyRevenue} грн`}
            />
            <FeatureItem
              icon={<AddCircle />}
              label="Середній прибуток на місяць"
              value={`${business.averageMonthlyProfit} грн`}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const FeaturesTab = ({ business }: { business: BusinessDto }) => (
  <Box sx={{ p: 3 }}>
    <Typography level="title-lg" sx={{ mb: 3 }}>
      Характеристики бізнесу
    </Typography>
    <Grid container spacing={2}>
      <Grid xs={12} sm={6}>
        <Card variant="soft" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="title-sm" sx={{ mb: 2 }}>
              Приміщення та обладнання
            </Typography>
            <FeatureItem
              icon={<Apartment />}
              label="Площа приміщення"
              value={
                <>
                  {business.area} м<sup>2</sup>
                </>
              }
            />
            <FeatureItem icon={<HomeRepairService />} label="Обладнання" value={business.hasEquipment ? 'Так' : 'Ні'} />
            <FeatureItem icon={<NightShelter />} label="Укриття" value={business.hasShelter ? 'Так' : 'Ні'} />
            <FeatureItem
              icon={<EvStation />}
              label="Генератор чи EcoFlow"
              value={business.hasGenerator ? 'Так' : 'Ні'}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={12} sm={6}>
        <Card variant="soft" sx={{ height: '100%' }}>
          <CardContent>
            <Typography level="title-sm" sx={{ mb: 2 }}>
              Бізнес-умови
            </Typography>
            <FeatureItem
              icon={<Copyright />}
              label="Підтримка колишнього власника"
              value={business.hasPreviousOwnerSupport ? 'Так' : 'Ні'}
            />
            <FeatureItem icon={<MoneyOff />} label="ФОП" value={business.hasFop ? 'Так' : 'Ні'} />
            <FeatureItem
              icon={<BusinessRounded />}
              label="Конкуренти в межах району"
              value={business.hasCompetitors ? 'Так' : 'Ні'}
            />
            <FeatureItem icon={<AcUnit />} label="Сезонність" value={business.isSeasonal ? 'Так' : 'Ні'} />
            {business.isSeasonal && <FeatureItem icon={<BeachAccess />} label="Сезон" value={business.season} />}
            <FeatureItem
              icon={<DeliveryDining />}
              label="Сервіси доставки"
              value={business.hasDeliveryServices ? 'Так' : 'Ні'}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Box>
);

const AIAnalysisTab = ({ aiRecommendation }: { aiRecommendation: RecommendationDto }) => (
  <Box sx={{ p: 3 }}>
    <Recommendation
      recommendation={aiRecommendation}
    />
  </Box>
);

const BusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBusiness } = useBusinessService();
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [business, setBusiness] = useState<BusinessDto | null>(null);

  useEffect(() => {
    const fetchBusiness = async () => {
      setIsLoading(true);

      const business = await getBusiness(id!);

      if (business?.data) {
        setBusiness(business.data);
        setIsFavorite(business.data.isSaved);
      }

      setIsLoading(false);
    };

    fetchBusiness();
  }, [id]);

  if (!business || isLoading || !id) {
    return <Loading />;
  }

  return (
    <>
      <Menu />

      <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
          {/* Business Header */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent sx={{ pb: 0 }}>
              <Grid container spacing={2}>
                <Grid xs={12} md={8}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <div className="d-flex align-items-center gap-2">
                        <Typography level="h3">{business.name}</Typography>
                        <Chip size="sm" variant="soft" color="success" startDecorator={<Verified />}>
                          Перевірено
                        </Chip>
                      </div>
                      <StarButton postId={business.id} defaultValue={business.isSaved} />
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={<LocationOn fontSize="small" />}
                        sx={{ borderRadius: 'full' }}
                      >
                        {business.location}
                      </Chip>
                      <Chip variant="soft" size="sm" sx={{ borderRadius: 'full' }}>
                        {business.category}
                      </Chip>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={<DateRange fontSize="small" />}
                        sx={{ borderRadius: 'full' }}
                      >
                        Оновлено: {new Date(business.updatedAt).toLocaleDateString()}
                      </Chip>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {business.telegram && <SocialLink icon={<Telegram />} url={business.telegram} />}
                      {business.instagram && <SocialLink icon={<Instagram />} url={business.instagram} />}
                      {business.twitter && <SocialLink icon={<Twitter />} url={business.twitter} />}
                      {business.facebook && <SocialLink icon={<Facebook />} url={business.facebook} />}
                      {business.site && <SocialLink icon={<Web />} url={business.site} />}
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} md={4}>
                  <Card variant="solid" color="primary" invertedColors sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography level="h2" sx={{ mb: 1 }}>
                        {formatNumberWithSpacesManual(business.price)}{' '}
                        {currencyToStringRepresentation(business.priceCurrency)}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip variant="soft" startDecorator={<Timer fontSize="small" />} sx={{ borderRadius: 'full' }}>
                          Окупність: {business.timeToPayBack} міс.
                        </Chip>
                        {business.isNegotiable && (
                          <Chip variant="soft" sx={{ borderRadius: 'full' }}>
                            Можливий торг
                          </Chip>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid xs={12} md={8}>
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardOverflow>
                  <Tabs
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value as number)}
                    sx={{ bgcolor: 'background.level1' }}
                  >
                    <TabList variant="plain" sx={{ p: 0, borderRadius: 0 }}>
                      <Tab>Опис</Tab>
                      <Tab>Фінансові показники</Tab>
                      <Tab>Характеристики</Tab>
                      <Tab>AI Аналіз</Tab>
                      <Tab>Експертні оцінки</Tab>
                    </TabList>
                  </Tabs>
                </CardOverflow>

                <Box>
                  {activeTab === 0 && <DescriptionTab business={business} />}
                  {activeTab === 1 && <FinancialTab business={business} />}
                  {activeTab === 2 && <FeaturesTab business={business} />}
                  {activeTab === 3 && business.aiRecommendation &&
                    <AIAnalysisTab aiRecommendation={business.aiRecommendation} />}
                  {activeTab === 4 && <ExpertEvaluationsTab businessId={business.id} />}
                </Box>
              </Card>
            </Grid>

            {/* Right Column */}
            <Grid xs={12} md={4}>
              {/* Author Card */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography level="title-md" sx={{ mb: 2 }}>
                    Продавець
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                      src={business.authorImagePreview ?? defaultImage}
                      size="lg"
                      variant="outlined"
                      sx={{ border: '2px solid', borderColor: 'primary.500', cursor: 'pointer' }}
                      onClick={() => navigate(`/authors/${business?.authorId}`)}
                    />
                    <Box>
                      <Typography level="title-sm">{business.authorName}</Typography>
                      <Typography level="body-sm" sx={{ mb: 1 }}>
                        На платформі з {new Date(business.authorRegistrationDate).toLocaleDateString()}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {business.authorTelegram && <SocialLink icon={<Telegram />} url={business.authorTelegram} />}
                        {business.authorInstagram && <SocialLink icon={<Instagram />} url={business.authorInstagram} />}
                        {business.authorTwitter && <SocialLink icon={<Twitter />} url={business.authorTwitter} />}
                        {business.authorFacebook && <SocialLink icon={<Facebook />} url={business.authorFacebook} />}
                        {business.authorSite && <SocialLink icon={<Web />} url={business.authorSite} />}
                      </Box>
                    </Box>
                  </Box>
                  {business.authorPhoneNumber && (
                    <Button
                      variant="outlined"
                      color="neutral"
                      fullWidth
                      startDecorator={<Call />}
                      sx={{ mt: 2, borderRadius: 'full' }}
                    >
                      {business.authorPhoneNumber}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* AI Score Summary Card */}
              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography level="title-md" sx={{ mb: 2 }}>
                    AI Оцінка
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      mb: 2,
                    }}
                  >
                    <Badge
                      badgeContent={`${business.aiRecommendation!.ratingScore}/100`}
                      color={business.aiRecommendation!.ratingScore >= 75 ? 'success' : business.aiRecommendation!.ratingScore >= 60 ? 'primary' : 'warning'}
                      size="lg"
                      sx={{
                        '& .MuiBadge-badge': {
                          fontSize: '1rem',
                          height: 'auto',
                          minWidth: '3rem',
                          borderRadius: '1rem',
                          p: 1,
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          bgcolor: business.aiRecommendation!.ratingScore >= 75 ? 'success.100' : business.aiRecommendation!.ratingScore >= 60 ? 'primary.100' : 'warning.100',
                          color: business.aiRecommendation!.ratingScore >= 75 ? 'success.700' : business.aiRecommendation!.ratingScore >= 60 ? 'primary.700' : 'warning.700',
                          fontSize: '2rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {business.aiRecommendation!.ratingScore}
                      </Avatar>
                    </Badge>
                    <Typography level="title-sm" sx={{ mt: 2 }}>
                      {business.aiRecommendation!.ratingScore >= 90
                        ? 'Відмінна інвестиція'
                        : business.aiRecommendation!.ratingScore >= 75
                          ? 'Гарна інвестиція'
                          : business.aiRecommendation!.ratingScore >= 60
                            ? 'Задовільна інвестиція'
                            : business.aiRecommendation!.ratingScore >= 45
                              ? 'Посередня інвестиція'
                              : 'Ризикована інвестиція'}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography level="body-sm" sx={{ mb: 1 }}>
                    Ключові переваги:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {business.aiRecommendation?.pluses.slice(0, 2).map((strength, index) => (
                      <Chip key={index} size="sm" variant="soft" color="success" sx={{ borderRadius: 'full' }}>
                        {strength.length > 30 ? strength.substring(0, 30) + '...' : strength}
                      </Chip>
                    ))}
                  </Box>
                  <Button
                    variant="plain"
                    color="primary"
                    fullWidth
                    onClick={() => setActiveTab(3)}
                    sx={{ borderRadius: 'full' }}
                  >
                    Детальний аналіз
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Floating Action Buttons */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            display: { xs: 'flex', md: 'none' },
            gap: 1,
            zIndex: 10,
          }}
        >
          <Tooltip title="Зателефонувати" placement="top">
            <IconButton size="lg" variant="solid" color="success" aria-label="Call">
              <Call />
            </IconButton>
          </Tooltip>
          <Tooltip title="Написати" placement="top">
            <IconButton size="lg" variant="solid" color="primary" aria-label="Message">
              <Chat />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
};

export default BusinessPage;

