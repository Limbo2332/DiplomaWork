import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useAuthValidation from '../Auth.logic.ts';
import { useAuth } from '../../../Contexts/authContext.tsx';

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

  const [isLoading, setIsLoading] = useState(false);

  const { validateEmail, validatePassword } = useAuthValidation();
  const { loginUser } = useAuth();

  const [openResetPasswordModel, setOpenResetPasswordModel] = useState(false);

  const onSubmit = async (data: SignInInputs) => {
    setIsLoading(true);

    await loginUser(data.email, data.password);

    setIsLoading(false);
  };

  // TODO: rework validationErrors from backend
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
    isLoading,
  };
};

export default useSignIn;