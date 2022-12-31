import { supabase } from "../../../../lib/supabase";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
) {
        if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
        const { data, error } = await supabase
                .from('data')
                .select('*')
                .eq("user", req.query.uid)
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json(data)
}