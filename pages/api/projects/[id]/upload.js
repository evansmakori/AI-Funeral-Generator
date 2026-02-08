import formidable from "formidable";
import { saveUploadToProject } from "../../../../lib/storage/uploads";

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const form = formidable({ multiples: false, maxFiles: 1, maxFileSize: 10 * 1024 * 1024 });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: "Upload failed" });
    const file = files.file;
    if (!file) return res.status(400).json({ error: "No file provided" });

    try {
      const { id } = req.query;
      const { getProject } = await import("../../../../lib/storage/projects");
      const project = await getProject(id);
      if (!project) return res.status(404).json({ error: "Project not found" });

      const result = await saveUploadToProject({ projectId: id, file });
      return res.status(200).json({ ok: true, file: result });
    } catch (e) {
      return res.status(500).json({ error: e.message || String(e) });
    }
  });
}
