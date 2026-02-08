import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-playfair-display text-lg mb-3 text-white">AI Funeral Generator</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Create respectful funeral programs, prayer cards, and memorial resources with calm, professional templates.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#steps" className="hover:text-white">How it works</a>
              </li>
              <li>
                <a href="#themes" className="hover:text-white">Themes</a>
              </li>
              <li>
                <a href="#Support" className="hover:text-white">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/login" className="hover:text-white">Log in</a>
              </li>
              <li>
                <a href="/signup" className="hover:text-white">Create account</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
          This tool is designed to be faith-neutral by default and will follow theme preferences and negative prompts.
        </div>
      </Container>
    </footer>
  );
}
