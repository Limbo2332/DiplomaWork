import { Button, Input } from '@mui/joy';

import '../../Auth/Auth.scss';
import PasswordInput from '../../../components/Common/PasswordInput/PasswordInput.tsx';

import authBg from '../../../assets/images/auth-bg.png';
import useSignUp from './SignUp.logic.ts';
import { NavLink } from 'react-router';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    control,
    validateEmail,
    validatePassword,
    validateRepeatPassword,
    validateFullName,
    isLoading,
  } = useSignUp();

  return (
    <main className="main">
      <div className="main-container d-flex align-items-center justify-content-center">
        <div className="sign-container d-flex flex-column">
          <div className="text-center d-flex flex-column align-items-center">
            <h1>Зареєструвати акаунт</h1>
            <p className="description">Зареєструйте акаунт, щоб мати можливість створювати оголошення.</p>
          </div>
          <form id="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column gap-3">
              <Input id="sign-up-fullName"
                placeholder="Повне ім'я українською"
                {...register('fullName', {
                  validate: validateFullName,
                })}
              />
              <Input id="sign-up-email"
                placeholder="Пошта"
                {...register('email', {
                  validate: validateEmail,
                })}
              />
              <PasswordInput
                inputId="sign-up-password"
                name="password"
                placeholder="Пароль"
                control={control}
                validatePassword={validatePassword}
              />
              <PasswordInput
                inputId="sign-up-repeat-password"
                name="repeatPassword"
                placeholder="Повторити пароль"
                control={control}
                validatePassword={validateRepeatPassword}
              />
            </div>

            <div className="validation-errors">
              {validationErrors.length > 0 &&
                (<ul>
                  {validationErrors.map((error: string) => (
                    <li key={error}>{error}</li>
                  ))
                  }
                </ul>)
              }
            </div>
            <div className="forgot-block d-flex flex-column align-items-center justify-content-center gap-2">
              <NavLink to="/auth/login" className="forgot d-block">Уже зареєстровані?</NavLink>
            </div>
            <div className="submit text-center">
              <Button className="mt-3 fw-bold" type="submit" color="success" size="lg"
                loading={isLoading}>Реєстрація</Button>
            </div>
          </form>
        </div>
        <img src={authBg} alt="background" className="auth-bg" />
      </div>
    </main>
  );
};

export default SignUp;