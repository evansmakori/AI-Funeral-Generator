import { generateJson } from "./provider";
import { ContentSchema, LayoutSchema } from "./schemas";
import { buildContentPrompt } from "./prompts/contentPrompt";
import { buildLayoutPrompt } from "./prompts/layoutPrompt";
import { renderProgramHtml } from "../render/renderProgramHtml";

export async function generateProgram({ project, input }) {
  const uploads = project.uploads || [];

  const contentPrompt = buildContentPrompt({ input, uploads });
  const content = await generateJson({ ...contentPrompt, schema: ContentSchema });

  const layoutPrompt = buildLayoutPrompt({ input, content, uploads });
  const layout = await generateJson({ ...layoutPrompt, schema: LayoutSchema });

  const html = renderProgramHtml({
    projectId: project.id,
    input,
    content,
    layout,
    uploads
  });

  return {
    content,
    layout,
    html
  };
}
