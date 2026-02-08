import { getSession } from "../../../lib/auth/session";
import { getAdminAuth } from "../../../lib/firebase/admin";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const session = await getSession(req);
  if (!session) return res.status(200).json({ user: null });
  try {
    const auth = getAdminAuth();
    const user = await auth.getUser(session.userId);
    return res.status(200).json({
      user: { id: user.uid, email: user.email, name: user.displayName || null }
    });
  } catch (e) {
    return res.status(200).json({ user: null });
  }
}
