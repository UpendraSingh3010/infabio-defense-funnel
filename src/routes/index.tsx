import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  CheckCircle2,
  Crosshair,
  Instagram,
  Linkedin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CTA_COPY = "Book My Free Strategy Call";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Marketing Strategy Call | Infabio" },
      { name: "description", content: "Find where your ad budget leaks and leave with a clearer growth plan. Book a free strategy call with Infabio." },
      { property: "og:title", content: "Defend Your Marketing Budget | Infabio" },
      { property: "og:description", content: "Smarter spend, stronger conversion, and measurable growth—without the marketing hype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function scrollToForm() {
  document.getElementById("strategy-call")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function CTAButton({ className = "" }: { className?: string }) {
  return (
    <Button
      type="button"
      onClick={scrollToForm}
      className={`brand-gradient brand-glow h-12 rounded-md px-5 text-[11px] font-black uppercase tracking-[0.1em] text-primary-foreground transition-transform hover:scale-[1.02] sm:px-7 ${className}`}
    >
      <span>{CTA_COPY}</span><ArrowRight aria-hidden="true" />
    </Button>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        node.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCount(value);
      } else {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1100, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function Telemetry({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/25 bg-brand-blue/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-brand-pink">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />{children}
    </span>
  );
}

const pillars = [
  { icon: ShieldCheck, title: "Reduce Ad Waste", copy: "Tune bids, audiences, and creative so every rupee works harder.", stat: "40% saved" },
  { icon: Target, title: "Improve Conversions", copy: "Turn attention into action with clearer journeys and stronger offers.", stat: "3x uplift" },
  { icon: Sparkles, title: "Strong Brand Positioning", copy: "Own a sharper message your ideal customer immediately understands.", stat: "Clear recall" },
  { icon: BarChart3, title: "Deliver Measurable ROI", copy: "Connect marketing activity to outcomes that matter to the business.", stat: "12x ROAS" },
  { icon: TrendingUp, title: "Scale Sustainably", copy: "Build repeatable growth systems instead of chasing short-lived spikes.", stat: "Built to last" },
];

const process = [
  ["Understand", "We map your business, audience, economics, and current marketing reality."],
  ["Strategize", "We choose the highest-leverage moves and define what success must measure."],
  ["Execute", "We turn the strategy into focused campaigns, creative, and conversion systems."],
  ["Optimize", "We cut waste, test intelligently, and improve performance with real data."],
  ["Scale", "We expand only what is proven, profitable, and sustainable."],
];

const faqs = [
  ["Is this really free?", "Yes. The strategy call is completely free and there is no obligation to hire Infabio afterward."],
  ["What if I already work with an agency?", "That is absolutely fine. We can give you an independent view of your spend, funnel, and opportunities without disrupting your current relationship."],
  ["How soon will I see results?", "The call gives you immediate clarity. Execution timelines depend on your starting point, but we prioritize early waste reduction and measurable improvements."],
  ["Do you work with businesses in my industry?", "Infabio works across industries and growth stages. The call helps us assess fit based on your economics, audience, and goals—not a generic industry template."],
  ["Do you guarantee viral growth?", "No—and that is deliberate. We do not promise viral. We build disciplined systems designed for efficient, measurable, sustainable growth."],
];

function Index() {
  const [spend, setSpend] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const business = String(data.get("business") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (name.length < 2 || name.length > 100) nextErrors.name = "Please enter your full name.";
    if (business.length < 2 || business.length > 160) nextErrors.business = "Please enter your business name or website.";
    if (!spend) nextErrors.spend = "Please select your monthly ad spend.";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[+\d][\d\s()-]{7,19}$/.test(contact);
    if (!isEmail && !isPhone) nextErrors.contact = "Enter a valid phone number or email.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSubmitted(true);
    setSpend("");
    event.currentTarget.reset();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid h-[72px] max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <img src="/brand/infabio-logo.webp" alt="Infabio" className="h-11 w-32 shrink-0 object-contain object-left sm:h-12 sm:w-40" />
          <CTAButton className="h-10 max-w-[184px] px-3 text-[9px] sm:max-w-none sm:px-6 sm:text-[10px]" />
        </div>
      </header>

      <section className="relative min-h-[92vh] overflow-hidden border-b border-border pt-28">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-50" />
        <img src="/brand/infabio-funnel-bg.webp" alt="" className="pointer-events-none absolute right-[-18rem] top-16 h-[42rem] w-[42rem] opacity-20 mix-blend-screen sm:right-[-10rem] lg:right-[-2rem] lg:opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="max-w-5xl">
            <Telemetry>Budget Defence: Active</Telemetry>
            <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.96]">
              World’s First <span className="brand-text-gradient italic">Women-Powered</span><br />Marketing Defence Agency
            </h1>
            <p className="mt-7 max-w-2xl text-base font-light leading-7 text-muted-foreground sm:text-lg">
              Stop burning budget on marketing theatre. We protect your spend, improve acquisition, and build growth you can measure.
            </p>
            <div className="mt-9"><CTAButton /></div>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-3 divide-x divide-border border-y border-border py-5">
            {[
              [50, "+", "Brands scaled"], [40, "%", "Ad waste reduced"], [12, "x", "Average ROAS"],
            ].map(([value, suffix, label]) => (
              <div key={String(label)} className="min-w-0 px-3 first:pl-0 sm:px-8">
                <div className="font-display text-2xl text-foreground sm:text-4xl"><Counter value={Number(value)} suffix={String(suffix)} /></div>
                <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <Telemetry>Signal check</Telemetry>
            <h2 className="mt-5 font-display text-4xl font-light sm:text-6xl">Drift burns budget. <span className="brand-text-gradient italic">Armor builds momentum.</span></h2>
          </div>
          <div className="grid overflow-hidden rounded-lg border border-border md:grid-cols-2">
            <div className="bg-card/45 p-6 sm:p-9">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-danger">Marketing drift</p>
              <div className="mt-7 space-y-5">
                {["Chase impressions without intent", "Spend first, strategize later", "Report vanity metrics as wins", "Reset direction every campaign"].map((item) => <p key={item} className="flex gap-3 text-muted-foreground"><X className="mt-0.5 size-5 shrink-0 text-danger" />{item}</p>)}
              </div>
            </div>
            <div className="border-t border-border bg-surface-elevated p-6 sm:p-9 md:border-l md:border-t-0">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-success">Infabio armor</p>
              <div className="mt-7 space-y-5">
                {["Lower inefficient spend", "Improve customer acquisition", "Raise conversion performance", "Build sustainable growth"].map((item) => <p key={item} className="flex gap-3 text-foreground"><Check className="mt-0.5 size-5 shrink-0 text-success" />{item}</p>)}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/25 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <Telemetry>Five layers of defence</Telemetry>
          <div className="mt-5 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-light sm:text-6xl">Smarter systems.<br /><span className="brand-text-gradient italic">Not bigger budgets.</span></h2>
            <CTAButton />
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, copy, stat }, index) => (
              <article key={title} className={`rounded-lg border border-border bg-card p-6 transition-colors hover:border-brand-blue/40 ${index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                <div className="flex items-start justify-between gap-4"><Icon className="size-6 text-brand-pink" /><span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-cyan">{stat}</span></div>
                <h3 className="mt-10 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-4">
            {[
              [240, "Cr+", "₹", "Budget defended"], [94, "%", "", "Success rate"], [500, "+", "", "Brands protected"], [3, "", "", "Continents"],
            ].map(([value, suffix, prefix, label]) => (
              <div key={String(label)} className="bg-card p-5 sm:p-8">
                <div className="font-display text-3xl sm:text-5xl"><Counter value={Number(value)} suffix={String(suffix)} prefix={String(prefix)} /></div>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>
          <blockquote className="mx-auto max-w-4xl py-20 text-center sm:py-28">
            <Telemetry>Women-powered. Results-led.</Telemetry>
            <p className="mt-8 font-display text-3xl font-light leading-tight sm:text-5xl">“We don’t burn budgets to ‘test things.’ We build smarter ads, better ROI, and real growth.”</p>
            <footer className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand-pink">The Infabio team</footer>
          </blockquote>
        </Reveal>
      </section>

      <section className="border-y border-border bg-card/25 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <Telemetry>Defence protocol</Telemetry>
          <h2 className="mt-5 font-display text-4xl font-light sm:text-6xl">From diagnosis to <span className="brand-text-gradient italic">sustainable scale.</span></h2>
          <ol className="mt-12 grid gap-0 lg:grid-cols-5">
            {process.map(([title, copy], index) => (
              <li key={title} className="relative border-l border-border py-5 pl-6 lg:border-l-0 lg:border-t lg:px-5 lg:pt-8 first:lg:pl-0">
                <span className="absolute left-[-5px] top-7 h-2.5 w-2.5 rounded-full bg-brand-pink lg:left-5 lg:top-[-5px] first:lg:left-0" />
                <span className="font-display text-3xl text-brand-blue">0{index + 1}</span>
                <h3 className="mt-3 font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <Telemetry>Zero-cost clarity</Telemetry>
            <h2 className="mt-5 font-display text-4xl font-light sm:text-6xl">One call. A clearer <span className="brand-text-gradient italic">growth path.</span></h2>
            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">No generic pitch deck. We use the time to understand what is happening now and identify what should happen next.</p>
            <div className="mt-8"><CTAButton /></div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-cyan">You’ll walk away with</p>
            <ul className="mt-7 space-y-6">
              {["A free ad-waste audit of your current spend", "A review of your funnel and conversion bottlenecks", "The highest-impact opportunities to pursue first", "A clear, practical 90-day growth direction"].map((item) => <li key={item} className="flex items-start gap-4"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" /><span>{item}</span></li>)}
            </ul>
          </div>
        </Reveal>
      </section>

      <section id="strategy-call" className="scroll-mt-20 border-y border-border bg-card/30 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Telemetry>Strategy channel: Open</Telemetry>
            <h2 className="mt-5 font-display text-4xl font-light sm:text-6xl">Let’s find where your budget can work <span className="brand-text-gradient italic">harder.</span></h2>
            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">Share a few details. We’ll use them to make the conversation focused, useful, and specific to your business.</p>
            <div className="mt-10 flex items-center gap-3 text-sm text-muted-foreground"><ShieldCheck className="size-5 text-brand-pink" /><span>No pressure. No hype. Just clarity.</span></div>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-2xl sm:p-9">
            {submitted ? (
              <div role="status" className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="grid size-14 place-items-center rounded-full bg-success/15"><Check className="size-7 text-success" /></div>
                <h3 className="mt-6 font-display text-3xl">You’re on the radar.</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Your details passed validation. This demo does not send or store submissions yet.</p>
                <Button type="button" variant="outline" className="mt-7" onClick={() => setSubmitted(false)}>Submit another response</Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-5">
                <FormField label="Full Name" error={errors.name}><Input name="name" autoComplete="name" maxLength={100} placeholder="Your full name" className="h-12 bg-secondary/60" aria-invalid={Boolean(errors.name)} /></FormField>
                <FormField label="Business Name / Website" error={errors.business}><Input name="business" autoComplete="organization" maxLength={160} placeholder="Company or website" className="h-12 bg-secondary/60" aria-invalid={Boolean(errors.business)} /></FormField>
                <FormField label="Monthly Ad Spend" error={errors.spend}>
                  <Select value={spend} onValueChange={setSpend}><SelectTrigger className="h-12 bg-secondary/60" aria-invalid={Boolean(errors.spend)}><SelectValue placeholder="Select a range" /></SelectTrigger><SelectContent><SelectItem value="under-1l">Under ₹1 lakh</SelectItem><SelectItem value="1l-5l">₹1–5 lakh</SelectItem><SelectItem value="5l-15l">₹5–15 lakh</SelectItem><SelectItem value="15l-plus">₹15 lakh+</SelectItem><SelectItem value="not-running">Not running ads yet</SelectItem></SelectContent></Select>
                </FormField>
                <FormField label="Phone or Email" error={errors.contact}><Input name="contact" autoComplete="email" maxLength={255} placeholder="you@company.com or +91…" className="h-12 bg-secondary/60" aria-invalid={Boolean(errors.contact)} /></FormField>
                <Button type="submit" className="brand-gradient brand-glow h-12 w-full text-[11px] font-black uppercase tracking-[0.1em] text-primary-foreground">{CTA_COPY}<ArrowRight /></Button>
                <p className="text-center text-[10px] leading-4 text-muted-foreground">By submitting, you agree to be contacted about your strategy call.</p>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div><Telemetry>Objection handling</Telemetry><h2 className="mt-5 font-display text-4xl font-light sm:text-6xl">Questions,<br /><span className="brand-text-gradient italic">answered.</span></h2></div>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map(([question, answer], index) => <AccordionItem value={`faq-${index}`} key={question} className="border-border"><AccordionTrigger className="py-6 text-left text-base hover:no-underline">{question}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}
          </Accordion>
        </Reveal>
      </section>

      <section className="relative overflow-hidden border-y border-border px-4 py-20 text-center sm:px-6 sm:py-28">
        <div aria-hidden="true" className="grid-field pointer-events-none absolute inset-0 opacity-40" />
        <Reveal className="relative mx-auto max-w-4xl">
          <Telemetry>Budget Defence: Ready</Telemetry>
          <h2 className="mt-7 font-display text-4xl font-light sm:text-6xl">Stop funding noise.<br /><span className="brand-text-gradient italic">Start building growth.</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">A smarter marketing system starts with one honest conversation.</p>
          <div className="mt-9"><CTAButton /></div>
        </Reveal>
      </section>

      <footer className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-5">
          <div className="min-w-0"><img src="/brand/infabio-logo.webp" alt="Infabio" className="h-10 w-32 object-contain object-left" /><p className="mt-2 truncate text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Women-powered. Strategy-led. Results-obsessed.</p></div>
          <div className="flex shrink-0 gap-2">
            <SocialLink href="https://www.instagram.com/theinfabio" label="Infabio on Instagram"><Instagram /></SocialLink>
            <SocialLink href="https://www.linkedin.com/company/infabio/" label="Infabio on LinkedIn"><Linkedin /></SocialLink>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <div><Label className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{label}</Label>{children}{error ? <p className="mt-1.5 text-xs text-danger">{error}</p> : null}</div>;
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid size-10 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:border-brand-pink/50 hover:text-brand-pink [&_svg]:size-4">{children}</a>;
}
