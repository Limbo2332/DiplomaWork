export type SetProfileDto = {
  profileImage: File | null;
  description?: string;
  phoneNumber?: string;
  personalSiteLink?: string;
  telegramLink?: string;
  instagramLink?: string;
  facebookLink?: string;
  twitterLink?: string;
}