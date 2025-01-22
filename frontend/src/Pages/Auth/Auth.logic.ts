import { emailRegex, fullNameRegex, passwordRegex } from '../../Validation/Regexes.ts';

const useAuthValidation = () => {
  const validateEmail = (email?: string) => {
    if (!email) {
      return 'Пошта обов\'язкова для заповнення.';
    }

    if (!email.match(emailRegex)) {
      return 'Пошта повинна бути в коректному форматі.';
    }

    return true;
  };

  const validatePassword = (password?: string) => {
    if (!password) {
      return 'Пароль обов\'язковий для заповнення.';
    }

    if (!password.match(passwordRegex)) {
      return 'Пароль повинен містити принаймні 1 цифру, 1 букву у верхньому та нижньому регістрах та 1 спеціальний символ.';
    }

    return true;
  };

  const validateFullName = (fullName?: string) => {
    if (!fullName) {
      return 'Повне ім\'я обов\'язкове для заповнення.';
    }

    if (!fullName.match(fullNameRegex)) {
      return 'Повне ім\'я повинне містити лише символи українського алфавіту.';
    }

    return true;
  };

  return { validateEmail, validatePassword, validateFullName };
};

export default useAuthValidation;