import { supabase } from "../../../../lib/supabase";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
) {
        if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
        const { data, error } = await supabase
                .from('pastes')
                .select('*')
                .eq('id', req.query.id)
        if (error) return res.status(500).json({ error: error.message })
        await supabase.rpc('update_views', { id: req.query.id })
        res.status(200).json(data)
}