import { NextApiRequest, NextApiResponse } from "next";
// import { supabase } from "../../lib/supabase";
import { setAuthCookie } from '../../lib/cookies';
import { Session } from '@supabase/supabase-js'

export default function handler(session: Session, res: NextApiResponse) {
    // supabase.auth.api.setAuthCookie(req, res);
    const { access_token, refresh_token, expires_in } = session
    setAuthCookie(session, res);
}