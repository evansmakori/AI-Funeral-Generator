import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { projectUploadsDir, ensureDir } from "./paths";
import { getProject, updateProject } from "./projects";

function safeExt(mimetype, originalFilename) {
  const ext = path.extname(originalFilename || "") || "";
  if (ext && ext.length <= 6) return ext.toLowerCase();
  if (mimetype === "image/png") return ".png";
  if (mimetype === "image/jpeg") return ".jpg";
  return ".img";
}

export async function saveUploadToProject({ projectId, file }) {
  const project = await getProject(projectId);
  if (!project) throw new Error("Project not found");

  const uploadDir = projectUploadsDir(projectId);
  ensureDir(uploadDir);

  const ext = safeExt(file.mimetype, file.originalFilename);
  const fileName = `${uuid()}${ext}`;
  const destPath = path.join(uploadDir, fileName);

  // formidable v3 provides file.filepath
  fs.copyFileSync(file.filepath, destPath);

  const publicPath = path.posix.join("/uploads", projectId, fileName);
  const record = {
    id: fileName,
    originalName: file.originalFilename,
    mimetype: file.mimetype,
    size: file.size,
    publicPath
  };

  await updateProject(projectId, {
    uploads: [...(project.uploads || []), record].slice(0, 5)
  });

  return record;
}
