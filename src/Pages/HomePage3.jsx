import React from "react";
import { motion } from "motion/react";

// Bull Race Landing Page (React + TailwindCSS + Framer Motion)
// Default export React component. Drop this file into a Vite/CRA/Next project.
// Requirements: tailwindcss, framer-motion installed and configured.

export default function HomePage3() {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-white to-amber-100 text-gray-900 antialiased">
      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <BullHead className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">BullRace</h1>
            <p className="text-xs text-gray-600">Heritage. Strength. Speed.</p>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover:text-amber-700">
            About
          </a>
          <a href="#schedule" className="hover:text-amber-700">
            Schedule
          </a>
          <a href="#gallery" className="hover:text-amber-700">
            Gallery
          </a>
          <a
            href="#tickets"
            className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow hover:bg-amber-700"
          >
            Get Tickets
          </a>
        </nav>
        <button className="md:hidden p-2 rounded-lg bg-white/60 backdrop-blur-sm">
          ☰
        </button>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-2 items-center py-12">
          <motion.div
            initial={{ opacity: 0, x: -80, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 bg-amber-100/70 px-3 py-1 rounded-full text-amber-800 text-sm font-medium">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 12h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.4"
                />
              </svg>
              Traditional Bull Race — Live
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Bull Pull — Where Tradition Meets Thunder
            </h2>

            <p className="text-gray-700 max-w-prose">
              A bold celebration of heritage and raw strength. Come watch
              decorated bulls, expertly trained handlers and roaring crowds — an
              aesthetic, family-friendly event combining cultural rituals with
              modern event design.
            </p>

            <div className="flex gap-3 flex-wrap">
              <a
                href="#tickets"
                className="inline-flex items-center gap-2 bg-amber-700 text-white px-5 py-3 rounded-lg font-semibold shadow hover:scale-[1.02] transform transition"
              >
                Book Tickets
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-50"
              >
                View Gallery
              </a>
            </div>

            <div className="mt-4 flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <strong className="text-gray-900">Date</strong>
                <span>•</span>
                <span>Feb 21, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-gray-900">Venue</strong>
                <span>•</span>
                <span>Heritage Grounds, Riverside</span>
              </div>
            </div>
          </motion.div>

          <motion.figure
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
            aria-hidden
          >
            <img
              src="https://images.unsplash.com/photo-1588711248661-6b3d9d1e89f4?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
              alt="Bull race action"
              className="w-full h-80 object-cover md:h-[420px] lg:h-[520px]"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-amber-900/20 mix-blend-multiply" />
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute left-6 bottom-6 rounded-lg bg-white/80 px-4 py-2 backdrop-blur-sm"
            >
              <p className="text-sm font-medium">
                Heritage Pull — Champion:{" "}
                <span className="font-bold">Vairam</span>
              </p>
            </motion.div>
          </motion.figure>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-8">
          <div className="grid gap-6 lg:grid-cols-3 items-start">
            <article className="col-span-2 bg-white rounded-2xl p-6 shadow">
              <h3 className="text-2xl font-bold">About Bull Pull</h3>
              <p className="mt-3 text-gray-700">
                Bull pulling (rock pulling) is a time-honored sport — bulls pull
                a weighted sled/rock to display strength, training and
                endurance. Our event prioritizes animal welfare, ceremonial
                respect and community celebration.
              </p>

              <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-amber-700">●</span>
                  <div>
                    <strong className="text-gray-900">Cultural Rituals</strong>
                    <div>Opening pooja and blessing ceremony.</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-amber-700">●</span>
                  <div>
                    <strong className="text-gray-900">Welfare</strong>
                    <div>
                      Vets on-site, regulated rest breaks and ethical training
                      standards.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-amber-700">●</span>
                  <div>
                    <strong className="text-gray-900">Family Friendly</strong>
                    <div>
                      Kids activities, food stalls and cultural exhibitions.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-amber-700">●</span>
                  <div>
                    <strong className="text-gray-900">Modern Facilities</strong>
                    <div>Seating, shaded areas, and cashless ticketing.</div>
                  </div>
                </li>
              </ul>
            </article>

            <aside className="bg-amber-50 rounded-2xl p-6 shadow-inner">
              <h4 className="text-lg font-semibold">Quick Facts</h4>
              <dl className="mt-3 text-sm text-gray-700 space-y-3">
                <div>
                  <dt className="font-medium">Capacity</dt>
                  <dd>5,000 spectators</dd>
                </div>
                <div>
                  <dt className="font-medium">Entry</dt>
                  <dd>Free for kids under 12</dd>
                </div>
                <div>
                  <dt className="font-medium">Parking</dt>
                  <dd>Available (pre-book recommended)</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="py-8">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="text-2xl font-bold mb-4">Schedule</h3>
            <ol className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center font-semibold">
                  09:00
                </div>
                <div>
                  <h5 className="font-medium">Gates Open</h5>
                  <p className="text-sm text-gray-600">
                    Stalls, food and exhibitions open.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center font-semibold">
                  10:30
                </div>
                <div>
                  <h5 className="font-medium">Opening Ceremony</h5>
                  <p className="text-sm text-gray-600">
                    Pooja and blessing of the bulls.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center font-semibold">
                  12:00
                </div>
                <div>
                  <h5 className="font-medium">Main Pulls</h5>
                  <p className="text-sm text-gray-600">
                    Competitive rock pulling rounds.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="py-10">
          <h3 className="text-2xl font-bold mb-6">Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((src, i) => (
              <figure
                key={i}
                className="rounded-lg overflow-hidden bg-white shadow"
              >
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-36 object-cover transition-transform transform hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </section>

        {/* Tickets CTA */}
        <section
          id="tickets"
          className="py-12 bg-linear-to-r from-amber-50 to-white rounded-2xl p-6 shadow-inner mb-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-extrabold">Reserve your spot</h3>
            <p className="mt-3 text-gray-700">
              Limited seats. VIP and family packages available. All payments are
              cashless.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="px-6 py-3 rounded-lg bg-amber-700 text-white font-semibold"
              >
                Buy Tickets
              </a>
              <a
                href="#"
                className="px-6 py-3 rounded-lg border border-amber-300 text-amber-800"
              >
                Contact Organizer
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-amber-100">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <BullHead className="w-9 h-9" />
              <div>
                <div className="font-bold">BullRace</div>
                <div className="text-xs text-gray-600">
                  © {new Date().getFullYear()} BullRace Committee
                </div>
              </div>
            </div>

            <nav className="flex gap-4 text-sm text-gray-600">
              <a href="#about">About</a>
              <a href="#schedule">Schedule</a>
              <a href="#tickets">Tickets</a>
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}

/* --- Helper data and components --- */

const galleryImages = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
];

function BullHead({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      <path
        d="M10 28c0-6 6-12 10-12s6 0 10 0 6 0 10 0 10 6 10 12-4 14-10 14-6-4-10-4-4 4-10 4-10-8-10-14z"
        fill="url(#g1)"
      />
      <path
        d="M22 18c-2-4-6-6-6-6s2 4 4 7"
        stroke="#fff8"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g transform="translate(6,34)">
        <rect x="0" y="0" width="14" height="4" rx="2" fill="#3b382f" />
      </g>
    </svg>
  );
}
