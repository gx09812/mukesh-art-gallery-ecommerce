// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Palette, MessageCircle, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/utils";
import { fadeInRight } from "../utils/motion";

const iconButtons = [
  {
    name: "Instagram",
    href: 'https://instagram.com/mukesh_.arts',
    icon: "https://cdn-icons-png.flaticon.com/512/174/174855.png",
    bg: "bg-white",
    text: "text-pink-600",
    hoverBg: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500",
    hoverText: "hover:text-white"
  },
  {
    name: "YouTube",
    href:'https://youtube.com/@mukesh_arts_?feature=shared',
    icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    bg: "bg-white",
    text: "text-red-600",
    hoverBg: "hover:bg-red-600",
    hoverText: "hover:text-white"
  },
  {
    name: "WhatsApp",
    href: 'https://whatsapp.com/channel/0029Vb6kVtK3mFY6Gdm0sF3S',
    icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    bg: "bg-white",
    text: "text-green-600",
    hoverBg: "hover:bg-green-500",
    hoverText: "hover:text-white"
  }
];

const Hero = () => {
  const navigate = useNavigate();

  const [homeImg, setHomeImg] = useState("");

  // Load Home Image From Backend
  useEffect(() => {
    fetch("http://localhost:5000/get/home")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.image_path) {
          setHomeImg("http://localhost:5000" + data.image_path);
        }
      })
      .catch(err => console.error("Home image load error", err));
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-b from-white to-gray-50 min-h-screen pt-32"
    >

      {/* LEFT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm">
          <Palette size={16} className="text-[#778259]" />
          Professional Pencil Sketch Artist
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
          I’m Mukesh Pandian
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-3">
          a pencil sketch <span className="text-[#778259]">artist</span>
        </h2>

        <div className="w-full flex justify-center">
          <p className="text-gray-600 mt-4 leading-relaxed text-center max-w-lg md:max-w-2xl">
            Bringing your precious memories to life through detailed pencil artistry.
            Each stroke tells a story, and every shade captures emotion.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
          <button
            onClick={() => navigate("/gallery")}
            className="flex items-center gap-2 px-6 py-3 bg-[#778259] text-white rounded-full shadow-lg hover:bg-[#66734d] transition transform hover:scale-105"
          >
            View Gallery <ArrowRight size={18} />
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            <MessageCircle size={18} /> Request Commission
          </button>
        </div>


<div className="flex flex-wrap gap-4 items-center mt-8">
  {iconButtons.map((btn, idx) => (
    <a
      key={idx}
      href={btn.href}
      target="_blank"
      rel="noreferrer"
      className={`
        flex items-center gap-2
        h-12
        px-3 md:px-5        /* 🔹 mobile small | desktop normal */
        rounded-full
        shadow-lg cursor-pointer
        font-semibold
        transition-colors duration-200

        ${btn.bg}
        ${btn.text}
        ${btn.hoverBg}
        ${btn.hoverText}
      `}
    >
      <img
        src={btn.icon}
        alt={btn.name}
        className="w-6 h-6"
      />

      {/* hide text only on very small screens if needed */}
      <span className="">
        {btn.name}
      </span>
    </a>
  ))}
</div>


        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-10 flex justify-center md:justify-start cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <ChevronDown className="text-gray-500" size={28} />
        </motion.div>
      </motion.div>

      {/* RIGHT IMAGE SECTION */}
      <motion.div
        variants={fadeInRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full md:w-auto md:absolute md:top-24 md:right-8 flex justify-center md:justify-end mb-8 md:mb-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative w-72 sm:w-80 md:w-96"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#778259] to-[#8c9d75] rounded-2xl transform rotate-3 scale-105 opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tl from-[#778259] to-[#8c9d75] rounded-2xl transform -rotate-3 scale-105 opacity-20" />

          {/* Main Image */}
          <div className="relative bg-white p-4 rounded-2xl shadow-2xl">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
              <img
                src={
                  homeImg ||
                  "https://via.placeholder.com/400x600?text=Loading..."
                }
                alt="Home Screen Artwork"
                className="w-full h-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-3 -right-3 bg-white px-4 py-2 rounded-full shadow-xl border-2 border-[#778259]"
            >
              <p className="text-xs font-semibold text-[#778259]">
                ✨ Custom Commissions Available
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;
