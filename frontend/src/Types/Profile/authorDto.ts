export type AuthorDto = {
  id: string;
  name: string;
  description: string;
  avatarPreview?: string;
  registrationDate: Date;
  phoneNumber?: string;
  email: string;
  telegram?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  site?: string;
}