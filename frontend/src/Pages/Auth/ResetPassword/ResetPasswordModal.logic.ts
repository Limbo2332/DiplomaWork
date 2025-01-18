import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import useAuth from '../Auth.logic.ts';

type ResetPasswordInputs = {
  email: string;
}

const useResetPasswordModal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  });

  const { validateEmail } = useAuth();

  const onSubmit = (data: ResetPasswordInputs) => {
    console.log(data);

    // TODO: onsubmit reset password form
  };

  const validationErrors: string[] = useMemo(() => {
    return Array.from(new Set([errors.email?.message].filter(
      (message): message is string => !!message,
    )));
  }, [errors.email]);

  return {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    validateEmail,
  };
};

export default useResetPasswordModal;