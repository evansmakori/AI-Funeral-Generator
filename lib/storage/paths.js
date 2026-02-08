import fs from "fs";
import path from "path";

export function dataRoot() {
  return path.join(process.cwd(), "data");
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function projectDir(projectId) {
  return path.join(dataRoot(), "projects", projectId);
}

export function projectJsonPath(projectId) {
  return path.join(projectDir(projectId), "project.json");
}

export function projectUploadsDir(projectId) {
  return path.join(process.cwd(), process.env.UPLOAD_DIR || "public/uploads", projectId);
}
