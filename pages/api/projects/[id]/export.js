import { getProject } from "../../../../lib/storage/projects";
import { exportProgram } from "../../../../lib/export/exportProgram";

import { requireAuth } from "../../../../lib/auth/session";

export default async function handler(req, res) {
  const session = requireAuth(req, res);
  if (!session) return;
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;
  const format = String(req.query.format || "pdf");

  const project = await getProject(id);
  if (!project) return res.status(404).json({ error: "Project not found" });

  try {
    const { assertProjectOwner } = await import("../../../../lib/auth/authorizeProject");
    assertProjectOwner({ project, session });
  } catch (e) {
    const msg = e?.message || String(e);
    return res.status(msg === "Unauthorized" ? 401 : msg === "Forbidden" ? 403 : 403).json({ error: msg });
  }

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
