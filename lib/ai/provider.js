import crypto from "crypto";

/**
 * Pluggable AI provider that returns JSON.
 *
 * Default behavior: deterministic local fallback (no network).
 * Optional: if OPENAI_API_KEY is set, uses OpenAI's Responses API via fetch.
 */
export async function generateJson({ system, user, schema }) {
  if (process.env.OPENAI_API_KEY) {
    return openAiJson({ system, user, schema });
  }
  return localFallbackJson({ user, schema });
}

async function openAiJson({ system, user, schema }) {
  const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

  const body = {
    model,
    input: [
      { role: "system", content: [{ type: "text", text: system }] },
      { role: "user", content: [{ type: "text", text: user }] }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "funeral_program",
        schema
      }
    }
  };

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${errText}`);
  }

  const json = await res.json();
  const text = json.output_text;
  if (!text) throw new Error("OpenAI: missing output_text");
  return JSON.parse(text);
}

function localFallbackJson({ user, schema }) {
  // Minimal offline generator so the app works without credentials.
  // Uses user input hints but avoids inventing facts.
  const seed = crypto.createHash("sha256").update(user).digest("hex").slice(0, 8);

  if (schema?.properties?.orderOfService) {
    // Content schema
    return {
      titleLine: "In Loving Memory",
      subtitleLine: "A life remembered with gratitude",
      obituary:
        "We gather to remember and honor a life that touched many. This program is a reflection of love, presence, and the quiet moments that remain with us.",
      orderOfService: [
        "Welcome",
        "Opening words",
        "Remembrances",
        "Reading or reflection",
        "Closing"
      ],
      acknowledgements:
        "Thank you for your kindness, support, and presence. Your messages and care are deeply appreciated by the family.",
      poemsOrReadings: [
        "May we carry forward the love we were given, and meet each day with gentle courage."
      ],
      family: [],
      toneNotes: `Faith-neutral, calm, and understated. (offline fallback ${seed})`
    };
  }

  // Layout schema
  return {
    page: { size: "letter", fold: "half-fold" },
    palette: {
      background: "#FFFFFF",
      text: "#111827",
      muted: "#6B7280",
      accent: "#374151"
    },
    typography: {
      headingFont: "Georgia",
      bodyFont: "system-ui"
    },
    imagePlan: {
      primary: null,
      secondary: []
    },
    sections: [
      { key: "serviceDetails", title: "Service Details", placement: "front" },
      { key: "obituary", title: "Obituary", placement: "inside-left" },
      { key: "orderOfService", title: "Order of Service", placement: "inside-right" },
      { key: "poemsOrReadings", title: "Readings", placement: "back" },
      { key: "acknowledgements", title: "Acknowledgements", placement: "back" }
    ]
  };
}
