import { z } from "zod";
import { generateProgram } from "../../../../lib/ai/generateProgram";
import { getProject, updateProject } from "../../../../lib/storage/projects";

const InputSchema = z.object({
  description: z.string().min(1),
  theme: z.string().optional(),
  negativePrompt: z.string().optional(),
  structured: z
    .object({
      fullName: z.string().optional(),
      birthDate: z.string().optional(),
      deathDate: z.string().optional(),
      serviceDate: z.string().optional(),
      serviceTime: z.string().optional(),
      location: z.string().optional(),
      officiant: z.string().optional()
    })
    .optional(),
  optionalSections: z
    .object({
      orderOfService: z.string().optional(),
      obituary: z.string().optional(),
      acknowledgements: z.string().optional(),
      poemsOrScriptures: z.string().optional(),
      pallbearersOrFamily: z.string().optional()
    })
    .optional(),
  layout: z.enum(["half-fold", "full-page"]).optional()
});

import { requireAuth } from "../../../../lib/auth/session";

export default async function handler(req, res) {
  const session = await requireAuth(req, res);
  if (!session) return;
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { id } = req.query;
  const project = await getProject(id);
  if (!project) return res.status(404).json({ error: "Project not found" });

  try {
    const { assertProjectOwner } = await import("../../../../lib/auth/authorizeProject");
    assertProjectOwner({ project, session });
  } catch (e) {
    const msg = e?.message || String(e);
    return res.status(msg === "Unauthorized" ? 401 : msg === "Forbidden" ? 403 : 403).json({ error: msg });
  }

  try {
    const input = InputSchema.parse(req.body);
    const program = await generateProgram({ project, input });

    await updateProject(id, {
      input,
      program
    });

    return res.status(200).json({ program });
  } catch (e) {
    return res.status(400).json({ error: e?.message || String(e) });
  }
}
