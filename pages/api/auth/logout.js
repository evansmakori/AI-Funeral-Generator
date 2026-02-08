import { clearSessionCookie } from "../../../lib/auth/session";
import { getAdminAuth } from "../../../lib/firebase/admin";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const cookie = req.headers?.cookie || "";
  const token = cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("ff_session="))
    ?.split("=")[1];
  if (token) {
    try {
      const auth = getAdminAuth();
      const decoded = await auth.verifySessionCookie(token, true);
      await auth.revokeRefreshTokens(decoded.uid);
    } catch {
      // ignore revoke errors
    }
  }
  clearSessionCookie(res);
  return res.status(200).json({ ok: true });
}
