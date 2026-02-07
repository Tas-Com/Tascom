import type { AuthResponse } from "../dto/AuthDto";
import type { UserInformation } from "../entities/Auth";

export const toUserInformation = (dto: AuthResponse): UserInformation => {
  const { user } = dto.data;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    phoneNumber: user.phoneNumber,
    pointsBalance: user.pointsBalance,
    ratingAvg: user.ratingAvg,
    about: user.about,
    skills: user.skills,
    avatar: user.avatar,
    location: user.location,
  };
};
