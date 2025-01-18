import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import useAuth from '../Auth.logic.ts';

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

  const { validateEmail, validatePassword, validateFullName } = useAuth();

  const onSubmit = (data: SignUpInputs) => {
    console.log(data);

    // TODO: onsubmit sign-up form
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
  };
};

export default useSignUp;