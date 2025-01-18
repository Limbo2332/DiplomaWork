import React from 'react';
import { IconButton, Input } from '@mui/joy';
import { Control, Controller, FieldValues, Path, PathValue, Validate } from 'react-hook-form';
import usePasswordInput from './PasswordInput.logic.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface PasswordInputProps<T extends FieldValues> {
  inputId?: string;
  name: Path<T>;
  placeholder: string;
  control: Control<T>;
  validatePassword: Validate<PathValue<T, Path<T>>, T>;
}

const PasswordInput = <T extends FieldValues>({
  inputId,
  name,
  placeholder,
  control,
  validatePassword,
}: PasswordInputProps<T>) => {
  const { passwordType, onPasswordToggle, passwordIcon } = usePasswordInput();

  return (
    <Controller
      control={control}
      name={name}
      rules={
        {
          validate: validatePassword,
        }
      }
      render={({ field }) => (
        (
          <Input
            {...field}
            id={inputId}
            type={passwordType}
            placeholder={placeholder}
            endDecorator={
              <div>
                <IconButton onClick={onPasswordToggle} size="md">
                  <FontAwesomeIcon icon={passwordIcon} />
                </IconButton>
              </div>
            }
          />
        ))}
    />
  );
};


export default PasswordInput;