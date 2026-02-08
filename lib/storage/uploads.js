import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { getUploadsStore } from "./paths";
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

  const ext = safeExt(file.mimetype, file.originalFilename);
  const fileName = `${uuid()}${ext}`;
  const blobKey = `${projectId}/${fileName}`;

  // Read the uploaded temp file and store it in Netlify Blobs
  const fileBuffer = fs.readFileSync(file.filepath);
  const store = getUploadsStore();
  await store.set(blobKey, fileBuffer);

  // Public path points to a serving API route
  const publicPath = `/api/uploads/${projectId}/${fileName}`;
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

export async function getUploadBlob(projectId, fileName) {
  const store = getUploadsStore();
  const blobKey = `${projectId}/${fileName}`;
  return store.get(blobKey, { type: "arrayBuffer" });
}
