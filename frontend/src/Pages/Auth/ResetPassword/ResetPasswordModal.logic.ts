import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import useAuthValidation from '../Auth.logic.ts';
import useAuthService from '../../../Services/authService.ts';
import { useNotification } from '../../../Contexts/notificationContext.tsx';
import { useAuth } from '../../../Contexts/authContext.tsx';

type ResetPasswordInputs = {
  email: string;
}

export interface ResetPasswordModalProps {
  closeModal: () => void;
}

const useResetPasswordModal = ({
  closeModal,
}: ResetPasswordModalProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResetPasswordInputs>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {},
  });

  const [isLoading, setIsLoading] = useState(false);

  const { validateEmail } = useAuthValidation();
  const { token } = useAuth();
  const { resetPassword } = useAuthService({ token });
  const { showSuccessNotification, showErrorNotification } = useNotification();

  const onSubmit = async (data: ResetPasswordInputs) => {
    setIsLoading(true);

    const result = await resetPassword(data);

    if (result.isOk) {
      showSuccessNotification('Електронний лист для скидання пароля успішно надіслано!');
    } else {
      showErrorNotification('Щось пішло не так. Спробуйте пізніше.');
    }

    setIsLoading(false);
    reset();
    closeModal();
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
    isLoading,
  };
};

export default useResetPasswordModal;