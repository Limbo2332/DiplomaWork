import { Button, Input } from '@mui/joy';

import '../../Auth/Auth.scss';
import useSignIn from './SignIn.logic.ts';
import PasswordInput from '../../../components/Common/PasswordInput/PasswordInput.tsx';

import authBg from '../../../assets/images/auth-bg.png';
import { NavLink } from 'react-router';
import ResetPasswordModal from '../ResetPassword/ResetPasswordModal.tsx';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    control,
    validateEmailField,
    validatePasswordField,
    openResetPasswordModel,
    setOpenResetPasswordModel,
    isLoading,
  } = useSignIn();

  return (
    <>
      <main className="main">
        <div className="main-container d-flex align-items-center justify-content-center">
          <div className="sign-container d-flex flex-column">
            <div className="text-center">
              <h1>Ввійти в акаунт</h1>
              <p className="description">Увійдіть в акаунт, щоб мати можливість створювати оголошення.</p>
            </div>
            <form id="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex flex-column gap-3">
                <Input id="sign-in-email"
                  placeholder="Пошта"
                  {...register('email', {
                    validate: validateEmailField,
                  })}
                />
                <PasswordInput
                  inputId="sign-in-password"
                  name="password"
                  placeholder="Пароль"
                  control={control}
                  validatePassword={validatePasswordField}
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
                <a className="forgot d-block" onClick={() => setOpenResetPasswordModel(true)}>Забули пароль?</a>
                <NavLink to="/auth/register" className="forgot d-block">Немає акаунту?</NavLink>
              </div>
              <div className="submit text-center">
                <Button className="mt-3 fw-bold" type="submit" color="success" size="lg"
                  loading={isLoading}>Логін</Button>
              </div>
            </form>
          </div>
          <img src={authBg} alt="background" className="auth-bg" />
        </div>
      </main>
      <ResetPasswordModal open={openResetPasswordModel} closeModal={() => setOpenResetPasswordModel(false)} />
    </>
  );
};

export default SignIn;