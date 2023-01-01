import jwt from "jsonwebtoken"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import NextAuth, { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const clientid = process.env.NEXT_TWITTER_API_KEY as string
const clientsecret = process.env.NEXT_TWITTER_API_SECRET as string
export default NextAuth({
        // https://next-auth.js.org/configuration/providers
        providers: [
                TwitterProvider({
                        clientId: clientid,
                        clientSecret: clientsecret
                })],
        adapter: SupabaseAdapter({
                url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
                secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
        }),
        callbacks: {
                async session({ session, user }) {
                        const signingSecret = process.env.SUPABASE_JWT_SECRET as string


                        if (signingSecret) {
                                const payload = {
                                        aud: "authenticated",
                                        exp: Math.floor(new Date(session.expires).getTime() / 1000),
                                        sub: user.id,
                                        email: user.email,
                                        role: "authenticated",
                                }
                                session.supabaseAccessToken = jwt.sign(payload, signingSecret)
                                session.user.id = user.id
                        }
                        return session
                },
        },
        // ...
})