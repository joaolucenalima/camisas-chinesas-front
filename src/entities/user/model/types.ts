export interface User {
  id: string;
  name: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface UserLogin {
  name: string;
  password: string;
}
