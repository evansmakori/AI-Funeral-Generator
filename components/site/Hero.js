import { Container } from "../ui/Container";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50" aria-hidden="true" />
      <div className="absolute -top-24 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 blur-3xl opacity-70" />

      <Container className="relative py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-slate-700">An AI program builder</p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl tracking-tight text-slate-800">
            Create a downloadable and printable funeral program
            <span className="text-slate-600"> with minimal input</span>
          </h1>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Provide a few details and photos. The app drafts missing sections, structures the layout, and prepares
            download and print-ready export file.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="/app" variant="primary">
              Create a program
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <Stat title="Fast" body="Draft sections in minutes" />
            <Stat title="Neutral" body="Faith-neutral by default" />
            <Stat title="Exportable" body="PDF, DOCX, HTML, PNG" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function Stat({ title, body }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 px-4 py-4">
      <div className="font-medium text-slate-800">{title}</div>
      <div className="mt-1 text-slate-600">{body}</div>
    </div>
  );
}
