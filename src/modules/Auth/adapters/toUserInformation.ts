import type { AuthResponse } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';

export const toUserInformation = (dto: AuthResponse): UserInformation => {
  return {
    access_token: dto.access_token,
    id: dto.user.id,
    name: dto.user.name,
    email: dto.user.email,
    phoneNumber: dto.user.phoneNumber,
  };
};
