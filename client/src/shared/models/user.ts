export interface GoogleUser {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  logoUrl: string;
}
