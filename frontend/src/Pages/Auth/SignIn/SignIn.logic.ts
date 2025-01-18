import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useAuth from '../Auth.logic.ts';

type SignInInputs = {
  email: string;
  password: string;
}

const useSignIn = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<SignInInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  });

  const { validateEmail, validatePassword } = useAuth();

  const [openResetPasswordModel, setOpenResetPasswordModel] = useState(false);

  const onSubmit = (data: SignInInputs) => {
    console.log(data);

    // TODO: onsubmit sign-in form
  };

  const validationErrors: string[] = useMemo(() => {
    return Array.from(new Set([errors.email?.message, errors.password?.message].filter(
      (message): message is string => !!message,
    )));
  }, [errors.email, errors.password]);

  const validateEmailField = (email?: string) => {
    if (typeof validateEmail(email) === 'string') {
      return 'Неправильна пошта та/або пароль';
    }

    return true;
  };

  const validatePasswordField = (password?: string) => {
    if (typeof validatePassword(password) === 'string') {
      return 'Неправильна пошта та/або пароль';
    }

    return true;
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    control,
    validateEmailField,
    validatePasswordField,
    openResetPasswordModel,
    setOpenResetPasswordModel,
  };
};

export default useSignIn;