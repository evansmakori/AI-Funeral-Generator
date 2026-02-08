import { Card } from "../ui/Card";
import { Container } from "../ui/Container";

export function CreateSection({ left, right }) {
  return (
    <section id="create" className="bg-white">
      <Container className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center pb-10 md:pb-14">
          <h2 className="font-serif text-3xl md:text-4xl text-slate-700">Create your program</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Start with a short description. Add structured details only if you have them.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-6">{left}</Card>
          <Card className="overflow-hidden">
            <div className="border-b border-slate-200/70 px-6 py-4">
              <h3 className="font-medium text-slate-800">Preview</h3>
              <p className="text-sm text-slate-600">A print-style preview of the generated layout.</p>
            </div>
            <div className="p-4">{right}</div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
