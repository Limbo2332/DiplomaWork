import React, { useState } from 'react';
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

interface BusinessState {
  name: string;
  location: string;
  category: string;
  lastUpdated: string;
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
  equipment: boolean;
  shelter: boolean;
  generator: boolean;
  negotiable: boolean;
  previousOwnerSupport: boolean;
  fop: boolean;
  fopGroup: boolean;
  competitors: boolean;
  seasonality: boolean;
  season: string;
  deliveryServices: boolean;
  authorName: string;
  authorRegistrationDate: string;
  authorSalesCount: string;
  authorPhoneNumber: string;
  authorTelegram: string;
  authorInstagram: string;
  authorFacebook: string;
  authorTwitter: string;
  authorSite: string;
  description: string;
  images: File[];
}

const CreateEditBusiness: React.FC = () => {
  const { control, handleSubmit, setValue, watch, getValues } = useForm<BusinessState>({
    defaultValues: {
      name: '',
      location: '',
      category: '',
      lastUpdated: '',
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
      equipment: false,
      shelter: false,
      generator: false,
      negotiable: false,
      previousOwnerSupport: false,
      fop: false,
      fopGroup: false,
      competitors: false,
      seasonality: false,
      season: '',
      deliveryServices: false,
      authorName: '',
      authorRegistrationDate: '',
      authorSalesCount: '',
      authorPhoneNumber: '',
      authorTelegram: '',
      authorInstagram: '',
      authorFacebook: '',
      authorTwitter: '',
      description: '',
      images: [],
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const images = watch('images');

  const onDrop = (acceptedFiles: File[]) => {
    const currentImages = getValues('images');
    setValue('images', [...currentImages, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCurrencyChange = (currency: Currency) => {
    setValue('currency', currency);
    setAnchorEl(null);
  };

  const onSubmit = (data: BusinessState) => {
    console.log('Business data:', data);
  };

  return (
    <main className="main">
      <Menu />
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row justify-content-center mt-2">
            <div className="col-8">
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
              />
            </div>
            <div className="col-8">
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
                name="equipment"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Обладнання"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="shelter"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Укриття"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="generator"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Генератор чи EcoFlow"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="negotiable"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Можливий торг"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="previousOwnerSupport"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Підтримка колишнього власника"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="fop"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="ФОП"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="competitors"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Конкуренти в межах району"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="seasonality"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Сезонність"
                  />
                )}
              />
            </div>
            {watch('seasonality') && (
              <div className="col-8">
                <Controller
                  name="season"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Сезон</InputLabel>
                      <Select {...field} label="Сезон">
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
                name="deliveryServices"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Сервіси доставки"
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="authorTelegram"
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
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="authorInstagram"
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
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="authorFacebook"
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
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="authorTwitter"
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
                  />
                )}
              />
            </div>
            <div className="col-8">
              <Controller
                name="authorSite"
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
                  />
                )}
              />
            </div>
            <div className="col-8 mt-3">
              <Controller
                name="description"
                control={control}
                rules={{ required: 'Опис є обов\'язковим' }}
                render={({ field, fieldState }) => (
                  <ReactQuill
                    {...field}
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
                    />
                    <label htmlFor="raised-button-file">
                      <Button variant="contained" component="span">
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
                  {images.map((file, index) => (
                    <img
                      key={index}
                      className="business-image"
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index}`}
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  ))}
                </Carousel>
              </div>
            )}
            <div className="col-8 mt-3 text-center mb-4">
              <Button type="submit" variant="contained" color="primary">
                Зберегти
              </Button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateEditBusiness;
