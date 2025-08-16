// auth.ts
import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import api from "./utils/api";


// Define a type for your JWT token
interface MyToken {
  id?: string;
  email?: string;
  role?: string;
  accessToken?: string;
}

// Define a type for session.user
interface MySession extends Session {
  user: {
    id: string;
    email: string;
    role: string;
    token: string;
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await api.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.data?.result) return res.data.result;
          return null;
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      const t = token as MyToken;
      if (user) {
        t.id = (user as any).id;
        t.email = (user as any).email;
        t.role = (user as any).role;
        t.accessToken = (user as any).token;
      }
      return t;
    },

    async session({ session, token }) {
      const t = token as MyToken;
      const s = session as MySession;

      if (t.id && t.email && t.role && t.accessToken) {
        s.user = {
          id: t.id,
          email: t.email,
          role: t.role,
          token: t.accessToken,
        };
      }
      return s;
    },
  },
};

export default NextAuth(authOptions);
