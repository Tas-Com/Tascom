import type { AuthResponse } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';

export const toUserInformation = (dto: AuthResponse): UserInformation => {
  return {
    access_token: dto.data.token,
    id: dto.data.user.id,
    name: dto.data.user.name,
    email: dto.data.user.email,
    phoneNumber: dto.data.user.phoneNumber,
  };
};
