export function assertProjectOwner({ project, session }) {
  if (!project) throw new Error("Project not found");
  // If the project has no userId (legacy), deny by default for safety.
  if (!project.userId) throw new Error("Forbidden");
  if (!session?.userId) throw new Error("Unauthorized");
  if (project.userId !== session.userId) throw new Error("Forbidden");
}
