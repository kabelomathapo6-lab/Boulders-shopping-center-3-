import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, useDocumentMeta, useReveal } from "./shared.jsx";
import { centre, getOpenState, tenants } from "./data.js";

/* The day/night toggle is a real feature, driven by React state and
 * a data attribute on <html>, not by swapping in a different markup
 * blob. It defaults to whatever time of day it actually is. */
function useScene() {
  const [scene, setScene] = useState(() => {
    const saved = window.localStorage.getItem("boulders-scene");
    if (saved === "day" || saved === "night") return saved;
    const hour = new Date().getHours();
    return hour < 6 || hour >= 19 ? "night" : "day";
  });

  useEffect(() => {
    document.documentElement.dataset.scene = scene;
    window.localStorage.setItem("boulders-scene", scene);
  }, [scene]);

  return [scene, setScene];
}

export function HomePage() {
  useDocumentMeta(
    `${centre.name} — Midrand, made easy to browse`,
    `${centre.name} on ${centre.address}. ${centre.storeCountPublished}+ stores, ${centre.parkingBays.toLocaleString()} free parking bays. Find a store, check today's hours, plan your visit.`,
  );
  useReveal();

  const navigate = useNavigate();
  const [scene, setScene] = useScene();
  const [search, setSearch] = useState("");
  const status = getOpenState();

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/directory?q=${encodeURIComponent(search)}`);
  }

  const isNight = scene === "night";

  return (
    <>
      {/* ---- Hero ---- */}
      <section
        className={`relative overflow-hidden transition-colors duration-700 ${
          isNight ? "bg-night-950 text-white" : "bg-ink text-white"
        }`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background: isNight
              ? "radial-gradient(ellipse 55% 45% at 25% 0%, rgba(199,154,72,0.14), transparent 60%), radial-gradient(ellipse 45% 35% at 90% 100%, rgba(76,107,84,0.10), transparent 60%)"
              : "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(199,154,72,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 90% 100%, rgba(76,107,84,0.16), transparent 60%)",
          }}
        />

        <Container className="relative pb-20 pt-16 sm:pb-28 sm:pt-20">
          <div className="reveal flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-brass-300">
              <span className={`h-1.5 w-1.5 rounded-full ${status.isOpen ? "bg-moss-400" : "bg-white/30"}`} />
              {status.message}
            </p>

            <div className="flex rounded-full border border-white/15 bg-white/5 p-1 text-xs font-semibold">
              <button
                onClick={() => setScene("day")}
                className={`rounded-full px-3 py-1.5 transition-colors ${scene === "day" ? "bg-brass-400 text-night-950" : "text-white/55"}`}
              >
                Day
              </button>
              <button
                onClick={() => setScene("night")}
                className={`rounded-full px-3 py-1.5 transition-colors ${scene === "night" ? "bg-brass-400 text-night-950" : "text-white/55"}`}
              >
                Night
              </button>
            </div>
          </div>

          <h1 className="reveal mt-8 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Midrand's mall,
            <br />
            <span className="text-brass-300">reimagined</span> for how you actually shop.
          </h1>

          <p className="reveal mt-6 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            {centre.storeCountPublished}+ stores, free parking for {centre.parkingBays.toLocaleString()} cars,
            all on {centre.address}. Find what you need before you leave home.
          </p>

          <form onSubmit={handleSearch} className="reveal mt-9 max-w-xl">
            <label htmlFor="home-search" className="sr-only">Search stores</label>
            <div className="flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-5 py-4 backdrop-blur transition-colors focus-within:border-brass-400/60">
              <svg className="h-5 w-5 shrink-0 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                id="home-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Pick n Pay, Clicks, a barber…"
                className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <button type="submit" className="hidden shrink-0 rounded-full bg-brass-400 px-4 py-2 text-sm font-semibold text-night-950 transition-transform hover:scale-[1.03] sm:block">
                Search
              </button>
            </div>
          </form>

          <div className="reveal mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-7">
            <Stat value={`${centre.storeCountPublished}+`} label="Stores" />
            <Stat value={centre.parkingBays.toLocaleString()} label="Free bays" />
            <Stat value={`${centre.floorArea}m²`} label="Under one roof" />
          </div>
        </Container>
      </section>

      {/* ---- A few of the stores, teaser for the directory ---- */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">On your doorstep</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Some of who's here</h2>
            </div>
            <a href="/directory" className="text-sm font-semibold text-brass-600 hover:underline dark:text-brass-300">
              See the full directory →
            </a>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {tenants.slice(0, 12).map((t) => (
              <div key={t.name} className="reveal rounded-2xl border border-black/10 bg-white/60 px-4 py-5 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="mt-1 text-xs text-graphite/60 dark:text-stone-400">Shop {t.shop}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-brass-300 sm:text-3xl">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wider text-white/45">{label}</div>
    </div>
  );
}
