import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
// import bullLogoA from "../assets/bullLogoA.png";
import BullHead from "../components/BullHead";
import { Menu, X, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage2 from "../assets/header2.png";

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
export default function HomePage() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const bulls = [
    { name: "Somu", owner: "Ramesh", img: "/images/bull-1.jpg" },
    { name: "Veeru", owner: "Shiva", img: "/images/bull-2.jpg" },
    { name: "Thunder", owner: "Kumar", img: "/images/bull-3.jpg" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1732603891196-2b8cc24f39a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGZlc3RpdmFsJTIwaW5kaWF8ZW58MXx8fHwxNzY0OTE5MjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1726343457073-6aa5ac1bb647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWxsJTIwdHJhZGl0aW9uYWwlMjBzcG9ydHxlbnwxfHx8fDE3NjQ5MTkyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1760021373658-fa9b85560526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGNlbGVicmF0aW9uJTIwY3Jvd2R8ZW58MXx8fHwxNzY0OTE5MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1662727736417-331a09304025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2aWxsYWdlJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzY0OTE5MjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1758615590426-7735ddcdaa24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHJhY2luZyUyMGV2ZW50fGVufDF8fHx8MTc2NDkxOTI0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1759738093180-aa603b03fc7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGNlbGVicmF0aW9uJTIwaW5kaWF8ZW58MXx8fHwxNzY0OTE5MjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1693473851032-36335b5a1335?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGhlcml0YWdlJTIwZXZlbnR8ZW58MXx8fHwxNzY0OTE5MjQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1764636512365-384ae881d2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHNwb3J0cyUyMGNvbXBldGl0aW9ufGVufDF8fHx8MTc2NDkxOTI0OHww&ixlib=rb-4.1.0&q=80&w=1080",
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  // Parallax transformations for header logo
  const logoY = useTransform(scrollY, [0, 300], [0, 50]);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.7]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const navLinks = ["About", "Schedule", "Gallery", "Login"];

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };
  // Scroll listener for Back to Top
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white text-gray-900 overflow-x-hidden">
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 shadow-lg border-b border-amber-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Parallax */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              style={{ y: logoY, scale: logoScale, opacity: logoOpacity }}
            >
              <div className="text-amber-600">
                <BullHead />
              </div>
              <span className="text-amber-900 tracking-wide">Royal Bulls</span>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() =>
                    link === "Login"
                      ? navigate("/login")
                      : scrollToSection(link)
                  }
                  className="text-amber-800 hover:text-amber-600 transition-colors duration-300 relative group"
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-amber-900 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.nav
              className="md:hidden pb-4 space-y-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className="block w-full text-left px-4 py-2 text-amber-800 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  {link}
                </button>
              ))}
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* HERO SECTION  */}
      <div className="pt-20 mx-auto">
        <Header />
      </div>
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

          <motion.p variants={itemVariants} className="text-gray-700 max-w-xl">
            Bull weight-pulling, locally known as <em>Banda Laagudu Poteelu</em>
            , is a heritage sport from Andhra Pradesh and Telangana where
            trained bulls pull heavy stone blocks or weighted sleds across a
            fixed distance. It’s a living tradition that celebrates strength,
            endurance, and community pride.
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
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={heroImage2}
              alt="Traditional Bull Race"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 backdrop-blur-lg border border-amber-200"
          >
            <div className="text-center">
              <div className="text-amber-600">
                <Users size={32} className="mx-auto" />
              </div>
              <div className="mt-2 text-amber-900">5000+</div>
              <div className="text-amber-700/70">Attendees</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* HIGHLIGHTS */}
      <section
        id="highlights"
        className="px-8 mt-24 max-w-5xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-10"
        >
          Festival Highlights
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Strongest Bull Competition", icon: "🐂" },
            { title: "Traditional Drums & Music", icon: "🥁" },
            { title: "Cultural Performances", icon: "🎭" },
            { title: "Local Food Stalls", icon: "🍛" },
            { title: "Awards & Prize Money", icon: "🏆" },
            { title: "Fun for Families", icon: "👨‍👩‍👧‍👦" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-6 bg-white shadow-xl rounded-xl border flex flex-col items-center"
            >
              <span className="text-5xl mb-4">{item.icon}</span>
              <h3 className="font-bold text-xl">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BULL PROFILES */}
      <section id="bulls" className="px-8 mt-24 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Meet the Bulls
        </motion.h2>

        <div className="flex overflow-x-scroll gap-6 py-4 scrollbar-hide">
          {bulls.map((bull, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="min-w-[250px] bg-white shadow-xl rounded-xl border flex flex-col items-center p-4"
            >
              <img
                src={bull.img}
                alt={bull.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="font-bold text-xl">{bull.name}</h3>
              <p className="text-gray-600 text-sm">Owner: {bull.owner}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHAMPIONSHIP */}
      <section
        id="championship"
        className="px-8 mt-24 max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-6"
        >
          Championship Details
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white shadow-xl rounded-xl border">
            <h3 className="font-bold text-xl mb-2">Rules</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Bulls must be healthy & trained</li>
              <li>No external assistance during race</li>
              <li>Respect for all animals</li>
              <li>Judges’ decision is final</li>
            </ul>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-xl border">
            <h3 className="font-bold text-xl mb-2">Prize Money</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>1st: ₹50,000</li>
              <li>2nd: ₹30,000</li>
              <li>3rd: ₹20,000</li>
              <li>Special Awards for Best Decorated Bull</li>
            </ul>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-xl border">
            <h3 className="font-bold text-xl mb-2">Info</h3>
            <p className="text-gray-600">
              Open to all trained bulls in the region. Registration closes one
              week before festival.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-amber-900 mb-4">Event Gallery</h2>
            <p className="text-amber-800/70 max-w-2xl mx-auto">
              Glimpses from previous championships
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="relative overflow-hidden rounded-2xl shadow-lg aspect-square cursor-pointer group"
              >
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-8 py-20 bg-yellow-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold mb-6"
        >
          Join the Festival!
        </motion.h2>
        <p className="text-gray-700 mb-8">
          Register your bull, buy tickets, or volunteer. Experience tradition
          and excitement like never before.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">
            Register Your Bull
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition">
            Buy Tickets
          </button>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            className="max-w-3xl max-h-[80vh] rounded-xl shadow-xl"
          />
        </div>
      )}

      {/* BACK TO TOP */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-10 right-10 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg z-50"
        >
          ↑ Top
        </button>
      )}
    </div>
  );
}
