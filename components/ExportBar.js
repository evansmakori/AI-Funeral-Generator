const formats = [
  { key: "pdf", label: "PDF (print-ready)" },
  { key: "docx", label: "DOCX" },
  { key: "html", label: "HTML" },
  { key: "png", label: "PNG preview" }
];

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export function ExportBar({ disabled, projectId }) {
  return (
    <Card className="px-6 py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-medium text-slate-800">Export</h3>
        <p className="text-sm text-slate-600">Download your program in several formats.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {formats.map((f) => (
          <Button
            key={f.key}
            as="a"
            variant="secondary"
            className={disabled ? "opacity-50 pointer-events-none" : ""}
            href={disabled ? "#" : `/api/projects/${projectId}/export?format=${f.key}`}
          >
            {f.label}
          </Button>
        ))}
      </div>
    </Card>
  );
}
