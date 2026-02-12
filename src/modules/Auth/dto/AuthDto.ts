export type AuthResponse = {
  success: boolean;
  data: { user: User, token: string };
};

export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  role: string;
  facebookId?: string;
  googleId?: string;
  pointsBalance: number;
  isDeleted: boolean;
  ratingAvg: number;
  about: string;
  skills: string;
  createdAt: Date;
  DOB?: Date;
  gender?: string;
  provider?: string;
  avatar?: string;
  tokenVersion: number;
  resetPasswordExpires?: Date;
  resetPasswordToken?: string;
  latitude: number;
  longitude: number;
  location: string;
};

export type AuthRequest = {
  name?: string;
  phoneNumber?: string;
  email: string;
  password: string;
  location?: string;
};
