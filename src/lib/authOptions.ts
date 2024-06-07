import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import client from "./prismadb";
import bcrypt from "bcrypt"
import { Role } from "@/config/enum";

export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing credentials")
                }

                const user = await client.user.findFirst({
                    where: {
                        email: credentials.email
                    }, include :{
                        company: true
                    }
                })

                if (!user || !user.id || !user.hashedPassword) {
                    throw new Error("Invalid credentials")
                }

                const currentPasswordHash = await bcrypt.hash(credentials.password, user.hashedPassword)

                if (!currentPasswordHash) {
                    throw new Error("Invalid credentials")
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role as Role,
                    company: user.company.name
                };
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },

    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.role = token.role;
                session.user.company = token.company
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.role = user.role;
                token.company = user.company
            }
            return token;
        }
    },

    debug: process.env.NODE_ENV === "production"
}