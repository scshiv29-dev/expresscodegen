import { createClient } from '@supabase/supabase-js';
import { PasteR } from '../types';

// Initialize Supabase client
export const supabase = createClient(
        'https://knynjdymqqfoqqbbmsvq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueW5qZHltcXFmb3FxYmJtc3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0MTkyMjcsImV4cCI6MTk4Nzk5NTIyN30.g7plIYSn93kt-DSvs1ES0TTLIXVup2j04ftz8C1FKHo'
);
type Paste = {
        id: string
        created_at: string
        title: string
        content: string
        isViewOnce: boolean
        views: number
        anonymous: boolean
        user: string
        isProtected: boolean
        password: any
}

// ...
// Use `useSession()` or `unstable_getServerSession()` to get the NextAuth session.
export const supasupabase = (supabaseAccessToken: string | undefined) => {
        console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log(process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY)
        const supabase = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL as string,
                process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY as string,
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

export const getPasteAndUpdateView = async (paste_id: string) => {

        const { data, error } = await supabase
                .from('pastes')
                .select('*')
                .eq('id', paste_id)
        if (!data[0].isViewOnce) {
                await supabase.rpc('increment_views', { row_id: paste_id })
        }
        if (error) {
                console.log(error)
        }
        return data;
}

export const updatePaste = async (paste_id: string, token: string, paste: Paste) => {
        const supa = supasupabase(token)
        const { data, error } = await supa
                .from('pastes')
                .update(paste)
                .eq('id', paste_id)
        if (error) {
                console.log(error)
        }
        return data;
}
export const deletePaste = async (paste_id: string, token: string) => {
        const supa = supasupabase(token)
        const { data, error } = await supa
                .from('pastes')
                .delete()
                .eq('id', paste_id)
        if (error) {
                console.log(error)
        }
        return data;
}
export const createPaste = async (paste: PasteR, token: string) => {
        const supa = supasupabase(token)
        const { data, error } = await supa
                .from('pastes')
                .insert(paste)
        if (error) {
                console.log(error)
        }
        return data;
}