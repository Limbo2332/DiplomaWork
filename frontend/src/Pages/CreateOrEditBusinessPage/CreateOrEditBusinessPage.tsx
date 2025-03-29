import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  Option,
  Select,
  Sheet,
  Stack,
  Tab,
  TabList,
  Tabs,
  Typography,
} from '@mui/joy';
import {
  AddCircle,
  Apartment,
  AttachMoney,
  Category,
  Check,
  Close,
  Description,
  Euro,
  Facebook,
  Info,
  Instagram,
  Link as LinkIcon,
  LocalAtm,
  MonetizationOn,
  Money,
  Public,
  Receipt,
  Save,
  Settings,
  SupervisorAccount,
  Telegram,
  Timer,
  Twitter,
  Upload,
} from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router';
import Menu from '../../components/Menu/Menu';
import { useAuth } from '../../Contexts/authContext';
import useBusinessService from '../../Services/businessesService';
import { useNotification } from '../../Contexts/notificationContext';
import type { ImagePathDto } from '../../Types/BlobImage/imagePathDto';
import { regions } from '../../Data/Regions';
import uah from '../../assets/images/hryvnia.svg';
import { Currency } from '../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';
import CheckboxFilterControl from '../../components/Common/CheckboxFilter/CheckboxFilter.tsx';
import CategoryDropdown from '../../components/Common/CategoryDropdown/CategoryDropdown.tsx';
import RegionCitySelector from '../../components/Common/RegionCitySelector/RegionCitySelector.tsx';

interface BusinessState {
  id?: string;
  name: string;
  location: string;
  category: string;
  price: string;
  currency: Currency;
  area: string;
  rentPrice: string;
  employees: string;
  salaryExpenses: string;
  averageCheck: string;
  averageMonthlyRevenue: string;
  averageMonthlyProfit: string;
  paybackPeriod: string;
  hasEquipment: boolean;
  hasShelter: boolean;
  hasGenerator: boolean;
  isNegotiable: boolean;
  hasPreviousOwnerSupport: boolean;
  hasFop: boolean;
  hasCompetitors: boolean;
  isSeasonal: boolean;
  season: string | null;
  hasDeliveryServices: boolean;
  telegram: string | null;
  instagram: string | null;
  facebook: string | null;
  twitter: string | null;
  site: string | null;
  description: string;
  images: ImagePathDto[] | File[];
}

const FormField = ({ control, name, label, rules = {}, icon, disabled = false, type = 'text', placeholder = '' }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <FormControl error={!!fieldState.error}>
        <Typography level="title-md">{label}</Typography>
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          startDecorator={icon}
          error={!!fieldState.error}
          disabled={disabled}
        />
        {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
      </FormControl>
    )}
  />
);

const seasonMapping = {
  весна: 'spring',
  літо: 'summer',
  осінь: 'autumn',
  зима: 'winter',
};

const getEnglishValue = (ukrainianValue) => {
  return seasonMapping[ukrainianValue?.toLowerCase()] || '';
};

