export const ContentSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    titleLine: { type: "string" },
    subtitleLine: { type: "string" },
    obituary: { type: "string" },
    orderOfService: { type: "array", items: { type: "string" } },
    acknowledgements: { type: "string" },
    poemsOrReadings: { type: "array", items: { type: "string" } },
    family: { type: "array", items: { type: "string" } },
    toneNotes: { type: "string" }
  },
  required: [
    "titleLine",
    "subtitleLine",
    "obituary",
    "orderOfService",
    "acknowledgements",
    "poemsOrReadings",
    "family",
    "toneNotes"
  ]
};

export const LayoutSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    page: {
      type: "object",
      additionalProperties: false,
      properties: {
        size: { enum: ["letter", "a4"] },
        fold: { enum: ["half-fold", "full-page"] }
      },
      required: ["size", "fold"]
    },
    palette: {
      type: "object",
      additionalProperties: false,
      properties: {
        background: { type: "string" },
        text: { type: "string" },
        muted: { type: "string" },
        accent: { type: "string" }
      },
      required: ["background", "text", "muted", "accent"]
    },
    typography: {
      type: "object",
      additionalProperties: false,
      properties: {
        headingFont: { type: "string" },
        bodyFont: { type: "string" }
      },
      required: ["headingFont", "bodyFont"]
    },
    imagePlan: {
      type: "object",
      additionalProperties: false,
      properties: {
        primary: { anyOf: [{ type: "string" }, { type: "null" }] },
        secondary: { type: "array", items: { type: "string" } }
      },
      required: ["primary", "secondary"]
    },
    sections: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          key: { type: "string" },
          title: { type: "string" },
          placement: { enum: ["front", "inside-left", "inside-right", "back", "single"] }
        },
        required: ["key", "title", "placement"]
      }
    }
  },
  required: ["page", "palette", "typography", "imagePlan", "sections"]
};
