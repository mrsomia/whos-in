import { pool } from "$/db/db";
import { pg } from "@lucia-auth/adapter-postgresql";
import { passwordToken } from "@lucia-auth/tokens";
import lucia from "lucia-auth";
import { web } from "lucia-auth/middleware";
import "lucia-auth/polyfill/node";

export const auth = lucia({
  adapter: pg(pool),
  env: process.env.NODE_ENV == "production" ? "PROD" : "DEV",
  middleware: web(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
    };
  },
});

export const otpToken = passwordToken(auth, "otp", {
  expiresIn: 60 * 10, // expiration in 10 mins,
  length: 6, // defualt is 8
});

export type Auth = typeof auth;
