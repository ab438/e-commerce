import { DefaultSession } from "next-auth";

export interface ExtendedUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
  token?: string;
}

// توسيع الـ Session
declare module "next-auth" {
  interface Session {
    user?: ExtendedUser;
    accessToken?: string;
  }
}

// توسيع JWT
declare module "next-auth/jwt" {
  interface JWT {
    user?: ExtendedUser;
    accessToken?: string;
  }
}