const CreateEditBusiness = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const { control, handleSubmit, setValue, watch, getValues, reset } = useForm<BusinessState>({
    defaultValues: {
      name: '',
      location: '',
      category: '',
      price: '',
      currency: 'UAH',
      area: '',
      rentPrice: '',
      employees: '',
      salaryExpenses: '',
      averageCheck: '',
      averageMonthlyRevenue: '',
      averageMonthlyProfit: '',
      paybackPeriod: '',
      hasEquipment: false,
      hasShelter: false,
      hasGenerator: false,
      isNegotiable: false,
      hasPreviousOwnerSupport: false,
      hasFop: false,
      hasCompetitors: false,
      isSeasonal: false,
      season: '',
      hasDeliveryServices: false,
      telegram: '',
      instagram: '',
      facebook: '',
      twitter: '',
      site: '',
      description: '',
      images: [],
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const { createBusiness, getBusiness, editBusiness, approveBusiness, rejectBusiness } = useBusinessService();
  const { showSuccessNotification } = useNotification();

  const images = watch('images');
  const location = watch('location');
  const category = watch('category');
  console.log(category);
  const isSeasonal = watch('isSeasonal');
  const currency = watch('currency');

  const onDrop = (acceptedFiles: File[]) => {
    const currentImages = getValues('images') as File[];
    setValue('images', [...currentImages, ...acceptedFiles]);

    // Create preview URLs for the new images
    const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    disabled: isAdmin,
  });

  const handleCurrencyChange = (newCurrency: Currency) => {
    setValue('currency', newCurrency);
    setCurrencyMenuOpen(false);
  };

  const onSubmit = async (data: BusinessState) => {
    setIsLoading(true);
    const formDataToSend = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof BusinessState];

        if (Array.isArray(value)) {
          if (value.every((item) => item instanceof File)) {
            value.forEach((file) => {
              formDataToSend.append(key, file as File);
            });
          } else {
            value.forEach((item) => {
              formDataToSend.append(key, item.toString());
            });
          }
        } else if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString());
        }
      }
    }

    if (id) {
      formDataToSend.append('id', id);

      if (data.images) {
        const oldImages = data.images.filter(
          (image) => (image as ImagePathDto)?.id !== undefined,
        ) as ImagePathDto[];
        const newImages = data.images.filter((image) => (image as File)?.name !== undefined) as File[];

        newImages.forEach((file) => {
          formDataToSend.append('newImages', file as File);
        });

        formDataToSend.append('oldImages', JSON.stringify(oldImages));
      }

      await editBusiness(formDataToSend);
    } else {
      await createBusiness(formDataToSend);
    }

    setIsLoading(false);
    showSuccessNotification('Бізнес успішно відправлений на верифікацію!');
    navigate('/');
  };

  const handleApprove = async () => {
    await approveBusiness({
      category,
      businessId: id!,
    });

    navigate('/');
  };

  const handleReject = async () => {
    await rejectBusiness({
      businessId: id!,
    });

    navigate('/');
  };

  useEffect(() => {
    const fetchBusinessInfo = async () => {
      if (!id) return;

      const result = await getBusiness(id);

      if (result?.data) {
        reset({
          name: result.data.name,
          location: result.data.location,
          category: result.data.category,
          price: result.data.price.toString(),
          currency: result.data.priceCurrency,
          area: result.data.area,
          rentPrice: result.data.rentPrice.toString(),
          employees: result.data.employees.toString(),
          salaryExpenses: result.data.salaryExpenses.toString(),
          averageCheck: result.data.averageCheck.toString(),
          averageMonthlyRevenue: result.data.averageMonthlyRevenue.toString(),
          averageMonthlyProfit: result.data.averageMonthlyProfit.toString(),
          paybackPeriod: result.data.timeToPayBack.toString(),
          hasEquipment: result.data.hasEquipment,
          hasShelter: result.data.hasShelter,
          hasGenerator: result.data.hasGenerator,
          isNegotiable: result.data.isNegotiable,
          hasPreviousOwnerSupport: result.data.hasPreviousOwnerSupport,
          hasFop: result.data.hasFop,
          hasCompetitors: result.data.hasCompetitors,
          isSeasonal: result.data.isSeasonal,
          season: result.data.season,
          hasDeliveryServices: result.data.hasDeliveryServices,
          telegram: result.data.telegram,
          instagram: result.data.instagram,
          facebook: result.data.facebook,
          twitter: result.data.twitter,
          site: result.data.site,
          description: result.data.description,
          images: result.data.images,
        });

        // Set preview images for existing images
        if (result.data.images && result.data.images.length > 0) {
          setPreviewImages(result.data.images.map((img: ImagePathDto) => img.path));
        }
      }
    };

    fetchBusinessInfo();
  }, [id]);

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const getCurrencyIcon = () => {
    switch (currency) {
      case 'UAH':
        return <img src={uah} alt="UAH" style={{ width: 20, height: 20 }} />;
      case 'USD':
        return <AttachMoney />;
      case 'EURO':
        return <Euro />;
      default:
        return <AttachMoney />;
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.surface', minHeight: '100vh' }}>
      <Menu />

      <Sheet
        variant="soft"
        color="primary"
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          level="title-lg">{id ? 'Редагування бізнесу' : 'Створення бізнесу'}</Typography>
      </Sheet>

      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(_, value) => setActiveTab(value as number)}
              sx={{ bgcolor: 'background.level1' }}
            >

              <TabList variant="plain" sx={{ p: 0, borderRadius: 0 }}>
                <Tab>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Info fontSize="small" />
                    <span>Основна інформація</span>
                  </Box>
                </Tab>
                <Tab>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MonetizationOn fontSize="small" />
                    <span>Фінансові показники</span>
                  </Box>
                </Tab>
                <Tab>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Settings fontSize="small" />
                    <span>Характеристики</span>
                  </Box>
                </Tab>
                <Tab>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Public fontSize="small" />
                    <span>Соціальні мережі</span>
                  </Box>
                </Tab>
                <Tab>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Description fontSize="small" />
                    <span>Опис та фото</span>
                  </Box>
                </Tab>
              </TabList>

            </Tabs>

            <CardContent sx={{ p: 4 }}>
              {activeTab === 0 && (
                <Grid container spacing={3}>
                  <Grid xs={12}>
                    <FormField
                      control={control}
                      name="name"
                      label="Назва готового бізнесу"
                      rules={{ required: 'Назва готового бізнесу є обов\'язковою' }}
                      icon={<Category />}
                      disabled={isAdmin}
                      placeholder="Введіть назву бізнесу"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="area"
                      label="Площа приміщення (м²)"
                      rules={{
                        required: 'Площа приміщення є обов\'язковою',
                        pattern: { value: /^\d+$/, message: 'Площа приміщення має бути числом' },
                      }}
                      icon={<Apartment />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть площу приміщення"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormControl error={!!control._formState.errors.price}>
                      <Typography level="title-md">Ціна</Typography>
                      <Input
                        placeholder="Введіть ціну"
                        startDecorator={getCurrencyIcon()}
                        endDecorator={
                          <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={() => setCurrencyMenuOpen(true)}
                          >
                            <AttachMoney />
                          </IconButton>
                        }
                        {...control.register('price', {
                          required: 'Ціна є обов\'язковою',
                          pattern: { value: /^\d+$/, message: 'Ціна має бути числом' },
                        })}
                        error={!!control._formState.errors.price}
                        disabled={isAdmin}
                      />
                      {control._formState.errors.price && (
                        <FormHelperText>{control._formState.errors.price.message}</FormHelperText>
                      )}
                    </FormControl>

                    {currencyMenuOpen && (
                      <Card
                        variant="outlined"
                        sx={{
                          position: 'absolute',
                          zIndex: 1,
                          mt: 1,
                          p: 1,
                          boxShadow: 'md',
                        }}
                      >
                        <Stack spacing={1}>
                          <Button
                            variant={currency === 'UAH' ? 'solid' : 'plain'}
                            color="primary"
                            startDecorator={<img src={uah} alt="UAH"
                              style={{ width: 20, height: 20 }} />}
                            onClick={() => handleCurrencyChange('UAH')}
                          >
                            UAH
                          </Button>
                          <Button
                            variant={currency === 'USD' ? 'solid' : 'plain'}
                            color="primary"
                            startDecorator={<AttachMoney />}
                            onClick={() => handleCurrencyChange('USD')}
                          >
                            USD
                          </Button>
                          <Button
                            variant={currency === 'EURO' ? 'solid' : 'plain'}
                            color="primary"
                            startDecorator={<Euro />}
                            onClick={() => handleCurrencyChange('EURO')}
                          >
                            EUR
                          </Button>
                        </Stack>
                      </Card>
                    )}
                  </Grid>

                  <Grid xs={12}>
                    <FormControl>
                      <Typography level="title-md">Розташування</Typography>
                      <RegionCitySelector regions={regions} minWidth="100%"
                        onHandleRegionSelect={(region) => setValue('location', region)}
                        selectedRegion={location}
                      />
                    </FormControl>
                  </Grid>

                  <Grid xs={12}>
                    <FormControl>
                      <Typography level="title-md">Категорія</Typography>
                      <CategoryDropdown
                        initialSelectedOptions={[category]}
                        onOptionsSelected={(options) => setValue('category', options[0])} />
                    </FormControl>
                  </Grid>
                </Grid>
              )}

              {/* Financial Tab */}
              {activeTab === 1 && (
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="rentPrice"
                      label="Ціна оренди приміщення (грн/міс)"
                      rules={{
                        pattern: { value: /^\d+$/, message: 'Ціна оренди приміщення має бути числом' },
                      }}
                      icon={<LocalAtm />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть ціну оренди"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="employees"
                      label="Кількість працівників"
                      rules={{
                        required: 'Кількість працівників є обов\'язковою',
                        pattern: { value: /^\d+$/, message: 'Кількість працівників має бути числом' },
                      }}
                      icon={<SupervisorAccount />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть кількість працівників"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="salaryExpenses"
                      label="Сума витрат на зарплату (грн/міс)"
                      rules={{
                        required: 'Сума витрат на зарплату є обов\'язковою',
                        pattern: { value: /^\d+$/, message: 'Сума витрат на зарплату має бути числом' },
                      }}
                      icon={<Money />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть суму витрат на зарплату"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="averageCheck"
                      label="Сума середнього чеку (грн)"
                      rules={{
                        required: 'Сума середнього чеку є обов\'язковою',
                        pattern: { value: /^\d+$/, message: 'Сума середнього чеку має бути числом' },
                      }}
                      icon={<Receipt />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть суму середнього чеку"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="averageMonthlyRevenue"
                      label="Сума середнього виторгу на місяць (грн)"
                      rules={{
                        required: 'Сума середнього виторгу на місяць є обов\'язковою',
                        pattern: {
                          value: /^\d+$/,
                          message: 'Сума середнього виторгу на місяць має бути числом',
                        },
                      }}
                      icon={<MonetizationOn />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть суму середнього виторгу"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="averageMonthlyProfit"
                      label="Сума середнього прибутку на місяць (грн)"
                      rules={{
                        required: 'Сума середнього прибутку на місяць є обов\'язковою',
                        pattern: {
                          value: /^\d+$/,
                          message: 'Сума середнього прибутку на місяць має бути числом',
                        },
                      }}
                      icon={<AddCircle />}
                      disabled={isAdmin}
                      type="number"
                      placeholder="Введіть суму середнього прибутку"
                    />
                  </Grid>

                  {isAdmin && (
                    <Grid xs={12}>
                      <FormField
                        control={control}
                        name="paybackPeriod"
                        label="Час окупності бізнесу (місяців)"
                        icon={<Timer />}
                        disabled={true}
                      />
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Features Tab */}
              {activeTab === 2 && (
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <Card variant="soft" sx={{ p: 2 }}>
                      <Typography level="title-sm" sx={{ mb: 2 }}>
                        Обладнання та приміщення
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <CheckboxFilterControl
                        onChange={(value) => setValue('hasEquipment', value)}
                        label="Обладнання"
                        disabled={isAdmin}
                        checked={getValues('hasEquipment')}
                      />
                      <CheckboxFilterControl
                        onChange={(value) => setValue('hasShelter', value)}
                        label="Укриття"
                        disabled={isAdmin}
                        checked={getValues('hasShelter')}
                      />
                      <CheckboxFilterControl
                        label="Генератор чи EcoFlow"
                        disabled={isAdmin}
                        onChange={(value) => setValue('hasGenerator', value)}
                        checked={getValues('hasGenerator')}
                      />
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Card variant="soft" sx={{ p: 2 }}>
                      <Typography level="title-sm" sx={{ mb: 2 }}>
                        Умови продажу
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <CheckboxFilterControl
                        label="Можливий торг"
                        disabled={isAdmin}
                        onChange={(value) => setValue('isNegotiable', value)}
                        checked={getValues('isNegotiable')}
                      />
                      <CheckboxFilterControl
                        label="Підтримка колишнього власника"
                        disabled={isAdmin}
                        onChange={(value) => setValue('hasPreviousOwnerSupport', value)}
                        checked={getValues('hasPreviousOwnerSupport')}
                      />
                      <CheckboxFilterControl onChange={(value) => setValue('hasFop', value)}
                        label="ФОП"
                        checked={getValues('hasFop')}
                        disabled={isAdmin} />
                    </Card>
                  </Grid>

                  <Grid xs={12} md={6}>
                    <Card variant="soft" sx={{ p: 2 }}>
                      <Typography level="title-sm" sx={{ mb: 2 }}>
                        Ринкові умови
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <CheckboxFilterControl
                        label="Конкуренти в межах району"
                        disabled={isAdmin}
                        onChange={(value) => setValue('hasCompetitors', value)}
                        checked={getValues('hasCompetitors')}
                      />
                      <CheckboxFilterControl
                        label="Сервіси доставки"
                        disabled={isAdmin}
                        onChange={(value) => setValue('hasDeliveryServices', value)}
                        checked={getValues('hasDeliveryServices')}
                      />
                      <CheckboxFilterControl
                        label="Сезонність"
                        disabled={isAdmin}
                        onChange={(value) => setValue('isSeasonal', value)}
                        checked={getValues('isSeasonal')}
                      />
                    </Card>
                  </Grid>

                  {isSeasonal && (
                    <Grid xs={12} md={6}>
                      <FormControl>
                        <Typography level="title-md">Сезон</Typography>
                        <Select
                          placeholder="Оберіть сезон"
                          value={getEnglishValue(watch('season'))}
                          onChange={(_, value) => setValue('season', value as string)}
                          disabled={isAdmin}
                        >
                          <Option value="spring">Весна</Option>
                          <Option value="summer">Літо</Option>
                          <Option value="autumn">Осінь</Option>
                          <Option value="winter">Зима</Option>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}
                </Grid>
              )}

              {/* Social Media Tab */}
              {activeTab === 3 && (
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="telegram"
                      label="Telegram"
                      icon={<Telegram />}
                      disabled={isAdmin}
                      placeholder="https://t.me/username"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="instagram"
                      label="Instagram"
                      icon={<Instagram />}
                      disabled={isAdmin}
                      placeholder="https://instagram.com/username"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="facebook"
                      label="Facebook"
                      icon={<Facebook />}
                      disabled={isAdmin}
                      placeholder="https://facebook.com/username"
                    />
                  </Grid>

                  <Grid xs={12} md={6}>
                    <FormField
                      control={control}
                      name="twitter"
                      label="Twitter"
                      icon={<Twitter />}
                      disabled={isAdmin}
                      placeholder="https://twitter.com/username"
                    />
                  </Grid>

                  <Grid xs={12}>
                    <FormField
                      control={control}
                      name="site"
                      label="Веб-сайт"
                      icon={<LinkIcon />}
                      disabled={isAdmin}
                      placeholder="https://example.com"
                    />
                  </Grid>
                </Grid>
              )}

              {/* Description and Images Tab */}
              {activeTab === 4 && (
                <Grid container spacing={3}>
                  <Grid xs={12}>
                    <FormControl error={!!control._formState.errors.description}>
                      <Typography level="title-md">Детальний опис бізнесу</Typography>
                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Controller
                          name="description"
                          control={control}
                          rules={{ required: 'Опис є обов\'язковим' }}
                          render={({ field }) => (
                            <ReactQuill
                              {...field}
                              readOnly={isAdmin}
                              style={{
                                height: 200,
                                marginBottom: 50,
                                ...(control._formState.errors.description
                                  ? { border: '1px solid var(--joy-palette-danger-500)' }
                                  : {}),
                              }}
                            />
                          )} />
                      </Box>
                      {control._formState.errors.description && (
                        <FormHelperText>{control._formState.errors.description.message}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid xs={12}>
                    <FormControl>
                      <Typography level="title-md">Фотографії бізнесу</Typography>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 3,
                          mt: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Box
                          {...getRootProps()}
                          sx={{
                            width: '100%',
                            border: '2px dashed',
                            borderColor: 'neutral.outlinedBorder',
                            borderRadius: 'md',
                            p: 3,
                            textAlign: 'center',
                            cursor: isAdmin ? 'default' : 'pointer',
                            '&:hover': {
                              borderColor: isAdmin ? 'neutral.outlinedBorder' : 'primary.500',
                              bgcolor: isAdmin ? 'transparent' : 'action.hover',
                            },
                          }}
                        >
                          <input {...getInputProps()} />
                          <Upload sx={{ fontSize: 40, color: 'primary.500', mb: 1 }} />
                          <Typography level="body-lg" sx={{ mb: 1 }}>
                            Перетягніть файли сюди або клікніть для вибору
                          </Typography>
                          <Typography level="body-sm" sx={{ color: 'text.secondary' }}>
                            Підтримуються формати: JPG, PNG, GIF
                          </Typography>
                        </Box>

                        {previewImages.length > 0 && (
                          <Box sx={{ width: '100%', mt: 2 }}>
                            <Typography level="body-lg" sx={{ mb: 2 }}>
                              Завантажені зображення:
                            </Typography>
                            <Grid container spacing={2}>
                              {previewImages.map((src, index) => (
                                <Grid key={index} xs={6} sm={4} md={3}>
                                  <AspectRatio ratio="1/1" sx={{ borderRadius: 'md', overflow: 'hidden' }}>
                                    <img
                                      src={src}
                                      alt={`Preview ${index}`}
                                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                  </AspectRatio>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                      </Card>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            {isAdmin ? (
              <>
                <Button
                  size="lg"
                  variant="solid"
                  color="success"
                  startDecorator={<Check />}
                  onClick={handleApprove}
                >
                  Опублікувати
                </Button>
                <Button
                  size="lg"
                  variant="solid"
                  color="danger"
                  startDecorator={<Close />}
                  onClick={handleReject}
                >
                  Відмовити
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                size="lg"
                variant="solid"
                color="primary"
                startDecorator={<Save />}
                loading={isLoading}
              >
                Зберегти
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CreateEditBusiness;

