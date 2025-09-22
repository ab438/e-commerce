// src/app/api/auth/[...nextauth]/authOptions.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// شكل الـ user الراجع من API
export interface ExtendedUser {
  id: string;
  name?: string;
  email: string;
  role?: string;
  token?: string;
}

// توسيع للـ session و JWT
declare module "next-auth" {
  interface Session {
    user?: ExtendedUser;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: ExtendedUser;
    accessToken?: string;
  }
}

export const authOptions: NextAuthOptions = {
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (res.ok && data?.token && data?.user) {
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            token: data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as ExtendedUser;
        token.accessToken = (user as ExtendedUser).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as ExtendedUser;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
