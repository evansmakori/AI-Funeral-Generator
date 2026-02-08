/* eslint-disable @next/next/no-img-element */
import NextLink from "next/link";
import { Container } from "../ui/Container";

const Link = NextLink?.default ?? NextLink;

const navLinks = [
  { href: "#steps", label: "How it works" },
  { href: "#themes", label: "Themes" },
  { href: "#faq", label: "FAQ" },
  { href: "#Support", label: "Support" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 w-full bg-slate-700/90 backdrop-blur">
      <Container className="px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center text-white font-bold transition duration-150 ease-in-out">
            <img
              src="/ai-funeral-generator-logo.png"
              alt="AI Funeral Generator"
              className="h-12 w-12 object-contain"
            />
            <span className="ml-3 text-white font-bold">AI Funeral Generator</span>
          </Link>

          <nav className="hidden md:flex md:grow">
            <ul className="flex grow flex-wrap items-center gap-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-medium text-white/90 hover:text-white px-3 lg:px-4 py-2 transition duration-150 ease-in-out"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/app"
              className="group font-medium text-blue-200 hover:text-white px-3 lg:px-5 py-2 transition duration-150 ease-in-out"
            >
              Design Now
              <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
