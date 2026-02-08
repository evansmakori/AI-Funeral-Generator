import path from "path";
import { getUploadBlob } from "../../../lib/storage/uploads";

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".img": "application/octet-stream"
};

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const segments = req.query.path;
  if (!segments || segments.length !== 2) {
    return res.status(400).json({ error: "Invalid upload path" });
  }

  const [projectId, fileName] = segments;

  try {
    const data = await getUploadBlob(projectId, fileName);
    if (!data) return res.status(404).json({ error: "File not found" });

    const ext = path.extname(fileName).toLowerCase();
    const contentType = MIME_MAP[ext] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.status(200).send(Buffer.from(data));
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
