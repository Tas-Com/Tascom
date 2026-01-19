export type Register = {
  message: string;
  access_token: string;
  user: User;
};
export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
};
