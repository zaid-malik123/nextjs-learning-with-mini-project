import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import User from "@/models/user.model";
import { connectDb } from "./db";

export const authOptions: NextAuthOptions = {

  providers: [

    // ----------------------------
    // 1️⃣ Credentials Login
    // ----------------------------
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email or password missing");
        }

        await connectDb();

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.userName,
          image: user.image,
        };
      },
    }),

    // ----------------------------
    // 2️⃣ Google Login
    // ----------------------------
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // ----------------------------------------
  // Callbacks (Chalti hai jab login hota hai)
  // ----------------------------------------
  callbacks: {
    async signIn({ account, user }) {

      // only runs for google login
      if (account?.provider === "google") {
        await connectDb();

        const existUser = await User.findOne({ email: user.email });

        if (!existUser) {
          // create new google user
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
          });

          user.id = newUser._id.toString();
        } else {
          // existing user
          user.id = existUser._id.toString();
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.JWT_SECRET,
};
