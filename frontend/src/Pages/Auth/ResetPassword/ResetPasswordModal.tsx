import { Button, Input, Modal, ModalClose, ModalDialog } from '@mui/joy';

import '../../Auth/Auth.scss';
import useResetPasswordModal from './ResetPasswordModal.logic.ts';

export interface ResetPasswordModalProps {
  open: boolean;
  closeModal: () => void;
}

const ResetPasswordModal = ({
  open,
  closeModal,
}: ResetPasswordModalProps) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    validationErrors,
    validateEmail,
  } = useResetPasswordModal();

  return (
    <Modal open={open}>
      <ModalDialog>
        <ModalClose color="danger" onClick={closeModal} />
        <div className="sign-container d-flex flex-column">
          <div className="text-center d-flex flex-column align-items-center">
            <h1>Відновити пароль</h1>
            <p className="description">Введіть Вашу пошту і ми надішлемо вам нове посилання для відновлення паролю.</p>
          </div>
          <form id="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column gap-3">
              <Input id="reset-password-email"
                placeholder="Пошта"
                {...register('email', {
                  validate: validateEmail,
                })}
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
            <div className="submit text-center">
              <Button className="mt-3 fw-bold" type="submit" color="success" size="lg">Відновити пароль</Button>
            </div>
          </form>
        </div>
      </ModalDialog>
    </Modal>
  );
};

export default ResetPasswordModal;