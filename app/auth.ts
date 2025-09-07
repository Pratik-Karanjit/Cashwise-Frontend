import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import api from "./utils/api";

// Define a type for your JWT token
interface MyToken {
  id?: string;
  email?: string;
  role?: string;
  token?: string;
  hasExpenses?: boolean;
}

// Define a type for session.user
interface MySession extends Session {
  user: {
    id: string;
    email: string;
    role: string;
    token: string;
    hasExpenses: boolean;
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

          // Get the user data from the result property
          const userData = res.data?.result;
          
          if (userData) {
            // Return all the user data
            return {
              id: userData._id,
              email: userData.email,
              role: userData.role,
              token: userData.token,
              hasExpenses: userData.hasExpenses
            };
          }
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

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Update token with all user data when signing in
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.token = user.token;
        token.hasExpenses = user.hasExpenses;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // Update session with all user data from token
        session.user = {
          id: token.id,
          email: token.email,
          role: token.role,
          token: token.token,
          hasExpenses: token.hasExpenses
        } as any;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);