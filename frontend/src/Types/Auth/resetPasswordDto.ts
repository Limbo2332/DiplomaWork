export type ResetPasswordDto = {
  email: string;
  emailToken: string;
  newPassword: string;
}