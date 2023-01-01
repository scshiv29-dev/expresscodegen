import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
        'https://knynjdymqqfoqqbbmsvq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueW5qZHltcXFmb3FxYmJtc3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0MTkyMjcsImV4cCI6MTk4Nzk5NTIyN30.g7plIYSn93kt-DSvs1ES0TTLIXVup2j04ftz8C1FKHo'
);
// ...
// Use `useSession()` or `unstable_getServerSession()` to get the NextAuth session.
export const supasupabase = (supabaseAccessToken: string | undefined) => {
        const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL as string,
                process.env.SUPABASE_SERVICE_ROLE_KEY as string,
                {
                        global: {
                                headers: {
                                        Authorization: `Bearer ${supabaseAccessToken}`,
                                },
                        },
                }
        )
        return supabase

}
export const getAllUserPastes = async (user_id: string, token: string) => {
        const supa = supasupabase(token)
        const { data, error } = await supa
                .from('pastes')
                .select('*')
                .eq('user', user_id)
        if (error) {
                console.log(error)
        }
        return data;
}

export const getPaste = async (paste_id: string, token: string) => {
        const supa = supasupabase(token)
        const { data, error } = await supa
                .from('pastes')
                .select('*')
                .eq('id', paste_id)
        if (error) {
                console.log(error)
        }
        return data;
}


