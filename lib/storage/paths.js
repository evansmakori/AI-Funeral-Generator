import { getStore } from "@netlify/blobs";

export function getProjectsStore() {
  return getStore({ name: "projects", consistency: "strong" });
}

export function getUsersStore() {
  return getStore({ name: "users", consistency: "strong" });
}

export function getUploadsStore() {
  return getStore({ name: "uploads", consistency: "strong" });
}
