import { BlobImageDto } from '../BlobImage/blobImageDto';

export type UserDto = {
  id: string;
  email: string;
  fullName: string;
  profileImage: BlobImageDto | null;
  isAdmin: boolean;
}