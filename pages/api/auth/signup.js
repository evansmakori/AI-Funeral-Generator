import { z } from "zod";
import { createUser } from "../../../lib/auth/users";
import { createSessionToken, setSessionCookie } from "../../../lib/auth/session";

const Schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { email, password } = Schema.parse(req.body);
    const user = await createUser({ email, password });
    const token = createSessionToken({ userId: user.id });
    setSessionCookie(res, token);
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(400).json({ error: e?.message || String(e) });
  }
}
