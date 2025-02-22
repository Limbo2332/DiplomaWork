import { UserDto } from '../User/userDto.ts';
import { AccessTokenDto } from './accessTokenDto.ts';

export type AuthUserDto = {
  user: UserDto;
  token: AccessTokenDto;
}