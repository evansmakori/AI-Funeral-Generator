import { Container } from "../ui/Container";

export function ExportSection({ children }) {
  return (
    <section id="export" className="bg-slate-50">
      <Container className="py-10 md:py-14">{children}</Container>
    </section>
  );
}
