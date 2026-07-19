import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, PageHero, SectionHeading, useDocumentMeta, useReveal } from "./shared.jsx";
import { centre, getOpenState, happenings, tenantCategories, tenants, tradingHours } from "./data.js";

/* ---------------------------------------------------------------
   Directory
--------------------------------------------------------------- */
export function DirectoryPage() {
  useDocumentMeta(
    `Store directory · ${centre.name}`,
    `Search and filter every store at ${centre.name} by name, category or level.`,
  );
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  useReveal([search, category, level]);

  const results = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tenants
      .filter((t) => !q || t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q))
      .filter((t) => category === "All" || t.category === category)
      .filter((t) => level === "All" || t.level === level)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [search, category, level]);

  return (
    <>
      <PageHero
        eyebrow="Directory"
        title={<>Every store,<br /><span className="text-brass-600 dark:text-brass-300">instantly.</span></>}
        description={`Filter as you type. ${tenants.length} stores across two levels.`}
      >
        <div className="grid grid-cols-3 divide-x divide-black/10 rounded-3xl border border-black/10 bg-white/55 p-5 text-center shadow-soft backdrop-blur dark:divide-white/10 dark:border-white/10 dark:bg-white/5">
          <div><strong className="block font-display text-2xl">{tenants.length}</strong><span className="text-xs text-stone-500">Listed here</span></div>
          <div><strong className="block font-display text-2xl">{tenantCategories.length}</strong><span className="text-xs text-stone-500">Categories</span></div>
          <div><strong className="block font-display text-2xl">2</strong><span className="text-xs text-stone-500">Levels</span></div>
        </div>
      </PageHero>

      <section className="py-10 sm:py-14">
        <Container>
          <div className="reveal sticky top-20 z-30 rounded-3xl border border-black/10 bg-porcelain/95 p-4 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-night-900/95 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1.8fr_1fr_1fr_auto]">
              <label className="relative">
                <span className="sr-only">Search stores</span>
                <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search store or category"
                  className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 pl-12 pr-4 text-sm outline-none transition focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-white/5"
                />
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800"
              >
                <option value="All">All categories</option>
                {tenantCategories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="h-12 w-full rounded-2xl border border-black/10 bg-white/70 px-4 text-sm outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800"
              >
                <option value="All">Both levels</option>
                <option value="Upper">Upper level</option>
                <option value="Lower">Lower level</option>
              </select>
              <button
                type="button"
                onClick={() => { setSearch(""); setCategory("All"); setLevel("All"); }}
                className="h-12 rounded-2xl border border-black/10 bg-white/70 px-4 text-sm font-semibold text-ink transition hover:border-brass-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                Reset
              </button>
            </div>
            <p className="mt-4 border-t border-black/10 pt-4 text-sm text-graphite dark:border-white/10 dark:text-stone-300">
              Showing <strong>{results.length}</strong> of {tenants.length}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="reveal mt-8 grid place-items-center rounded-3xl border border-dashed border-black/20 py-20 text-center dark:border-white/20">
              <p className="font-display text-2xl">No stores match that.</p>
              <p className="mt-2 max-w-sm text-sm text-graphite dark:text-stone-400">
                Try a different word, or reset the filters to see everything.
              </p>
            </div>
          ) : (
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((t) => (
                <li key={`${t.name}-${t.shop}`} className="reveal group rounded-2xl border border-black/10 bg-white/70 p-5 transition-all hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-lg font-semibold">{t.name}</h3>
                      <p className="mt-1 text-sm text-graphite dark:text-stone-400">{t.level} level</p>
                    </div>
                    <span className="shrink-0 rounded-md bg-black/5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-graphite dark:bg-white/10 dark:text-stone-300">
                      {t.category}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between border-t border-black/10 pt-3 dark:border-white/10">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500">Shop</span>
                    <span className="font-display text-xl font-semibold">{t.shop}</span>
                  </div>
                  {t.note && (
                    <p className="mt-3 rounded-lg bg-brass-400/10 px-3 py-2 text-xs leading-relaxed text-graphite dark:text-stone-300">{t.note}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------
   What's on
--------------------------------------------------------------- */
export function WhatsOnPage() {
  useDocumentMeta(`What's on · ${centre.name}`, `Centre news and promotions at ${centre.name}.`);
  useReveal();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <>
      <PageHero
        eyebrow="What's on"
        title={<>The latest at<br /><span className="text-brass-600 dark:text-brass-300">the centre.</span></>}
        description="Real centre news and current promotions — not a generic events calendar."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {happenings.map((item) => (
              <article key={item.id} className="reveal flex flex-col rounded-[2rem] border border-black/10 bg-white/60 p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-white/10 dark:bg-white/5">
                <span className="w-fit rounded-full bg-brass-300/15 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brass-600 dark:text-brass-300">
                  {item.tag}
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold leading-tight">{item.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-7 text-graphite dark:text-stone-300">{item.body}</p>
                <p className="mt-4 border-t border-black/10 pt-3 text-xs font-medium text-brass-600 dark:border-white/10 dark:text-brass-300">{item.when}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-black/10 bg-bone/55 py-16 dark:border-white/10 dark:bg-night-950/40 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Get news like this by email."
            description="A working example of a controlled form. It doesn't have a backend yet, so nothing is sent or stored — this just shows the interaction."
          />
          <form onSubmit={handleSubmit} className="reveal rounded-3xl border border-black/10 bg-white/60 p-5 shadow-soft dark:border-white/10 dark:bg-white/5">
            <label htmlFor="news-email" className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500">Email address</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="news-email"
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubmitted(false); }}
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 rounded-2xl border border-black/10 bg-white px-4 outline-none focus:border-brass-400 focus:ring-2 focus:ring-brass-400/30 dark:border-white/10 dark:bg-night-800"
              />
              <button type="submit" className="h-12 rounded-2xl bg-ink px-5 text-sm font-semibold text-white transition hover:bg-brass-600 dark:bg-brass-400 dark:text-night-950">
                Join list
              </button>
            </div>
            {submitted && (
              <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300">
                Demo submitted. No information was actually sent anywhere.
              </p>
            )}
          </form>
        </Container>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------
   Visit
--------------------------------------------------------------- */
export function VisitPage() {
  useDocumentMeta(`Visit us · ${centre.name}`, `Trading hours, parking and directions for ${centre.name}, ${centre.address}.`);
  useReveal();
  const status = getOpenState();

  return (
    <>
      <PageHero eyebrow="Visit us" title={<>Getting here is<br /><span className="text-brass-600 dark:text-brass-300">the easy part.</span></>} />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <div className="reveal rounded-3xl border border-black/10 bg-white/60 p-7 dark:border-white/10 dark:bg-white/5">
              <div className="mb-4 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${status.isOpen ? "bg-moss-500" : "bg-brass-600"}`} />
                <h3 className="font-display text-lg font-semibold">{status.message}</h3>
              </div>
              <dl className="space-y-1.5">
                {tradingHours.map((d) => (
                  <div key={d.day} className={`flex justify-between rounded-md px-2 py-1 text-sm ${d.day === status.todayLabel ? "bg-brass-400/10 font-semibold" : "text-graphite dark:text-stone-400"}`}>
                    <dt>{d.day}</dt>
                    <dd className="tabular-nums">{String(d.open).padStart(2, "0")}:00 – {String(d.close).padStart(2, "0")}:00</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="reveal rounded-3xl border border-black/10 bg-white/60 p-7 dark:border-white/10 dark:bg-white/5">
              <h3 className="mb-4 font-display text-lg font-semibold">Parking &amp; access</h3>
              <ul className="space-y-3 text-sm text-graphite dark:text-stone-300">
                <li>Free undercover and open-air parking, {centre.parkingBays.toLocaleString()} bays</li>
                <li>Wheelchair ramps at every entrance</li>
                <li>Four entrances, escalators between levels</li>
                <li>ATMs and public toilets on the upper level</li>
              </ul>
            </div>

            <div className="reveal flex flex-col rounded-3xl border border-black/10 bg-ink p-7 text-white dark:border-white/10">
              <h3 className="mb-4 font-display text-lg font-semibold">Find us</h3>
              <address className="not-italic text-sm leading-relaxed text-white/70">
                {centre.address}
                <br />
                <span className="text-white/45">Less than 3km from the N1 Allandale offramp</span>
              </address>
              <div className="mt-5 space-y-2 text-sm">
                <a href={centre.phoneHref} className="block text-brass-300 hover:text-brass-200">{centre.phone}</a>
                <a href={`mailto:${centre.email}`} className="block text-brass-300 hover:text-brass-200">{centre.email}</a>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Boulders+Shopping+Centre+Old+Pretoria+Road+Midrand"
                target="_blank" rel="noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-brass-400 px-5 py-2.5 text-sm font-semibold text-night-950 transition-transform hover:scale-[1.03]"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
