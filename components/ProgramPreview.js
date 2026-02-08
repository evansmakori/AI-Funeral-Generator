export function ProgramPreview({ html }) {
  if (!html) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Your generated program will appear here.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <iframe
        title="program-preview"
        className="h-[720px] w-full"
        sandbox="allow-same-origin"
        srcDoc={html}
      />
    </div>
  );
}
