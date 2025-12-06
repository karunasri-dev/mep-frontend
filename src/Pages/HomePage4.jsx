import React from "react";
import { motion } from "motion/react";

// Single-file React + Tailwind component
// Default export: HomePage
// Replace placeholder image URLs with your own assets.

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const pulse = {
  hidden: { scale: 0.98, opacity: 0.9 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { repeat: Infinity, repeatType: "reverse", duration: 2 },
  },
};

export default function HomePage4() {
  const gallery = [
    "/images/gallery1.jpg",
    "/images/gallery2.jpg",
    "/images/gallery3.jpg",
    "/images/gallery4.jpg",
  ];

  const events = [
    {
      id: 1,
      title: "Harvest Heritage Meet",
      date: "Jan 18, 2026",
      location: "Nizamabad Grounds",
      excerpt: "Regional showcase: top bulls competing across categories.",
    },
    {
      id: 2,
      title: "Banda Laagudu Poteelu Festival",
      date: "Mar 12, 2026",
      location: "Kurnool Fairgrounds",
      excerpt: "Festival celebrating tradition, music, and competition.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold">
              BW
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bull Weight-Pulling</h1>
              <p className="text-xs text-gray-600">Power · Tradition · Pride</p>
            </div>
          </div>

          <nav className="hidden md:flex gap-6 items-center text-sm">
            <a href="#about" className="hover:underline">
              About
            </a>
            <a href="#events" className="hover:underline">
              Events
            </a>
            <a href="#gallery" className="hover:underline">
              Gallery
            </a>
            <a href="#welfare" className="hover:underline">
              Welfare
            </a>
            <a
              href="#contact"
              className="text-white bg-emerald-600 px-4 py-2 rounded-md shadow-sm hover:brightness-95"
            >
              Contact
            </a>
          </nav>

          <div className="md:hidden">
            <button className="px-3 py-2 rounded-md bg-emerald-600 text-white">
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-extrabold leading-tight"
            >
              Bull Weight-Pulling:{" "}
              <span className="text-amber-600">Power Rooted in Tradition</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-700 max-w-xl"
            >
              Bull weight-pulling, locally known as{" "}
              <em>Banda Laagudu Poteelu</em>, is a heritage sport from Andhra
              Pradesh and Telangana where trained bulls pull heavy stone blocks
              or weighted sleds across a fixed distance. It’s a living tradition
              that celebrates strength, endurance, and community pride.
            </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-3 bg-amber-600 text-white px-5 py-3 rounded-md shadow-md hover:scale-[1.02] transition-transform"
              >
                Explore the Tradition
              </a>

              <a
                href="#events"
                className="inline-flex items-center gap-2 border px-4 py-3 rounded-md hover:bg-gray-100"
              >
                View Events & Highlights
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <svg
                className="w-5 h-5 text-amber-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a2 2 0 00-2 2v2H6a2 2 0 000 4h2v6a2 2 0 104 0v-6h2a2 2 0 100-4h-2V4a2 2 0 00-2-2z" />
              </svg>
              <span>
                Next major event: <strong>Mar 12, 2026 — Kurnool</strong>
              </span>
            </motion.div>
          </motion.div>

          {/* Right column - visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-linear-to-br from-rose-50 to-amber-50">
              <img
                src="/images/hero-bull.jpg"
                alt="Bull pulling a weighted sled"
                className="w-full h-72 md:h-96 object-cover"
              />

              {/* swinging badge */}
              <motion.div
                animate={{ rotate: [-6, 6, -6] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-6 top-6 bg-white/90 px-4 py-2 rounded-full shadow-md text-sm font-medium"
              >
                Traditional • Regulated • Ethical
              </motion.div>

              <div className="p-6">
                <h3 className="font-semibold text-lg">Power in motion</h3>
                <p className="text-sm text-gray-600 mt-2">
                  A vibrant tradition that combines skillful handling, trained
                  bulls, and community celebration.
                </p>

                <div className="mt-4 flex gap-3">
                  <a
                    href="#gallery"
                    className="text-sm px-3 py-2 rounded-md border hover:bg-gray-100"
                  >
                    View Gallery
                  </a>
                  <a
                    href="#events"
                    className="text-sm px-3 py-2 rounded-md bg-emerald-600 text-white"
                  >
                    Upcoming Events
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 items-start"
          >
            <div>
              <h3 className="text-2xl font-bold">
                What Is Bull Weight-Pulling?
              </h3>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Bull weight-pulling (Banda Laagudu Poteelu) is a traditional
                strength contest where trained bulls pull heavy stone blocks or
                weighted sleds across a fixed distance. Born from agrarian life,
                the sport emphasizes endurance, discipline, and the bond between
                handlers and their animals.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold">Agrarian Roots</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Originated from everyday farm labour where bulls were
                    essential for heavy tasks.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold">Community Centrepiece</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    Events doubled as festivals — music, food, and celebration
                    around the competitions.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-semibold">Showcase of Pride</h4>
                  <p className="text-sm text-gray-600 mt-2">
                    A strong bull increased its owner’s status and value in the
                    market.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src="/images/about1.jpg"
                  alt="Vintage festival"
                  className="w-full h-56 object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src="/images/about2.jpg"
                  alt="Bull in training"
                  className="w-full h-56 object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* HISTORY */}
        <section id="history" className="mt-20">
          <h3 className="text-2xl font-bold">
            From the Fields to the Festival Grounds
          </h3>
          <p className="mt-4 text-gray-700 max-w-3xl">
            Long before machinery, bulls powered every part of village life —
            plowing, hauling, and heavy fieldwork. After harvest, farmers
            challenged each other to test their bulls, and over generations,
            these contests evolved into organized festivals.
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">Agrarian Origins</h4>
              <p className="text-sm text-gray-600 mt-2">
                Informal farmer challenges that became formal competitions.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">Festival Evolution</h4>
              <p className="text-sm text-gray-600 mt-2">
                Community celebrations tied to harvest and local rituals.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6 }}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">A Showcase of Pedigree</h4>
              <p className="text-sm text-gray-600 mt-2">
                Winning bulls brought prestige and higher market value.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="mt-20">
          <h3 className="text-2xl font-bold">How the Competition Works</h3>
          <p className="mt-4 text-gray-700">
            Quick breakdown of format, judging, and categories.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <ul className="space-y-3 text-sm text-gray-700">
                <li>
                  <strong>Distance:</strong> Typically 300–350 feet
                </li>
                <li>
                  <strong>Load:</strong> Stone block / weighted sled
                </li>
                <li>
                  <strong>Goal:</strong> Maximum distance or fastest time
                </li>
                <li>
                  <strong>Judging:</strong> Distance covered + technique +
                  completion time
                </li>
                <li>
                  <strong>Categories:</strong> Based on breed, weight, and
                  training level
                </li>
              </ul>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h4 className="font-semibold">Upcoming Events</h4>
              <div className="mt-4 space-y-3">
                {events.map((e) => (
                  <div key={e.id} className="p-3 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-semibold">{e.title}</div>
                        <div className="text-xs text-gray-500">
                          {e.location}
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="font-medium">{e.date}</div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{e.excerpt}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href="#events"
                  className="inline-block px-4 py-2 rounded-md bg-amber-600 text-white"
                >
                  View Full Calendar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="mt-20">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Power in Motion — Gallery</h3>
            <a href="#gallery" className="text-sm text-amber-600">
              See full gallery
            </a>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {gallery.map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-lg overflow-hidden bg-white shadow"
              >
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-40 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* WELFARE / SAFETY */}
        <section id="welfare" className="mt-20">
          <h3 className="text-2xl font-bold">Tradition with Responsibility</h3>
          <p className="mt-4 text-gray-700 max-w-3xl">
            Events follow legally mandated rules ensuring animal safety, proper
            training, and regulated loads. Organizers maintain strict oversight
            to preserve the sport ethically.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={pulse}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">Trained Medical Teams</h4>
              <p className="text-sm text-gray-600 mt-2">
                On-site vets and first response teams during events.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={pulse}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">Approved Weight Standards</h4>
              <p className="text-sm text-gray-600 mt-2">
                Weights and distances are regulated by event committees and
                state guidelines.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={pulse}
              className="p-6 bg-white rounded-lg shadow"
            >
              <h4 className="font-semibold">Monitoring & Rest Protocols</h4>
              <p className="text-sm text-gray-600 mt-2">
                Handlers follow strict rest and hydration protocols for animal
                welfare.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <footer id="contact" className="mt-20 bg-white border-t py-10">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold">Bull Weight-Pulling</h4>
              <p className="text-sm text-gray-600 mt-2">
                Preserving tradition with responsibility. Connect with
                organizers, sponsors, or request event details.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Quick Links</h4>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li>
                  <a href="#about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#events" className="hover:underline">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:underline">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#welfare" className="hover:underline">
                    Welfare
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Contact</h4>
              <p className="text-sm text-gray-600 mt-2">
                Email:{" "}
                <a
                  href="mailto:info@bulltradition.org"
                  className="text-amber-600"
                >
                  info@bulltradition.org
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Phone: +91 98765 43210
              </p>

              <form className="mt-4 flex flex-col gap-2">
                <input
                  className="px-3 py-2 border rounded text-sm"
                  placeholder="Your name"
                />
                <input
                  className="px-3 py-2 border rounded text-sm"
                  placeholder="Email"
                />
                <textarea
                  className="px-3 py-2 border rounded text-sm"
                  rows={3}
                  placeholder="Message"
                ></textarea>
                <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded">
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Bull Weight-Pulling — All rights
            reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
