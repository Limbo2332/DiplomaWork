import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const usePasswordInput = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordIcon, setPasswordIcon] = useState(faEye);

  const onPasswordToggle = () => {
    if (passwordType === 'text') {
      setPasswordType('password');
      setPasswordIcon(faEye);
    } else {
      setPasswordType('text');
      setPasswordIcon(faEyeSlash);
    }
  };

  return {
    passwordType,
    onPasswordToggle,
    passwordIcon,
  };
};

export default usePasswordInput;