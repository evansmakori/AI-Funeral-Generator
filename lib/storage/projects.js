import { v4 as uuid } from "uuid";
import { getProjectsStore } from "./paths";

export async function createProject({ userId } = {}) {
  const id = uuid();
  const store = getProjectsStore();

  const project = {
    id,
    userId: userId || null,
    createdAt: new Date().toISOString(),
    input: null,
    uploads: [],
    program: null
  };

  await store.setJSON(id, project);
  return project;
}

export async function getProject(id) {
  if (!id) return null;
  const store = getProjectsStore();
  const project = await store.get(id, { type: "json" });
  return project || null;
}

export async function updateProject(id, patch) {
  const existing = await getProject(id);
  if (!existing) throw new Error("Project not found");

  const updated = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  const store = getProjectsStore();
  await store.setJSON(id, updated);
  return updated;
}
