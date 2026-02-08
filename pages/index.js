/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { Navbar } from "../components/site/Navbar";
import { Footer } from "../components/site/Footer";
import { Container } from "../components/ui/Container";

const steps = [
  {
    title: "Choose a Theme",
    body: "Select from professionally designed templates for funeral programs, Let AI do some magic for you in seconds.",
    img: "/choose a theme.png",
    download: "/choose a theme.pptx"
  },
  {
    title: "Personalize with Ease",
    body: "Add names, dates, photos, and memories with a guided editor.",
    img: "/personalize.png",
    download: "/personalize with easy.pptx"
  },
  {
    title: "Download or Print",
    body: "Export print-ready files or order premium prints for delivery.",
    img: "/download or print.png",
    download: "/Download or print.pptx"
  }
];

const themes = [
  {
    title: "Whispering Leaves",
    body: "Delicate botanicals and a serene color palette for a tranquil memorial.",
    img: "/theme1.png",
    download: "/theme1.pptx"
  },
  {
    title: "Eternal Bloom",
    body: "Soft watercolor florals with warm hues that celebrate enduring love.",
    img: "/theme2.png",
    download: "/theme2.pptx"
  },
  {
    title: "Gentle Bloom",
    body: "A tender floral set that balances elegance with heartfelt simplicity.",
    img: "/theme3.png",
    download: "/theme3.pptx"
  }
];

const features = [
  {
    title: "Funeral Programs",
    body: "Create funeral programs in one guided flow.",
    img: "/funeral programs.jpg"
  },
  {
    title: "AI-assisted writing",
    body: "Let the assistant draft obituaries, readings, and acknowledgements with minimal input.",
    img: "/AI assistant writing.png"
  },
  {
    title: "Print-ready exports",
    body: "Download PDF, DOCX, or PNG exports that are ready to print or share digitally.",
    img: "/donload and print.png"
  }
];

const testimonials = [
  {
    quote:
      "AI Funeral Generator made creating a beautiful memorial for my father so much easier during such a difficult time.",
    name: "Monica James",
    role: "Kenya, Nairobi"
  },
  {
    quote:
      "The templates were stunning and the editor was incredibly user-friendly. We had a program ready in minutes.",
    name: "Darren Odokwo.",
    role: "Nigeria, Lagos"
  }
];

const faqs = [
  {
    question: "What types of funeral stationery does AI Funeral Generator offer?",
    answer:
      "AI Funeral Generator provides funeral program templates, AI assistant writing and more"
  },
  {
    question: "Can I customize the templates with my own text and photos?",
    answer:
      "Yes, the editor lets you personalize text, images, and layouts with a simple guided experience."
  },
  {
    question: "Can I download my program immediately?",
    answer: "Yes, you can export print-ready files as soon as you finish your design."
  }
];

export default function Landing() {
  return (
    <>
      <Head>
        <title>Funeral Program Templates | AI Funeral Generator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-700" aria-hidden="true" />
          <Container className="relative py-20 md:py-28">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-center">
              <div className="text-center md:text-left">
                <h1 className="font-playfair-display text-4xl md:text-5xl text-slate-100 mb-4">
                  Create Beautiful Funeral Programs in Minutes
                </h1>
                <p className="text-xl text-slate-200 mb-8">
                  Honor your loved one&apos;s memory with professionally designed funeral programs.
                </p>
                <div className="max-w-xs mx-auto md:mx-0 sm:max-w-none sm:flex sm:justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="/signup"
                    className="items-center transition duration-150 ease-in-out group btn text-white bg-blue-700 hover:bg-blue-800 w-full"
                  >
                    Start Designing
                    <span className="tracking-normal group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1">
                      →
                    </span>
                  </Link>
                  <Link
                    href="/login"
                    className="btn text-white border border-white/40 hover:bg-white/10 w-full"
                  >
                    Log in
                  </Link>
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <img
                  src="/hero section.png"
                  alt="AI Funeral Generator hero preview"
                  className="w-full max-w-md rounded-3xl shadow-soft"
                />
              </div>
            </div>
          </Container>
        </section>

        <section id="steps" className="relative bg-slate-100">
          <Container className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center pb-12">
              <h2 className="font-playfair-display text-3xl md:text-4xl text-slate-700">
                Funeral Stationery in 3 Easy Steps
              </h2>
            </div>
            <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-10 items-start">
              {steps.map((step) => (
                <article key={step.title}>
                  <a href={step.download} className="relative block group mt-8 mb-4" download>
                    <div className="absolute inset-0 pointer-events-none border-2 border-slate-500/20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-300 ease-out -z-10" />
                    <div className="overflow-hidden rounded-2xl">
                      <img src={step.img} alt="" className="w-full aspect-square object-cover" />
                    </div>
                  </a>
                  <h3 className="font-playfair-display text-xl text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="themes" className="bg-slate-100">
          <Container className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center pb-12">
              <h2 className="font-playfair-display text-3xl md:text-4xl text-slate-700">Our Top Themes</h2>
            </div>
            <div className="max-w-sm mx-auto md:max-w-none grid gap-12 md:grid-cols-3 md:gap-x-10 items-start">
              {themes.map((theme) => (
                <article key={theme.title}>
                  <a href={theme.download} className="relative block group mt-8 mb-4" download>
                    <div className="absolute inset-0 pointer-events-none border-2 border-slate-500/20 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-300 ease-out -z-10" />
                    <div className="overflow-hidden rounded-2xl">
                      <img src={theme.img} alt="" className="w-full aspect-square object-cover" />
                    </div>
                  </a>
                  <h3 className="font-playfair-display text-xl text-slate-800 mb-2">{theme.title}</h3>
                  <p className="text-slate-600">{theme.body}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="py-12 md:py-20 space-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:items-center md:gap-12`}
              >
                <div className="md:min-w-[24rem]">
                  <h2 className="font-playfair-display text-2xl md:text-3xl text-slate-800 mb-3">
                    {feature.title}
                  </h2>
                  <p className="text-slate-600 text-lg">{feature.body}</p>
                </div>
                <div className="mt-6 md:mt-0">
                  <img
                    src={feature.img}
                    alt=""
                    className="rounded-3xl w-full max-w-md object-cover shadow-soft"
                  />
                </div>
              </div>
            ))}
          </Container>
        </section>

        <section className="bg-slate-50">
          <Container className="py-12 md:py-20">
            <div className="grid gap-8 md:grid-cols-2">
              {testimonials.map((item) => (
                <article key={item.name} className="h-full flex flex-col bg-white p-6 shadow-soft rounded-3xl">
                  <p className="text-slate-600 italic text-lg">“{item.quote}”</p>
                  <div className="mt-6 text-sm text-slate-500">
                    <div className="font-semibold text-slate-700">{item.name}</div>
                    <div>{item.role}</div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section id="faq" className="bg-slate-50">
          <Container className="py-12 md:py-20">
            <div className="max-w-3xl mx-auto text-center pb-12">
              <h2 className="font-playfair-display text-3xl md:text-4xl text-slate-800">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto divide-y divide-slate-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="py-5">
                  <summary className="font-playfair-display text-lg text-slate-800 cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-slate-900">
          <Container className="py-12 md:py-20 text-center">
            <h2 className="font-playfair-display text-3xl md:text-4xl text-slate-100 mb-4">
              Create a Heartfelt Memorial
            </h2>
            <p className="text-xl text-slate-400 mb-8">
              Honor your loved one with a personalized funeral program. Get started today.
            </p>
            <Link className="btn text-white bg-blue-700 hover:bg-blue-800" href="/signup">
              Design Now
            </Link>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
