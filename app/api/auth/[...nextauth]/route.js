import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error("No credentials provided");
          return null;
        }

        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.error("User not found with email:", credentials.email);
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            console.error("Password mismatch for user:", user.email);
            throw new Error("Email or password is incorrect");
          }

          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Error during authentication:", error.message);
          throw new Error("Error during authentication");
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Redirect here on error
  },
  debug: true,
};

const handler = (req, res) => NextAuth(req, res, authOptions);

export { handler as GET, handler as POST };
