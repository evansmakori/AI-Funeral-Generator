import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

function para(text) {
  return new Paragraph({
    children: [new TextRun({ text: String(text || ""), font: "Times New Roman" })]
  });
}

export async function exportDocx({ program, input }) {
  const content = program.content;
  const s = input?.structured || {};

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: content.titleLine,
            heading: HeadingLevel.TITLE
          }),
          new Paragraph({ text: content.subtitleLine, heading: HeadingLevel.HEADING_2 }),
          para([s.birthDate, s.deathDate].filter(Boolean).join(" â ")),
          new Paragraph({ text: "" }),

          new Paragraph({ text: "Obituary", heading: HeadingLevel.HEADING_2 }),
          para(content.obituary),

          new Paragraph({ text: "Order of Service", heading: HeadingLevel.HEADING_2 }),
          ...(content.orderOfService || []).map((x) => para(`â¢ ${x}`)),

          new Paragraph({ text: "Readings", heading: HeadingLevel.HEADING_2 }),
          ...(content.poemsOrReadings || []).map((x) => para(x)),

          new Paragraph({ text: "Acknowledgements", heading: HeadingLevel.HEADING_2 }),
          para(content.acknowledgements)
        ]
      }
    ]
  });

  return Packer.toBuffer(doc);
}
