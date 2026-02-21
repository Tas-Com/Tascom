import type { User } from "@/modules/Auth/dto/AuthDto";

export interface UsersRepo {
  getById(id: string): Promise<User>;
  updateUser(id: string, data: FormData): Promise<User>;
}
