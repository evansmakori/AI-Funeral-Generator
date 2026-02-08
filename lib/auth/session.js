import { getAdminAuth } from "../firebase/admin";

const COOKIE_NAME = "ff_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getCookie(req) {
  const cookieHeader = req.headers?.cookie || "";
  const cookies = Object.fromEntries(
    cookieHeader
      .split(";")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c) => {
        const idx = c.indexOf("=");
        if (idx === -1) return [c, ""];
        return [c.slice(0, idx), decodeURIComponent(c.slice(idx + 1))];
      })
  );
  return cookies[COOKIE_NAME];
}

export async function getSession(req) {
  const token = getCookie(req);
  if (!token) return null;
  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifySessionCookie(token, true);
    return { userId: decoded.uid };
  } catch {
    return null;
  }
}

export function setSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === "production";
  const parts = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_MAX_AGE}`
  ];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === "production";
  const parts = [`${COOKIE_NAME}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (secure) parts.push("Secure");
  res.setHeader("Set-Cookie", parts.join("; "));
}

export async function requireAuth(req, res) {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return null;
  }
  return session;
}
