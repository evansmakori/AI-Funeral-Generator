/* eslint-disable @next/next/no-img-element */
import { Container } from "../ui/Container";

const steps = [
  {
    title: "Choose a layout",
    body: "Select half-fold or full-page. Pick a calm theme direction.",
    img: "/choose a theme.png",
    download: "/choose a theme.pptx"
  },
  {
    title: "Add details & photos",
    body: "Upload 1–5 images and write a short description. Optional sections are supported.",
    img: "/personalize.png",
    download: "/personalize with easy.pptx"
  },
  {
    title: "Generate & export",
    body: "AI drafts missing sections and formats everything for print and sharing.",
    img: "/download or print.png",
    download: "/Download or print.pptx"
  }
];

export function HowItWorks() {
  return (
    <section id="how" className="relative">
      <div className="absolute inset-0 bg-slate-100 pointer-events-none" aria-hidden="true" />
      <Container className="relative py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center pb-10 md:pb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-700">Three simple steps</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            A guided flow designed for clarity and ease—especially when time and energy are limited.
          </p>
        </div>

        <div className="max-w-sm mx-auto md:max-w-none grid gap-10 md:grid-cols-3 md:gap-x-10 items-start">
          {steps.map((s) => (
            <article key={s.title} className="h-full flex flex-col space-y-4">
              <a
                href={s.download}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                download
              >
                <img src={s.img} alt="" className="w-full h-48 object-cover" />
              </a>
              <div>
                <h3 className="font-medium text-slate-800">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
