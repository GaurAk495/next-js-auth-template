import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prismaclient";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./sendEmail";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET! as string,
      accessType: "offline",
    },
    github: {
      prompt: "select_account",
      clientId: process.env.NEXT_GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.NEXT_GITHUB_CLIENT_SECRET! as string,
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
  },
  trustedOrigins: ["http://localhost:3000"],
  plugins: [nextCookies()],
});
