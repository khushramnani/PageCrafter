import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModal from "@/models/users";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModal.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("plz verified your account before login");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization:{
        params:{
          prompt:"consent",
          access_type:"offline",
          response_type:"code"
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user , account }) {
      await dbConnect();

      if (user && account?.provider !== "credentials") {
      const existingUser = await UserModal.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = await UserModal.create({
          email: user.email,
          username: user.name || user.email?.split("@")[0],
          isVerified: true, // Social users can be assumed verified
          profilePicture: user.image,
        });

        token._id = (newUser._id as unknown as { toString: () => string }).toString();
        token.isVerified = newUser.isVerified;
        token.username = newUser.username;
        token.email = newUser.email;
      } else {
        token._id = (existingUser._id as { toString: () => string }).toString();
        token.isVerified = existingUser.isVerified;
        token.username = existingUser.username;
        token.email = existingUser.email;
      }
    }

      if (user && account?.provider === "credentials") {
      token._id = user.id?.toString();
      token.isVerified = user.isVerified;
      token.username = user.username;
      token.email = user.email;
    }

    return token;
  },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        (session.user.isVerified = token.isVerified),
          (session.user.username = token.username);
        session.user.email = token.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
