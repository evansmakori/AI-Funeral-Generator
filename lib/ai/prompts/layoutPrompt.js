export function buildLayoutPrompt({ input, content, uploads }) {
  const negatives = input.negativePrompt ? `\nNegative constraints: ${input.negativePrompt}` : "";
  const theme = input.theme ? `Theme preference: ${input.theme}` : "Theme preference: elegant";
  const layout = input.layout || "half-fold";

  return {
    system: `You are a print layout assistant.
Design calm, minimalist funeral programs with neutral colors and respectful typography.
Faith-neutral by default.
Always produce valid JSON matching the schema.
Do not choose bright colors. Avoid heavy ornamentation.`,
    user: `Goal: Produce a layout spec for a funeral program.
Layout type: ${layout}\n${theme}${negatives}\n\nAvailable images (paths):\n${JSON.stringify((uploads || []).map((u) => u.publicPath), null, 2)}\n\nContent summary:\n${JSON.stringify(
      {
        titleLine: content.titleLine,
        subtitleLine: content.subtitleLine,
        hasObituary: Boolean(content.obituary),
        orderOfServiceCount: content.orderOfService?.length || 0,
        readingsCount: content.poemsOrReadings?.length || 0
      },
      null,
      2
    )}\n\nReturn JSON with:
- page: { size: "letter"|"a4", fold: "half-fold"|"full-page" }
- palette: { background, text, muted, accent } (hex colors)
- typography: { headingFont, bodyFont } (generic web-safe family names)
- imagePlan: { primary: string|null, secondary: string[] } (use provided paths)
- sections: array of { key, title, placement } where placement is "front"|"inside-left"|"inside-right"|"back"|"single"
`
  };
}
