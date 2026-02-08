import { getProject } from "../../../../lib/storage/projects";
import { exportProgram } from "../../../../lib/export/exportProgram";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;
  const format = String(req.query.format || "pdf");

  const project = await getProject(id);
  if (!project) return res.status(404).json({ error: "Project not found" });

  if (!project?.program?.html) return res.status(404).json({ error: "Nothing to export yet" });

  try {
    const result = await exportProgram({ project, format });
    res.setHeader("Content-Type", result.contentType);
    res.setHeader("Content-Disposition", `attachment; filename=funeral-program-${id}.${result.ext}`);
    return res.status(200).send(result.buffer);
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
