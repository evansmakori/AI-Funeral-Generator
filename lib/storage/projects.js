import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { ensureDir, projectDir, projectJsonPath } from "./paths";

export async function createProject({ userId } = {}) {
  const id = uuid();
  ensureDir(projectDir(id));

  const project = {
    id,
    userId: userId || null,
    createdAt: new Date().toISOString(),
    input: null,
    uploads: [],
    program: null
  };

  fs.writeFileSync(projectJsonPath(id), JSON.stringify(project, null, 2), "utf8");
  return project;
}

export async function getProject(id) {
  if (!id) return null;
  const file = projectJsonPath(id);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw);
}

export async function updateProject(id, patch) {
  const existing = await getProject(id);
  if (!existing) throw new Error("Project not found");

  const updated = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  ensureDir(path.dirname(projectJsonPath(id)));
  fs.writeFileSync(projectJsonPath(id), JSON.stringify(updated, null, 2), "utf8");
  return updated;
}
