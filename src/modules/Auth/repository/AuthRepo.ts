import type { AuthRequest } from '../dto/AuthDto';
import type { UserInformation } from '../entities/Auth';

export interface AuthRepo {
  login: (request: AuthRequest) => Promise<UserInformation>;
  register: (request: AuthRequest) => Promise<UserInformation>;
}
