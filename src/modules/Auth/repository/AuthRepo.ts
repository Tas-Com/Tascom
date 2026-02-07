import type { AuthRequest, RegisterRequest } from "../dto/AuthDto";
import type { UserInformation } from "../entities/Auth";

export interface AuthRepo {
  login: (request: AuthRequest) => Promise<UserInformation>;
  register: (request: RegisterRequest) => Promise<UserInformation>;
  logout: () => Promise<void>;
}
