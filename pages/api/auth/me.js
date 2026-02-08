import { getSession } from "../../../lib/auth/session";
import { getUserPublicById } from "../../../lib/auth/users";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  const session = getSession(req);
  if (!session) return res.status(200).json({ user: null });
  const user = getUserPublicById(session.userId);
  return res.status(200).json({ user: user || null });
}
