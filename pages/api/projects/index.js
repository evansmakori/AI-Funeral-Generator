import { createProject } from "../../../lib/storage/projects";
import { requireAuth } from "../../../lib/auth/session";

export default async function handler(req, res) {
  const session = requireAuth(req, res);
  if (!session) return;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const project = await createProject({ userId: session.userId });
  return res.status(200).json({ projectId: project.id });
}
