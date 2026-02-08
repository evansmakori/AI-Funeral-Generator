import Head from "next/head";
import { useMemo, useState } from "react";
import { ProgramForm } from "../components/ProgramForm";
import { ProgramPreview } from "../components/ProgramPreview";
import { ExportBar } from "../components/ExportBar";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";

export default function AppPage() {
  const [projectId, setProjectId] = useState(null);
  const [program, setProgram] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const canExport = Boolean(projectId && program);

  const previewHtml = useMemo(() => {
    if (!program) return "";
    return program.html;
  }, [program]);

  async function ensureProject() {
    if (projectId) return projectId;
    const res = await fetch("/api/projects", { method: "POST" });
    if (!res.ok) throw new Error("Unable to start a new project.");
    const data = await res.json();
    setProjectId(data.projectId);
    return data.projectId;
  }

  async function onGenerate(input) {
    setLoading(true);
    setError(null);
    try {
      const id = await ensureProject();

      for (const file of images) {
        const form = new FormData();
        form.append("file", file);
        const up = await fetch(`/api/projects/${id}/upload`, { method: "POST", body: form });
        if (!up.ok) throw new Error("An image could not be uploaded.");
      }

      const res = await fetch(`/api/projects/${id}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Generation failed.");
      setProgram(data.program);
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Generator</title>
      </Head>

      <main className="min-h-screen bg-slate-50">
        <Container className="py-10">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl text-slate-800">Start</h1>
              <p className="mt-2 text-slate-600">
                Add a few details and photos. The generator will draft sections and prepare exports.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <ProgramForm
                loading={loading}
                error={error}
                images={images}
                setImages={setImages}
                onGenerate={onGenerate}
              />
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-slate-200/70 px-6 py-4">
                <h2 className="font-medium text-slate-800">Preview</h2>
                <p className="text-sm text-slate-600">A print-style preview of the generated program.</p>
              </div>
              <div className="p-4">
                <ProgramPreview html={previewHtml} />
              </div>
            </Card>
          </div>

          <div className="mt-6">
            <ExportBar disabled={!canExport} projectId={projectId} />
          </div>
        </Container>
      </main>
    </>
  );
}
