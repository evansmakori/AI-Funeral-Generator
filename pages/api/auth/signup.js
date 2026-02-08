import { z } from "zod";
import { getAdminAuth } from "../../../lib/firebase/admin";
import { setSessionCookie } from "../../../lib/auth/session";

const Schema = z.object({
  idToken: z.string().min(1)
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { idToken } = Schema.parse(req.body);
    const auth = getAdminAuth();
    const decoded = await auth.verifyIdToken(idToken);
    const token = await auth.createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 7 * 1000
    });
    setSessionCookie(res, token);
    return res.status(200).json({
      user: { id: decoded.uid, email: decoded.email || null, name: decoded.name || null }
    });
  } catch (e) {
    return res.status(400).json({ error: e?.message || String(e) });
  }
}
