import type { User } from "@/modules/Auth/dto/AuthDto";

export interface UsersRepo {
  getById(id: string): Promise<User>;
}
