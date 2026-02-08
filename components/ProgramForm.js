import { useMemo, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { Button } from "./ui/Button";

export function ProgramForm({ loading, error, images, setImages, onGenerate }) {
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("elegant");
  const [layout, setLayout] = useState("half-fold");
  const [negativePrompt, setNegativePrompt] = useState("");

  const [structured, setStructured] = useState({
    fullName: "",
    birthDate: "",
    deathDate: "",
    serviceDate: "",
    serviceTime: "",
    location: "",
    officiant: ""
  });

  const [optionalSections, setOptionalSections] = useState({
    orderOfService: "",
    obituary: "",
    acknowledgements: "",
    poemsOrScriptures: "",
    pallbearersOrFamily: ""
  });

  const isValid = useMemo(() => description.trim().length > 0, [description]);

  function updateStructured(key, value) {
    setStructured((s) => ({ ...s, [key]: value }));
  }
  function updateOptional(key, value) {
    setOptionalSections((s) => ({ ...s, [key]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!isValid || loading) return;
    await onGenerate({
      description,
      theme,
      layout,
      negativePrompt: negativePrompt || undefined,
      structured: Object.fromEntries(Object.entries(structured).filter(([, v]) => String(v || "").trim() !== "")),
      optionalSections: Object.fromEntries(
        Object.entries(optionalSections).filter(([, v]) => String(v || "").trim() !== "")
      )
    });
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl tracking-tight text-slate-800">Program details</h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          You can be brief. The AI will fill in missing sections and keep the tone calm and respectful.
        </p>
      </div>

      <ImageUploader images={images} setImages={setImages} />

      <div>
        <label className="label">About the person</label>
        <textarea
          className="input min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Share a few details: personality, roles, loved ones, passions, a memory, or anything important."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="label">Theme</label>
          <select className="input" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="elegant">Elegant</option>
            <option value="minimalist">Minimalist</option>
            <option value="modern">Modern</option>
            <option value="floral">Floral</option>
            <option value="religious">Religious (only if desired)</option>
          </select>
        </div>

        <div>
          <label className="label">Layout</label>
          <select className="input" value={layout} onChange={(e) => setLayout(e.target.value)}>
            <option value="half-fold">Half-fold (booklet)</option>
            <option value="full-page">Full-page</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Negative prompts (optional)</label>
        <input
          className="input"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          placeholder='e.g. "no religious language", "no bright colors", "no floral imagery"'
        />
      </div>

      <details className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-800">Optional structured details</summary>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Full name" value={structured.fullName} onChange={(v) => updateStructured("fullName", v)} />
          <Field label="Officiant" value={structured.officiant} onChange={(v) => updateStructured("officiant", v)} />
          <Field label="Birth date" value={structured.birthDate} onChange={(v) => updateStructured("birthDate", v)} />
          <Field label="Death date" value={structured.deathDate} onChange={(v) => updateStructured("deathDate", v)} />
          <Field label="Service date" value={structured.serviceDate} onChange={(v) => updateStructured("serviceDate", v)} />
          <Field label="Service time" value={structured.serviceTime} onChange={(v) => updateStructured("serviceTime", v)} />
          <Field label="Location" value={structured.location} onChange={(v) => updateStructured("location", v)} className="md:col-span-2" />
        </div>
      </details>

      <details className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-800">Optional sections (leave blank to let AI write)</summary>
        <div className="mt-4 space-y-4">
          <TextArea label="Order of Service" value={optionalSections.orderOfService} onChange={(v) => updateOptional("orderOfService", v)} />
          <TextArea label="Obituary" value={optionalSections.obituary} onChange={(v) => updateOptional("obituary", v)} />
          <TextArea label="Acknowledgements" value={optionalSections.acknowledgements} onChange={(v) => updateOptional("acknowledgements", v)} />
          <TextArea label="Poems or Scriptures" value={optionalSections.poemsOrScriptures} onChange={(v) => updateOptional("poemsOrScriptures", v)} />
          <TextArea label="Pallbearers / Family Members" value={optionalSections.pallbearersOrFamily} onChange={(v) => updateOptional("pallbearersOrFamily", v)} />
        </div>
      </details>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      ) : null}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button type="submit" variant="primary" disabled={!isValid || loading} className="sm:w-auto w-full">
          {loading ? "Generating…" : "Generate program"}
        </Button>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your content stays local to this project unless you configure an AI provider.
        </p>
      </div>
    </form>
  );
}

function Field({ label, value, onChange, className }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <textarea className="input min-h-[110px]" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
