import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useAuthValidation from '../Auth.logic.ts';
import { useAuth } from '../../../Contexts/authContext.tsx';

type SignUpInputs = {
  email: string;
  password: string;
  repeatPassword: string;
  fullName: string;
}

const useSignUp = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<SignUpInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  });

  const { validateEmail, validatePassword, validateFullName } = useAuthValidation();
  const { registerUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignUpInputs) => {
    setIsLoading(true);

    await registerUser(data.email, data.fullName, data.password);

    setIsLoading(false);
  };

  const validationErrors: string[] = useMemo(() => {
    return Array.from(new Set([errors.email?.message, errors.password?.message, errors.fullName?.message, errors.repeatPassword?.message].filter(
      (message): message is string => !!message,
    )));
  }, [errors.email, errors.password, errors.fullName, errors.repeatPassword]);

  const validateRepeatPassword = (repeatPassword: string, formValues: SignUpInputs) => {
    if (repeatPassword !== formValues.password) {
      return 'Паролі повинні співпадати.';
    }

    return true;
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    control,
    validateEmail,
    validatePassword,
    validateFullName,
    validateRepeatPassword,
    isLoading,
  };
};

export default useSignUp;