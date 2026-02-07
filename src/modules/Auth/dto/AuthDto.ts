export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  password: string;
}

export interface UserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  facebookId: string | null;
  googleId: string | null;
  pointsBalance: number;
  isDeleted: boolean;
  ratingAvg: number;
  about: string;
  skills: string;
  createdAt: object;
  DOB: string | null;
  gender: string | null;
  provider: string | null;
  avatar: string | null;
  tokenVersion: number;
  latitude: number;
  longitude: number;
  location: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: UserDto;
    token: string;
  };
}
