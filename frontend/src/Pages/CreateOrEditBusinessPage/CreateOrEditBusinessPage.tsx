import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  AddCircle,
  Apartment,
  AttachMoney,
  Euro,
  Facebook,
  Instagram,
  Link,
  LocalAtm,
  MonetizationOn,
  Money,
  Receipt,
  SupervisorAccount,
  Telegram,
  Timer,
  Twitter,
} from '@mui/icons-material';
import { Controller, useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Carousel from 'react-material-ui-carousel';
import CurrencyDropdown, { Currency } from '../../components/Common/CurrencyDropdown/CurrencyDropdown.tsx';
import uah from '../../assets/images/hryvnia.svg';
import Menu from '../../components/Menu/Menu.tsx';
import RegionCitySelector from '../../components/Common/RegionCitySelector/RegionCitySelector.tsx';
import { regions } from '../../Data/Regions.ts';
import CategoryDropdown from '../../components/Common/CategoryDropdown/CategoryDropdown.tsx';
import { useAuth } from '../../Contexts/authContext.tsx';
import useBusinessService from '../../Services/businessesService.ts';
import { useNotification } from '../../Contexts/notificationContext.tsx';
import { useNavigate, useParams } from 'react-router';
import { ImagePathDto } from '../../Types/BlobImage/imagePathDto.ts';

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

const seasonMapping = {
  весна: 'spring',
  літо: 'summer',
  осінь: 'autumn',
  зима: 'winter',
};

const getEnglishValue = (ukrainianValue) => {
  return seasonMapping[ukrainianValue.toLowerCase()] || '';
};

const CreateEditBusiness: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const images = watch('images');
  const location = watch('location');
  const category = watch('category');

  const { isAdmin } = useAuth();

  const { id } = useParams();

  const { createBusiness, getBusiness, editBusiness, approveBusiness, rejectBusiness } = useBusinessService();
  const { showSuccessNotification } = useNotification();

  const onDrop = (acceptedFiles: File[]) => {
    const currentImages = getValues('images') as File[];
    setValue('images', [...currentImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCurrencyChange = (currency: Currency) => {
    setValue('currency', currency);
    setAnchorEl(null);
  };

  const onSubmit = async (data: BusinessState) => {
    setIsLoading(true);
    const formDataToSend = new FormData();

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key as keyof BusinessState];

        if (Array.isArray(value)) {
          if (value.every(item => item instanceof File)) {
            value.forEach(file => {
              formDataToSend.append(key, file as File);
            });
          } else {
            value.forEach(item => {
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
        const oldImages = data.images.filter(image => (image as ImagePathDto)?.id !== undefined) as ImagePathDto[];
        const newImages = data.images.filter(image => (image as File)?.name !== undefined) as File[];

        newImages.forEach(file => {
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
      const result = await getBusiness(id!);

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
      }
    };

    fetchBusinessInfo();
  }, []);

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center mt-2">
            {isAdmin && (
              <div className="col-8 mt-3 d-flex justify-content-center">
                <CategoryDropdown
                  multiSelect={false}
                  onOptionsSelected={(options: string[]) => setValue('category', options[0])}
                  initialSelectedOptions={[]}
                />
              </div>
            )}
            <div className="col-8 mt-2">
              <Controller
                name="name"
                control={control}
                rules={{ required: 'Назва готового бізнесу є обов\'язковою' }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Назва готового бізнесу"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8 mt-2">
              <RegionCitySelector
                height="56px"
                minWidth="100%"
                maxWidth="100%"
                border="1px solid rgba(0, 0, 0, 0.23)"
                backgroundColor="inherit"
                regions={regions}
                disabled={isAdmin}
                selectedRegion={location}
                onHandleRegionSelect={(region: string) => setValue('location', region)}
              />
            </div>
            <div className="col-8 mt-2">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Ціна є обов\'язковою',
                  minLength: { value: 1, message: 'Ціна має бути принаймні 1 символ' },
                  pattern: { value: /^\d+$/, message: 'Ціна має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Ціна"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                              {watch('currency') === 'UAH' ? (
                                <img src={uah} alt="uah" className="img-uah" />
                              ) : watch('currency') === 'USD' ? (
                                <AttachMoney className="img-usd" />
                              ) : (
                                <Euro className="img-eur" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
              <CurrencyDropdown
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                handleCurrencyChange={handleCurrencyChange}
              />
            </div>
            <div className="col-8">
              <Controller
                name="area"
                control={control}
                rules={{
                  required: 'Площа приміщення є обов\'язковою',
                  pattern: { value: /^\d+$/, message: 'Площа приміщення має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Площа приміщення"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Apartment className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="rentPrice"
                control={control}
                rules={{ pattern: { value: /^\d+$/, message: 'Ціна оренди приміщення має бути числом' } }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Ціна оренди приміщення"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalAtm className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="employees"
                control={control}
                rules={{
                  required: 'Кількість працівників є обов\'язковою',
                  pattern: { value: /^\d+$/, message: 'Кількість працівників має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Кількість працівників"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SupervisorAccount className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="salaryExpenses"
                control={control}
                rules={{
                  required: 'Сума витрат на зарплату є обов\'язковою',
                  pattern: { value: /^\d+$/, message: 'Сума витрат на зарплату має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Сума витрат на зарплату"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Money className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="averageCheck"
                control={control}
                rules={{
                  required: 'Сума середнього чеку є обов\'язковою',
                  minLength: { value: 1, message: 'Сума середнього чеку має бути принаймні 1 символ' },
                  pattern: { value: /^\d+$/, message: 'Сума середнього чеку має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Сума середнього чеку"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Receipt className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="averageMonthlyRevenue"
                control={control}
                rules={{
                  required: 'Сума середнього виторгу на місяць є обов\'язковою',
                  pattern: { value: /^\d+$/, message: 'Сума середнього виторгу на місяць має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Сума середнього виторгу на місяць"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MonetizationOn className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="averageMonthlyProfit"
                control={control}
                rules={{
                  required: 'Сума середнього прибутку на місяць є обов\'язковою',
                  pattern: { value: /^\d+$/, message: 'Сума середнього прибутку на місяць має бути числом' },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Сума середнього прибутку на місяць"
                      variant="outlined"
                      margin="normal"
                      error={!!fieldState.error}
                      sx={fieldState.error ? { marginBottom: 0 } : {}}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddCircle className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                      disabled={isAdmin}
                    />
                    <FormHelperText error sx={{ mx: 0 }}>
                      {fieldState.error?.message}
                    </FormHelperText>
                  </>
                )}
              />
            </div>
            {isAdmin && (
              <div className="col-8">
                <Controller
                  name="paybackPeriod"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      className="custom-input"
                      label="Час окупності бізнесу"
                      variant="outlined"
                      margin="normal"
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Timer className="blue-hover-color" style={{ marginRight: '10px' }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </div>
            )}
            <div className="col-8">
              <Controller
                name="hasEquipment"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Обладнання"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="hasShelter"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Укриття"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="hasGenerator"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Генератор чи EcoFlow"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="isNegotiable"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Можливий торг"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="hasPreviousOwnerSupport"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Підтримка колишнього власника"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="hasFop"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="ФОП"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="hasCompetitors"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Конкуренти в межах району"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="isSeasonal"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Сезонність"
                  />
                )}
              />
            </div>
            {watch('isSeasonal') && (
              <div className="col-8">
                <Controller
                  name="season"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Сезон</InputLabel>
                      <Select {...field} label="Сезон" disabled={isAdmin} value={getEnglishValue(field.value)}>
                        <MenuItem value="spring">Весна</MenuItem>
                        <MenuItem value="summer">Літо</MenuItem>
                        <MenuItem value="autumn">Осінь</MenuItem>
                        <MenuItem value="winter">Зима</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              </div>
            )}
            <div className="col-8">
              <Controller
                name="hasDeliveryServices"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} disabled={isAdmin} checked={field.value} />}
                    label="Сервіси доставки"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="telegram"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    className="custom-input"
                    label="Telegram"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Telegram className="blue-hover-color" style={{ marginRight: '10px' }} />
                        </InputAdornment>
                      ),
                    }}
                    disabled={isAdmin}
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="instagram"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    className="custom-input"
                    label="Instagram"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Instagram className="blue-hover-color" style={{ marginRight: '10px' }} />
                        </InputAdornment>
                      ),
                    }}
                    disabled={isAdmin}
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="facebook"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    className="custom-input"
                    label="Facebook"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Facebook className="blue-hover-color" style={{ marginRight: '10px' }} />
                        </InputAdornment>
                      ),
                    }}
                    disabled={isAdmin}
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="twitter"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    className="custom-input"
                    label="Twitter"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Twitter className="blue-hover-color" style={{ marginRight: '10px' }} />
                        </InputAdornment>
                      ),
                    }}
                    disabled={isAdmin}
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="site"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    className="custom-input"
                    label="Сайт"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Link className="blue-hover-color" style={{ marginRight: '10px' }} />
                        </InputAdornment>
                      ),
                    }}
                    disabled={isAdmin}
                  />
                )}
              />
            </div>
            <div className="col-8 mt-3">
              <Controller
                name="description"
                control={control}
                disabled={isAdmin}
                rules={{ required: 'Опис є обов\'язковим' }}
                render={({ field, fieldState }) => (
                  <ReactQuill
                    {...field}
                    readOnly={isAdmin}
                    style={
                      fieldState.error?.message ?
                        { border: '1px solid #d32f2f' }
                        : {}}
                  />
                )}
              />
            </div>
            <div className="col-8 mt-3">
              <Controller
                name="images"
                control={control}
                render={({ fieldState }) => (
                  <div {...getRootProps({ className: 'dropzone' })}
                    onClick={event => event.stopPropagation()}
                    style={{ margin: '20px', textAlign: 'center' }}>
                    <input
                      {...getInputProps()}
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="raised-button-file"
                      multiple
                      type="file"
                      disabled={isAdmin}
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="contained" component="span" hidden={isAdmin}>
                        Завантажити зображення
                      </Button>
                    </label>
                  </div>
                )}
              />
            </div>
            {images.length > 0 && (
              <div className="col-8 w-100 d-flex justify-content-center mt-3">
                <Carousel autoPlay navButtonsAlwaysVisible className="w-100 text-center">
                  {images.map((image, index) => {
                    const src = image instanceof File
                      ? URL.createObjectURL(image)
                      : image.path;

                    return (
                      <img
                        key={index}
                        className="business-image"
                        src={src}
                        alt={`Preview ${index}`}
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                      />
                    );
                  })}
                </Carousel>
              </div>
            )}
            <div className="col-8 mt-3 text-center mb-4">
              {isAdmin ? (
                <>
                  <Button variant="contained" color="primary" onClick={handleApprove} style={{ marginRight: '10px' }}>
                    Опублікувати
                  </Button>
                  <Button variant="contained" color="error" onClick={handleReject}>
                    Відмовити
                  </Button>
                </>
              ) : (
                <Button type="submit" variant="contained" color="primary" loading={isLoading}>
                  Зберегти
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEditBusiness;
