import { supabase } from "../../../../lib/supabase";
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Data } from "../../../../types/supabase";
export default async function handler(
        req: NextApiRequest,
        res: NextApiResponse
) {
        const { body } = req.body
        if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
        const { data, error } = await supabase
                .from('pastes')
                .insert({
                        title: req.body.title,
                        content: req.body.content,
                        isViewOnce: req.body.isViewOnce,
                        anonymous: req.body.anonymous,
                        user: req.body.user,
                        isProtected: req.body.isProtected,
                        password: req.body.password
                })
                .select()
        if (error) return res.status(500).json({ error: error.message })
        res.status(200).json({ message: 'Success', data: data })


}