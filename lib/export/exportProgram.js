import { exportPdfOrPng } from "./pdfPng";
import { exportDocx } from "./exportDocx";

export async function exportProgram({ project, format }) {
  const html = project.program.html;
  if (format === "html") {
    return {
      buffer: Buffer.from(html, "utf8"),
      contentType: "text/html; charset=utf-8",
      ext: "html"
    };
  }

  if (format === "pdf" || format === "png") {
    const buffer = await exportPdfOrPng({ html, format, layout: project.program.layout });
    return {
      buffer,
      contentType: format === "pdf" ? "application/pdf" : "image/png",
      ext: format
    };
  }

  if (format === "docx") {
    const buffer = await exportDocx({ program: project.program, input: project.input });
    return {
      buffer,
      contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ext: "docx"
    };
  }

  throw new Error(`Unsupported format: ${format}`);
}
