import { axiosInstance } from "@/api/axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const Backend_URL = "https://listing-backend-z4i5.onrender.com"

// async function refreshToken(token: JWT): Promise<JWT> {
//     const res = await fetch(Backend_URL + "/auth/refresh", {
//         method: "POST",
//         headers: {
//             authorization: `Refresh ${token.backendTokens.refreshToken}`,
//         },
//     });
//     console.log("refreshed");

//     const response = await res.json();

//     return {
//         ...token,
//         backendTokens: response,
//     };
// }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "maaan.ahmed.org@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                console.log("🚀 ~ authorize ~ credentials:", credentials)
                if (!credentials?.email || !credentials?.password) return null;
                const { email, password } = credentials;
                const res = await axiosInstance.post(Backend_URL + "/user/login/customer", {
                    email, password
                });
                console.log("🚀 ~ authorize ~ res:", res)
                if (!res.data.token) {
                    return null;
                }
                return res.data
            },
        }),
    ],
    pages: {
        signIn: '/auth/sign-in',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };

            return token
        },
        async session({ token, session }) {
            console.log("🚀 ~ session ~ token:", token)
            session.backendToken = token
            return session
        },
    },
    secret: '78zFZvyspgAIBXPKdA0AhFqcNWXX16/CEmBFOHU3iOg='
};

export default (req: any, res: any) => {
    const handler = NextAuth(authOptions);
    return handler(req, res)
}

