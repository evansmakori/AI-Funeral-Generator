import { createProject } from "../../../lib/storage/projects";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const project = await createProject();
  return res.status(200).json({ projectId: project.id });
}
