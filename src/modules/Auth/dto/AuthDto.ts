export type AuthResponse = {
  message: string;
  access_token: string;
  user: User;
};
export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
};

export type AuthRequest = {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  location?: string;
};
