import { GetServerSidePropsContext } from "next";
import { getServerSession, NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "~/server/db";
import { User } from "@prisma/client";

const jwtSecret = process.env.NEXTAUTH_SECRET;
import bcrypt from "bcryptjs";
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			name: string;
			email: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: User;
	}
}

export const authOptions: NextAuthOptions = {
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) token.user = user as User;
			return token;
		},
		session: ({ session, token }: any) => {
			if (session.user) session.user = token.user;
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
	},
	adapter: PrismaAdapter(db),
	secret: jwtSecret,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password }: any = credentials;
					if (!email || !password) {
						throw new Error("Email and password are required.");
					}
					const user = await db.user.findFirst({ where: { email } });
					if (user) {
						const validPassword = await bcrypt.compare(password, user.password);
						if (!validPassword) {
							throw new Error("Invalid email or password.");
						}
						return user;
					} else {
						throw new Error(`Authentication failed: Invalid user`);
					}
				} catch (error: any) {
					throw new Error(`Authentication failed: ${error.message}`);
				}
			},
		}),
	],
};

export const getServerAuthSession = (ctx: GetServerSidePropsContext) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
