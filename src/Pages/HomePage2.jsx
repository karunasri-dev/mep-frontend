import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Users,
  Car,
  Baby,
  Clock,
} from "lucide-react";
import BullHead from "../components/BullHead";
import heroImage2 from "../assets/header2.png";
import { useNavigate } from "react-router-dom";

const scheduleItems = [
  {
    time: "08:00 AM",
    title: "Gates Open",
    description: "Registration & Welcome Ceremony",
  },
  {
    time: "09:30 AM",
    title: "Traditional Rituals",
    description: "Blessing of Bulls & Participants",
  },
  {
    time: "11:00 AM",
    title: "Rock Pulling Competition",
    description: "Preliminary Rounds",
  },
  {
    time: "01:00 PM",
    title: "Lunch Break",
    description: "Traditional Food Stalls",
  },
  {
    time: "02:30 PM",
    title: "Bull Race Finals",
    description: "Championship Rounds",
  },
  {
    time: "05:00 PM",
    title: "Prize Distribution",
    description: "Awards & Cultural Performances",
  },
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

export default function HomePage2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  // Parallax transformations for header logo
  const logoY = useTransform(scrollY, [0, 300], [0, 50]);
  const logoScale = useTransform(scrollY, [0, 300], [1, 0.7]);
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const navLinks = ["About", "Schedule", "Gallery", "Tickets"];

  const scrollToSection = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
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
                  onClick={() => scrollToSection(link)}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-block px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 rounded-full border border-amber-300"
              >
                <span className="text-amber-800">
                  🏆 Annual Championship 2025
                </span>
              </motion.div>

              <h1 className="text-amber-900 leading-tight">
                Traditional Bull Race
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-orange-600">
                  & Rock Pulling
                </span>
              </h1>

              <p className="text-amber-800/80 max-w-xl">
                Experience the raw power and cultural heritage of our ancestors.
                Witness magnificent bulls compete in traditional races and rock
                pulling competitions that have been celebrated for generations.
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-amber-900">
                  <Calendar className="text-amber-600" size={20} />
                  <span>March 15-16, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-amber-900">
                  <MapPin className="text-amber-600" size={20} />
                  <span>Mellacheruvu, Andhra Pradesh</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => navigate("/auth/register")}
                  className="px-8 py-3 bg-linear-to-r from-amber-600 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Register for Event
                </button>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="px-8 py-3 bg-white text-amber-800 rounded-full border-2 border-amber-300 hover:bg-amber-50 hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right: Hero Image */}
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
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-amber-900 mb-4">About the Event</h2>
            <p className="text-amber-800/70 max-w-2xl mx-auto">
              A celebration of strength, tradition, and community spirit
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Article */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-linear-to-br from-white to-amber-50/30 rounded-3xl p-8 shadow-lg border border-amber-200/50"
            >
              <h3 className="text-amber-900 mb-6">Cultural Heritage</h3>
              <div className="space-y-4 text-amber-800/80">
                <p>
                  The Traditional Bull Race and Rock Pulling event is a
                  centuries-old tradition that showcases the incredible bond
                  between farmers and their bulls. This spectacular event
                  celebrates agricultural heritage and the vital role these
                  magnificent animals play in rural communities.
                </p>
                <p>
                  Participants from across the region bring their strongest
                  bulls to compete in various categories, demonstrating raw
                  power, agility, and the deep training that goes into preparing
                  for this championship.
                </p>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-amber-600 mt-2" />
                  <div>
                    <div className="text-amber-900">Traditional Races</div>
                    <div className="text-amber-700/70">
                      Speed competitions on muddy tracks
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-amber-600 mt-2" />
                  <div>
                    <div className="text-amber-900">Rock Pulling</div>
                    <div className="text-amber-700/70">
                      Strength tests with weighted sleds
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-amber-600 mt-2" />
                  <div>
                    <div className="text-amber-900">Cultural Shows</div>
                    <div className="text-amber-700/70">
                      Folk dances and music performances
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="shrink-0 w-2 h-2 rounded-full bg-amber-600 mt-2" />
                  <div>
                    <div className="text-amber-900">Food Festival</div>
                    <div className="text-amber-700/70">
                      Traditional cuisine and delicacies
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-linear-to-br from-amber-600 to-orange-600 rounded-3xl p-8 shadow-xl text-white"
            >
              <h3 className="mb-6">Quick Facts</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="opacity-90">Capacity</div>
                    <div>10,000 visitors</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Car size={24} />
                  </div>
                  <div>
                    <div className="opacity-90">Parking</div>
                    <div>Free for all attendees</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Baby size={24} />
                  </div>
                  <div>
                    <div className="opacity-90">Kids Entry</div>
                    <div>Under 12 free</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <div className="opacity-90">Duration</div>
                    <div>2 days, 8 AM - 7 PM</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-amber-900 mb-4">Event Schedule</h2>
            <p className="text-amber-800/70 max-w-2xl mx-auto">
              Plan your day at the championship
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-amber-300 via-amber-400 to-amber-300 hidden sm:block" />

            <div className="space-y-8">
              {scheduleItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Time Badge */}
                  <div className="shrink-0 w-32">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg z-10 relative">
                        <Clock size={24} />
                      </div>
                      <div className="mt-2 text-center text-amber-900">
                        {item.time}
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-amber-200/50 hover:shadow-xl transition-shadow duration-300">
                    <h4 className="text-amber-900 mb-2">{item.title}</h4>
                    <p className="text-amber-700/70">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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

      {/* Tickets CTA Section */}
      <section id="tickets" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-linear-to-br from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-12 shadow-2xl overflow-hidden"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center text-white">
              <h2 className="mb-4">Get Your Tickets Now</h2>
              <p className="mb-8 text-white/90 max-w-2xl mx-auto">
                Don{"'"}t miss this spectacular celebration of tradition and
                strength. Limited seats available!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-amber-900 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  Buy Tickets
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-transparent text-white border-2 border-white rounded-full hover:bg-white/10 transition-all duration-300"
                >
                  Contact Organizer
                </motion.button>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-8 text-white/80">
                <div>
                  <div>General Admission</div>
                  <div>₹500</div>
                </div>
                <div>
                  <div>VIP Pass</div>
                  <div>₹1,500</div>
                </div>
                <div>
                  <div>Family Pack</div>
                  <div>₹2,000</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-linear-to-br from-amber-900 to-orange-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-amber-300">
                  <BullHead />
                </div>
                <span className="tracking-wide">Bull Race</span>
              </div>
              <p className="text-white/70">
                Celebrating tradition, strength, and community since 1950.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Quick Links</h4>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className="block text-white/70 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="mb-4">Contact</h4>
              <div className="space-y-2 text-white/70">
                <p>MellaCheruvu, Andhra Pradesh</p>
                <p>contact@mep.in</p>
                <p>+91 98765 43210</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Royak Bulls Championship. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
