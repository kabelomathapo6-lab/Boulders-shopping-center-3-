import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { centre, getOpenState } from "./data.js";

/* ---- Hooks ---- */

/** Live South African time, ticking every 30s. */
export function useSastTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Johannesburg",
    hour12: false,
  });
  return { now, time, minutes: now.getHours() * 60 + now.getMinutes() };
}

/** Sets the document title + meta description for the current page. */
export function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", description);
  }, [title, description]);
}

/** Reveal-on-scroll for elements with class="reveal". */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ---- Layout primitives ---- */

export function Container({ children, className = "" }) {
  return <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

const NAV = [
  { to: "/directory", label: "Stores" },
  { to: "/whats-on", label: "What's on" },
  { to: "/visit", label: "Visit" },
];

export function SiteHeader() {
  const status = getOpenState();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-porcelain/90 backdrop-blur dark:border-white/10 dark:bg-night-900/90">
      <Container className="flex items-center justify-between gap-4 py-3.5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="The Boulders, home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-ink dark:bg-brass-400">
            <span className="h-2.5 w-2.5 rounded-full bg-brass-400 dark:bg-night-950" />
          </span>
          <span className="font-display text-[16px] font-semibold tracking-tight">The Boulders</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? "bg-ink text-white dark:bg-brass-400 dark:text-night-950" : "text-graphite hover:bg-black/5 dark:text-stone-300 dark:hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className={`hidden items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium sm:flex ${
              status.isOpen
                ? "border-moss-500/25 bg-moss-500/10 text-moss-500"
                : "border-black/10 bg-black/[0.03] text-graphite dark:border-white/10 dark:bg-white/5 dark:text-stone-300"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-moss-500 pulse-soft" : "bg-graphite/50"}`} />
            {status.message}
          </span>
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-black/10 dark:border-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-black/5 px-5 py-2 dark:border-white/10 md:hidden">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="block border-b border-black/5 py-3 text-[15px] last:border-0 dark:border-white/10">
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-ink py-12 text-white dark:border-white/10">
      <Container>
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10">
                <span className="h-2.5 w-2.5 rounded-full bg-brass-400" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight">The Boulders</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/50">
              Midrand's most established shopping centre. {centre.storeCountPublished}+ stores, free
              parking, on {centre.address}.
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-brass-400">Explore</h3>
            <ul className="space-y-2 text-sm text-white/55">
              <li><Link to="/directory" className="hover:text-white">Store directory</Link></li>
              <li><Link to="/whats-on" className="hover:text-white">What's on</Link></li>
              <li><Link to="/visit" className="hover:text-white">Visit us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-brass-400">Contact</h3>
            <ul className="space-y-2 text-sm text-white/55">
              <li><a href={centre.phoneHref} className="hover:text-white">{centre.phone}</a></li>
              <li><a href={`mailto:${centre.email}`} className="hover:text-white">{centre.email}</a></li>
              <li className="text-white/35">{centre.address}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs text-white/30 md:flex-row md:items-center md:justify-between">
          <p>{centre.name}, Midrand.</p>
          <p>Student concept redesign — not affiliated with the centre. Built with React &amp; Tailwind CSS.</p>
        </div>
      </Container>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, description, children }) {
  return (
    <section className="border-b border-black/5 bg-bone/50 py-16 dark:border-white/10 dark:bg-white/[0.02] sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div className="reveal">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">{eyebrow}</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-xl text-graphite dark:text-stone-300">{description}</p>}
        </div>
        {children && <div className="reveal">{children}</div>}
      </Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="reveal max-w-2xl">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">{eyebrow}</p>
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-graphite dark:text-stone-300">{description}</p>}
    </div>
  );
}

export function ButtonLink({ to, children, variant = "primary", className = "" }) {
  const base = "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]";
  const variants = {
    primary: "bg-ink text-white dark:bg-brass-400 dark:text-night-950",
    secondary: "border border-black/15 bg-white/60 text-ink dark:border-white/15 dark:bg-white/5 dark:text-white",
  };
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function NotFoundPage() {
  useDocumentMeta("Page not found · The Boulders", "That page doesn't exist.");
  return (
    <Container className="py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">That page wandered off.</h1>
      <p className="mt-3 text-graphite dark:text-stone-300">Try the store directory or head back home.</p>
      <ButtonLink to="/" className="mx-auto mt-6 w-fit">Back home</ButtonLink>
    </Container>
  );
}
