export type UserDto = {
  id: string;
  email: string;
  fullName: string;
  profileImagePath: string | null;
  isAdmin: boolean;
  isExpert: boolean;
}