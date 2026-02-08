export function buildContentPrompt({ input, uploads }) {
  const negatives = input.negativePrompt ? `\nNegative constraints: ${input.negativePrompt}` : "";
  const theme = input.theme ? `Theme preference: ${input.theme}` : "Theme preference: elegant, calm, neutral";

  const uploadNote = uploads?.length
    ? `User uploaded ${uploads.length} photo(s). You will not see the images; propose respectful placements and captions without making visual claims.`
    : `No photos were provided.`;

  return {
    system: `You are a compassionate, culturally sensitive writing assistant for funeral programs.
Write with dignity, warmth, and restraint. Faith-neutral by default.
Do not invent specific facts (names, places, dates) unless provided.
Avoid overly religious language unless the user explicitly requests a religious theme.
If the user asks for \"no religious language\" then avoid religious references entirely.
Always produce valid JSON matching the schema.`,
    user: `Goal: Draft missing funeral program sections and improve existing text.
${theme}${negatives}\n\nUser description:\n${input.description}\n\nStructured details (may be partial):\n${JSON.stringify(input.structured || {}, null, 2)}\n\nOptional sections provided (may be partial):\n${JSON.stringify(input.optionalSections || {}, null, 2)}\n\n${uploadNote}\n\nReturn JSON with:
- titleLine (string)
- subtitleLine (string)
- obituary (string)
- orderOfService (string[]) (bullet-like items)
- acknowledgements (string)
- poemsOrReadings (string[]) (each a short poem, quote, or reading; keep neutral unless asked)
- family (string[]) (names/roles only if provided; otherwise generic placeholders omitted)
- toneNotes (string) (brief explanation of tone choices + how negative prompts were respected)
`
  };
}
