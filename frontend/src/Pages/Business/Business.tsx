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
  Sheet,
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
  ArrowBack,
  BeachAccess,
  BusinessRounded,
  Call,
  Chat,
  Copyright,
  DateRange,
  DeliveryDining,
  EvStation,
  Facebook,
  Favorite,
  FavoriteBorder,
  HomeRepairService,
  Instagram,
  LocalAtm,
  LocationOn,
  MonetizationOn,
  Money,
  MoneyOff,
  NightShelter,
  Receipt,
  Share,
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

const AIAnalysisTab = ({ aiRecommendation }: { aiRecommendation: any }) => (
  <Box sx={{ p: 3 }}>
    <Recommendation
      scores={aiRecommendation.scores}
      recommendations={aiRecommendation.recommendations}
      strengths={aiRecommendation.strengths}
      weaknesses={aiRecommendation.weaknesses}
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

  // Example AI recommendation data - in a real app, this would come from your API
  const aiRecommendation = {
    scores: {
      location: 8, // out of 10
      financial: 24, // out of 30
      adaptation: 7, // out of 10
      team: 12, // out of 15
      ownerSupport: 4, // out of 5
      popularity: 8, // out of 10
      aiEvaluation: 16, // out of 20
    },
    recommendations: [
      'Розгляньте можливість розширення асортименту для збільшення середнього чеку.',
      'Інвестуйте в маркетинг для підвищення впізнаваності бренду.',
      'Оптимізуйте витрати на оренду шляхом перегляду умов договору.',
    ],
    strengths: [
      'Вигідне розташування з високою прохідністю.',
      'Стабільний прибуток з потенціалом зростання.',
      'Добре навчений персонал з низькою плинністю.',
    ],
    weaknesses: ['Висока конкуренція в районі.', 'Сезонні коливання попиту.', 'Обмежений простір для розширення.'],
  };

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

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Here you would call your API to save/unsave the business
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: business.name,
          text: `Check out this business: ${business.name}`,
          url: window.location.href,
        })
        .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      // Show a toast notification that the link was copied
    }
  };

  const totalScore = Object.values(aiRecommendation.scores).reduce((sum, score) => sum + score, 0);

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      {/* Header */}
      <Sheet
        variant="solid"
        color="primary"
        invertedColors
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton variant="soft" color="neutral" onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
        <Typography level="title-lg">Перегляд бізнесу</Typography>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <IconButton variant="soft" color="neutral" onClick={handleFavoriteToggle}>
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton variant="soft" color="neutral" onClick={handleShare}>
            <Share />
          </IconButton>
        </Box>
      </Sheet>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        {/* Business Header */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent sx={{ pb: 0 }}>
            <Grid container spacing={2}>
              <Grid xs={12} md={8}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography level="h3">{business.name}</Typography>
                    <Chip size="sm" variant="soft" color="success" startDecorator={<Verified />}>
                      Перевірено
                    </Chip>
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
                  </TabList>
                </Tabs>
              </CardOverflow>

              {/* Fixed: Using conditional rendering instead of TabPanel components */}
              <Box>
                {activeTab === 0 && <DescriptionTab business={business} />}
                {activeTab === 1 && <FinancialTab business={business} />}
                {activeTab === 2 && <FeaturesTab business={business} />}
                {activeTab === 3 && <AIAnalysisTab aiRecommendation={aiRecommendation} />}
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
                    badgeContent={`${totalScore}/100`}
                    color={totalScore >= 75 ? 'success' : totalScore >= 60 ? 'primary' : 'warning'}
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
                        bgcolor: totalScore >= 75 ? 'success.100' : totalScore >= 60 ? 'primary.100' : 'warning.100',
                        color: totalScore >= 75 ? 'success.700' : totalScore >= 60 ? 'primary.700' : 'warning.700',
                        fontSize: '2rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {totalScore}
                    </Avatar>
                  </Badge>
                  <Typography level="title-sm" sx={{ mt: 2 }}>
                    {totalScore >= 90
                      ? 'Відмінна інвестиція'
                      : totalScore >= 75
                        ? 'Гарна інвестиція'
                        : totalScore >= 60
                          ? 'Задовільна інвестиція'
                          : totalScore >= 45
                            ? 'Посередня інвестиція'
                            : 'Ризикована інвестиція'}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography level="body-sm" sx={{ mb: 1 }}>
                  Ключові переваги:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {aiRecommendation.strengths.slice(0, 2).map((strength, index) => (
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
  );
};

export default BusinessPage;

